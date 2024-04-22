import { Routes, Route } from "react-router-dom";
import "./App.css";
<<<<<<< HEAD
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Booking from "./pages/booking";
=======
import Home from "./pages/Home";
import About from "./pages/AboutUs";
import SignupPage from "./pages/Signup";
import LoginPage from "./pages/Login";
import Navbar from "./components/layoutBar/Navbar";
import Footer from "./components/layoutBar/Footer";
>>>>>>> 2fb8127029f762f3f1e8c51073fc414070102e0a

function App() {
  return (
    <>
      <div className="w-full">
        <Navbar/>
<<<<<<< HEAD
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/AboutUs" element={<About />} />
          <Route path="/Booking" element={<Booking />} />
        </Routes>
=======
        <div className="w-full h-full min-h-screen pt-[4.25rem] flex" id="app_container">
          <div className="flex-1 bg-slate-50">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/about" element={<About/>} />
            <Route path="/signup" element={<SignupPage/>} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
          </div>
        </div>
>>>>>>> 2fb8127029f762f3f1e8c51073fc414070102e0a
        <Footer/>
      </div>     
    </>
  );
}
export default App;
