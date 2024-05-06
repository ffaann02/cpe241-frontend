import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const AdminRoute = () => {
    const { auth } = useAuth();
    if (!auth || auth?.role === 0) return <Navigate to="/" />;
    return <Outlet />;
};

export default AdminRoute;
