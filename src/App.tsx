import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import "./App.css";
import SignupPage from "./pages/Signup";
import LoginPage from "./pages/login";

function App() {
  return (
    <>
      <div className="h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignupPage/>} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
