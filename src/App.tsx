import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import About from './pages/AboutUs';
import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';
import Navbar from './components/layoutBar/Navbar';
import Home from './pages/Home';
import Booking from './pages/Booking';
import Payment from './pages/Payment';
import Footer from './components/layoutBar/Footer';
import Search from './pages/Search';
import RtlLayout from "./dashboard/layouts/rtl";
import AdminLayout from "./dashboard/layouts/admin";
import AuthLayout from "./dashboard/layouts/auth"; 

function App() {
    return (
        <>
            <div className="w-full">
                <Navbar isLoggedIn={false} />
                <div className="w-full h-full min-h-screen pt-[3.8rem] flex" id="app_container">
                    <div className="flex-1 bg-slate-50">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/signup" element={<SignupPage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/booking" element={<Booking />} />
                            <Route path="/payment" element={<Payment />} />
                            <Route path="search" element={<Search />} />
                            <Route path="auth/*" element={<AuthLayout />} />
                            <Route path="admin/*" element={<AdminLayout />} />
                            <Route path="rtl/*" element={<RtlLayout />} />
                            <Route path="/dashboard" element={<Navigate to="/admin" replace />} />
                        </Routes>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}
export default App;
