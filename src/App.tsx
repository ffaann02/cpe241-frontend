import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/AboutUs";
import "./App.css";
import Footer from "./components/footer";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/AboutUs" element={<About />} />
        </Routes>
        <Footer/>
      </div>
      
    </>
  );
}

export default App;
