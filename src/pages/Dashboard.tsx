import { Routes, Route, Navigate } from 'react-router-dom';
import AuthLayout from '../dashboard/layouts/auth';
import AdminLayout from '../dashboard/layouts/admin';
import RtlLayout from '../dashboard/layouts/rtl';
const Dashboard = () => {
    return (
        <>
            <Routes>
                <Route path="auth/*" element={<AuthLayout />} />
                <Route path="admin/*" element={<AdminLayout />} />
                <Route path="rtl/*" element={<RtlLayout />} />
                <Route path="/" element={<Navigate to="admin" />} />
            </Routes>
        </>
    );
};

export default Dashboard;
