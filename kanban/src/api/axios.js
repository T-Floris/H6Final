import axios from "axios";
const BASE_URL = "https://localhost:44338/api";

export const defaultvalue = axios.create({
    baseURL: BASE_URL

});

//interceptors and attach the jwt token for us and try when we fail which comes back as 403 forbidden
export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true, //this setting allows us to send cookies with our request and send along our cookie that has the response token
});
