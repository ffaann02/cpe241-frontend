import axios from 'axios';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL ? import.meta.env.VITE_BASE_URL : 'http://localhost:3000';

const BASE_URL = import.meta.env.VITE_BASE_URL ? import.meta.env.VITE_BASE_URL : 'http://localhost:3000';

const axiosPrivate = axios.create({
    withCredentials: true,
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
});

axiosPrivate.interceptors.response.use(
    (response) => response,
    async (error) => {
        const prevRequest = error?.config;
        const isLoggedIn = localStorage.getItem('auth');

        if (isLoggedIn && error?.response?.status === 401 && !prevRequest?._retry) {
            console.log('Refreshing token');
            prevRequest._retry = true;
            await axiosPrivate.post('/api/refresh');
            return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
    }
);

export default axiosPrivate;
