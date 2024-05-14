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
import PrivateRoute from './routes/PrivateRoute';

import NotFound from './pages/NotFound';
import Mybooking from './pages/MyBooking';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profilenew'
import { useLocation } from 'react-router-dom';
import SelectSeat from './pages/SelectSeat';
import BookingNavbar from './components/layoutBar/BookingNavbar';
import BookingRoute from './routes/BookingRoute';
import BookingDetailsProvider from './context/BookingDetailsProvider';
import MybookingEdit from './pages/Mybooking-Edit';
import CancelBooking from './pages/CancelBooking';
function App() {
    const location = useLocation();
    const disableNavbar =
        location.pathname.includes('login') ||
        location.pathname.includes('signup') ||
        location.pathname.includes('dashboard') ||
        location.pathname.includes('auth') ||
        location.pathname.includes('rtl') ||
        location.pathname.includes('admin');
    const enableBookingNavbar = location.pathname.startsWith('/booking');
    return (
        <>
            <div className="w-full h-full font-IBM-Plex">
                {!disableNavbar && !enableBookingNavbar && <Navbar />}
                <div className={`w-full h-full min-h-screen ${!disableNavbar && 'pt-[60px]'} flex`} id="app_container">
                    <div className="flex-1">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/signup" element={<SignupPage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route
                                path="/booking"
                                element={
                                    <BookingDetailsProvider>
                                       {enableBookingNavbar && <BookingNavbar />}
                                        <BookingRoute />
                                    </BookingDetailsProvider>
                                }
                            >
                                <Route path="passenger" element={<Booking />} />
                                <Route path="select-seat" element={<SelectSeat />} />
                                <Route path="payment" element={<Payment />} />
                                <Route path="confirm" element={<Confirm />} />
                            </Route>
                            <Route path="/search" element={<Search />} />
                            {/* <Route path="auth/*" element={<AuthLayout />} />
                            <Route path="admin/*" element={<AdminLayout />} />
                            <Route path="rtl/*" element={<RtlLayout />} /> */}
                            <Route path="/dashboard" element={<Navigate to="admin" replace />} />
                            <Route path="/confirm" element={<Confirm />} />
                            <Route path="/trip" element={<TripSection />} />
                            <Route path="*" element={<NotFound />} />
                            <Route element={<PrivateRoute />}>
                                {/* <Route path="/booking" element={<Booking />} />
                                <Route path="/payment" element={<Payment />} /> */}
                            </Route>
                            <Route path="mybooking" element={<Mybooking />} />
                            <Route path="mybooking/edit" element={<MybookingEdit />} />
                            <Route path="/mybooking/cancel" element={<CancelBooking />} />
                            <Route path="dashboard/*" element={<Dashboard />} />
                            <Route path="/profile" element={<Profile />} />

                        </Routes>
                    </div>
                </div>
                {!disableNavbar && <Footer />}
            </div>
        </>
    );
}
export default App;
