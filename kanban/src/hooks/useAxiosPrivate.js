// import { axiosPrivate } from "../api/axios";
// import { useEffect } from "react";
// import useRefreshToken from "./useRefreshToken";
// import useAuth from "./useAuth";

// const useAxiosPrivate = () => {
//     const refresh = useRefreshToken();
//     const { auth } = useAuth();

//     useEffect(() => {

//         const requestIntercept = axiosPrivate.interceptors.request.use(
//             config => {
//                 //if the authorization header does not exit, then its not a retry, its the first attempt
//                 if (!config.headers['Authorization']) {
//                     config.headers['Authorization'] = `Bearer ${auth?.token}`; //token from when we signed in or after a refresh
//                 }
//                 return config;
//             }, (error) => Promise.reject(error) //return the error if above is not true
//         );

//         const responseIntercept = axiosPrivate.interceptors.response.use(
//             response => response, //if the response is good, return it
//             async (error) => { //error handler if the token expired

//                 //get the prev request by accessing the config property (using optinal chaining jus to be safe, if for some reasons the config wouldnt exit)
//                 const prevRequest = error?.config;
//                     //expect it to be 403 which is forbidden, if request is failed due to expired token
//                     //if sent does not exit or not true, we dont want endless loop, only want to retry once
//                 if (error?.response?.status === 403 && !prevRequest?.sent) {
//                     prevRequest.sent = true;
//                     console.log(auth);
//                     const newAccessToken = await refresh(); //get a new token

//                     //access the prev request and get into the headers and authorization setting, where we set the token. Bearer is where we pass in the new token
//                     prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
//                     return axiosPrivate(prevRequest); //return and call axiosPrivate again and pass in the prev request, which is updated by refresh token
//                 }
//                 return Promise.reject(error); //return the error if above is not true
//             }
//         );

//         return () => {
//             //removing intercetors or else it will pile on then we couldve many response intercetors
//             //cleanup
//             axiosPrivate.interceptors.request.eject(requestIntercept);
//             axiosPrivate.interceptors.response.eject(responseIntercept);
//         }
//     }, [auth, refresh])

//     return axiosPrivate;
// }

// export default useAxiosPrivate;

import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

const useAxiosPrivate = (req, res) => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        //if the authorization header does not exit, then its not a retry, its the first attempt
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.token}`; //token from when we signed in or after a refresh
        }
        return config;
      },
      (error) => Promise.reject(error) //return the error if above is not true
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response, //if the response is good, return it
      async (error) => {
        //error handler if the token expired
        //get the prev request by accessing the config property (using optinal chaining jus to be safe, if for some reasons the config wouldnt exit)
        const prevRequest = error?.config;

        //expect it to be 403 which is forbidden, if request is failed due to expired token
        //                     //if sent does not exit or not true, we dont want endless loop, only want to retry once
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          //console.log("test:");
          prevRequest.sent = true;
          const newAccessToken = await refresh(); //get a new token
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      //removing intercetors or else it will pile on then we couldve many response intercetors
      //cleanup
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
