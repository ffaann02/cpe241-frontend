import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import About from './pages/AboutUs';
import './App.css';
import SignupPage from './pages/Signup';
import LoginPage from './pages/login';
import Navbar from './components/Navbar';
import Footer from './components/footer';
import Payment from './pages/Payment';

function App() {
    return (
        <>
            <div className="h-screen">
                <div className="">
                    <Navbar />
                </div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/AboutUs" element={<About />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/payment" element={<Payment />} />
                </Routes>
                <div className="relative">
                    <Footer />
                </div>
            </div>
        </>
    );
}
export default App;
