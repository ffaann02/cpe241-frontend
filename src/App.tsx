import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import "./App.css";
import LoginPage from "./pages/login";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
