import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const PrivateRoute = () => {
    const { auth } = useAuth();
    if (!auth || auth?.userid) return <Navigate to="/login" />;
    return <Outlet />;
};

export default PrivateRoute;
