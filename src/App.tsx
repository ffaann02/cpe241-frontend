import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import "./App.css";
import Signin from "./pages/signIn";
import LoginPage from "./pages/login";

function App() {
  return (
    <>
      <div className="h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin/>} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
