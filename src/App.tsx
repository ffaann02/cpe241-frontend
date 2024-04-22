import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/AboutUs";
import "./App.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Booking from "./pages/booking";

function App() {
  return (
    <>
      <div>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/AboutUs" element={<About />} />
          <Route path="/Booking" element={<Booking />} />
        </Routes>
        <Footer/>
      </div>
      
    </>
  );
}

export default App;
