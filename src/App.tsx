import { Routes, Route } from "react-router-dom";
import "./App.css";
import About from "./pages/AboutUs";
import SignupPage from "./pages/Signup";
import LoginPage from "./pages/Login";
import Navbar from "./components/layoutBar/Navbar";
import Footer from "./components/layoutBar/Footer";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <div className="w-full">
        <Navbar/>
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
        <Footer/>
      </div>     
    </>
  );
}
export default App;
