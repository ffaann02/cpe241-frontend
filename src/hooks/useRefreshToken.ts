import axios from '../api/axios';

const useRefreshToken = async () => {
    const refresh = async () => {
        const response = await axios.post('/api/refresh', {
            withCredentials: true,
        });
        console.log(response.data);
        return response.data;
    };

    return { refresh };
};

export default useRefreshToken;
