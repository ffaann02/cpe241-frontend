import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL ? import.meta.env.VITE_BASE_URL : 'http://localhost:3000';

export default axios.create({
    baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
    withCredentials: true,
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
});
