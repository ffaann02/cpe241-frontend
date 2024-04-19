import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/AboutUs";
import "./App.css";
import SignupPage from "./pages/Signup";
import LoginPage from "./pages/login";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

function App() {
  return (
    <>
      <div className="h-screen">
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/AboutUs" element={<About />} />
          <Route path="/signup" element={<SignupPage/>} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
        <Footer/>
      </div>     
    </>
  );
}
export default App;
