import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Home from './pages/home';
import About from './pages/AboutUs';
import './App.css';
import SignupPage from './pages/Signup';
import LoginPage from './pages/login';
import Navbar from './components/navbar';
import Footer from './components/footer';

function App() {
    const token = localStorage.getItem('token');
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    return (
        <>
            <div className="h-screen">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/AboutUs" element={<About />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/protected" element={<SignupPage />} />
                </Routes>
                <Footer />
            </div>
        </>
    );
}
export default App;
