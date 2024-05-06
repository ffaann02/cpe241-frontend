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
import Confirm from './pages/Confirm';
import TripSection from './components/homePage/Trip/TripSection';
import AdminRoute from './routes/AdminRoute';
import PrivateRoute from './routes/PrivateRoute';
import ProfilePage from './pages/Profile';
import NotFound from './pages/NotFound';
import RtlLayout from './dashboard/layouts/rtl';
import AdminLayout from './dashboard/layouts/admin';
import AuthLayout from './dashboard/layouts/auth';
import { useLocation } from 'react-router-dom';
import SelectSeat from './pages/SelectSeat';

function App() {
    const location = useLocation();
    const disableNavbar =
        location.pathname.includes('dashboard') ||
        location.pathname.includes('auth') ||
        location.pathname.includes('rtl') ||
        location.pathname.includes('admin');

    return (
        <>
            <div className="w-full h-full font-IBM-Plex">
                {!disableNavbar && <Navbar />}
                <div className={`w-full h-full min-h-screen ${!disableNavbar && 'pt-[60px]'} flex`} id="app_container">
                    <div className="flex-1">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/signup" element={<SignupPage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/booking" element={<Booking />} />
                            <Route path="/payment" element={<Payment />} />
                            <Route path="/confirm" element={<Confirm />} />
                            <Route path="/select-seat" element={<SelectSeat/>} />
                            <Route path="/search" element={<Search />} />
                            <Route path="/profile" element={<ProfilePage />} />
                            <Route path="auth/*" element={<AuthLayout />} />
                            <Route path="admin/*" element={<AdminLayout />} />
                            <Route path="rtl/*" element={<RtlLayout />} />
                            <Route path="/dashboard" element={<Navigate to="/admin" replace />} />
                            <Route path="/trip" element={<TripSection />} />
                            <Route path="*" element={<NotFound />} />
                            <Route element={<PrivateRoute />}>
                                {/* <Route path="/booking" element={<Booking />} />
                                <Route path="/payment" element={<Payment />} /> */}
                            </Route>
                            <Route element={<AdminRoute />}>
                                <Route path="/dashboard" element={<h1>Admin Page</h1>} />
                            </Route>
                        </Routes>
                    </div>
                </div>
                {!disableNavbar && <Footer />}
            </div>
        </>
    );
}
export default App;
