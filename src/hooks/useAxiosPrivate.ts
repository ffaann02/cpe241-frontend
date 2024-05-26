import axiosPrivate from '../api/axios';
import { useEffect } from 'react';
import useAuth from './useAuth';

const useAxiosPrivate = () => {
    const { auth } = useAuth();

    useEffect(() => {
        const responseIntercept = axiosPrivate.interceptors.response.use(
            (response) => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest?._retry) {
                    console.log('Refreshing token');
                    prevRequest._retry = true;
                    await axiosPrivate.post('/refresh');
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.response.eject(responseIntercept);
        };
    }, [auth]);

    return axiosPrivate;
};

export default useAxiosPrivate;
