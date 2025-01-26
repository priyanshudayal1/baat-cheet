import axios from 'axios';
import { BACKEND_URL } from './constants';

export const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE === "development" ? BACKEND_URL : "",
    withCredentials: true,
});