import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import "./App.css";
import Navbar from "./components/navbar";

function App() {
  return (
    <>
      <div>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
