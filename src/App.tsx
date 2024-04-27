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

function App() {
    return (
        <>
            <div className="w-full h-full">
                <Navbar isLoggedIn={false}/>
                <div className="w-full h-full min-h-screen pt-[4.25rem] flex" id="app_container">
                    <div className="flex-1">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/signup" element={<SignupPage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/booking" element={<Booking />} />
                            <Route path="/payment" element={<Payment />} />
                            <Route path="/search" element={<Search/>}/>
                        </Routes>
                    </div>
                </div>
                <Footer/>
            </div>
        </>
    );
}
export default App;
