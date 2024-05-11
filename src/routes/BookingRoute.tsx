import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const BookingRoute = () => {
    const {auth, loading} = useAuth();
    if (!loading && (!auth || !auth.userid)) return <Navigate to="/login" />;
    return <Outlet />;
};
export default BookingRoute;