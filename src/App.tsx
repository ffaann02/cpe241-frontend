import { Routes, Route } from 'react-router-dom';
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
import TripSection from './components/homePage/Trip/TripSection';
import PrivateRoute from './routes/PrivateRoute';
import NotFound from './pages/NotFound';
import Dashboard from './pages/Dashboard';
import { useLocation } from 'react-router-dom';


function App() {
    const location = useLocation();
    const disableNavbar = location.pathname.includes('dashboard');

    return (
        <>
            <div className="w-full h-full font-IBM-Plex">
                {!disableNavbar && <Navbar isLoggedIn={false} />}
                <div className="w-full h-full min-h-screen pt-[60px] flex" id="app_container">
                    <div className="flex-1">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/signup" element={<SignupPage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/booking" element={<Booking />} />
                            <Route path="/payment" element={<Payment />} />
                            <Route path="search" element={<Search />} />
                            <Route path="/trip" element={<TripSection />} />
                            <Route path="*" element={<NotFound />} />
                            <Route element={<PrivateRoute />}>
                                {/* <Route path="/booking" element={<Booking />} />
                                <Route path="/payment" element={<Payment />} /> */}
                            </Route>

                            <Route path="dashboard/*" element={<Dashboard />} />

                        </Routes>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}
export default App;
