import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import "./App.css";
import Signin from "./pages/signIn";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin/>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
