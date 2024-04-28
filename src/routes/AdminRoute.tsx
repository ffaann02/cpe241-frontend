import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const AdminRoute = () => {
    const { auth } = useAuth();
    if (!auth || auth?.role !== 'employee') return <Navigate to="/" />;
    return <Outlet />;
};

export default AdminRoute;
