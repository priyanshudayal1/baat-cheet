import axios from 'axios';
import { BACKEND_URL } from './constants';

export const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE === "development" ? BACKEND_URL : "https://baat-cheet-w19c.onrender.com/api",
    withCredentials: true,
});