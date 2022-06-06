// import { axiosPrivate as axios } from "../api/axios";
// import useAuth from "./useAuth";

// const useRefreshToken = () => {
//   const { setAuth } = useAuth();

//   const refresh = async () => {
//     const response = await axios.get("auth/refreshtoken", {
//       withCredentials: true, //this setting allows us to send cookies with our request and send along our cookie that has the response token
//     });
//     setAuth((prev) => { //gets the prev state
//       console.log(JSON.stringify(prev));
//       console.log(response.data.token);
//       return { ...prev, token: response.data.token }; //return our prev state and overwrite the token with the new token
//     });
//     return response.data.token; //return the new token
//   };
//   return refresh;
// };

// export default useRefreshToken;
import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();



    const refresh = async () => {

    

        const response = await axios.post('/auth/RefreshToken',
        {
            withCredentials: true
        });
        setAuth(prev => {
            return {
                ...prev,
                roles: response.data.roles,
                token: response.data.token,
                refreshToken: response.data.refreshToken
            }
        });
        return response.data.token;
    }
    return refresh;
};

export default useRefreshToken;
