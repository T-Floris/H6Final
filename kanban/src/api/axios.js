import axios from 'axios';
const BASE_URL = 'https://localhost:44338/api/';

export const defaultvalue = axios.create({
    baseURL: BASE_URL

});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});