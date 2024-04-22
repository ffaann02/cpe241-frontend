import { Link } from "react-router-dom";
<<<<<<< HEAD:src/components/navbar.tsx
import Booking from "../pages/booking";
import Home from "../pages/home";
=======
>>>>>>> 2fb8127029f762f3f1e8c51073fc414070102e0a:src/components/layoutBar/Navbar.tsx

function Navbar() {
  return (
    <>
<<<<<<< HEAD:src/components/navbar.tsx
      <div className="navbar bg-base-100 shadow-md rounded-md ">
        <div className="navbar-start">
          <div className="dropdown ">
=======
      <div className="navbar bg-base-100 shadow-sm rounded-md rounded-b-none fixed px-12 z-50">
        <div className="navbar-start  ">
          <div className="dropdown">
>>>>>>> 2fb8127029f762f3f1e8c51073fc414070102e0a:src/components/layoutBar/Navbar.tsx
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </div>
            <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <a>จองที่พัก</a>
                <ul className="p-2">
                  <li><a>Submenu 1</a></li>
                  <li><a>Submenu 2</a></li>
                </ul>
              </li>
              <li><Link to="/booking"><a>จองตั๋วเครื่องบิน</a></Link></li>
              <li><a>สถานที่ท่องเที่ยว</a></li>
              <li><a>แพ็กเกจ</a></li>
              <li><a>องค์กร</a></li>
            </ul>
          </div>
<<<<<<< HEAD:src/components/navbar.tsx
          <Link to="/" className="btn btn-ghost text-xl">
            daisyUI
          </Link>        
=======
          <Link to="/"><a className="text-3xl font-bold tracking-wide text-purple-700">Agado</a></Link>
>>>>>>> 2fb8127029f762f3f1e8c51073fc414070102e0a:src/components/layoutBar/Navbar.tsx
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <details>
                <summary>จองที่พัก</summary>
                <ul className="p-2">
                  <li><a>Submenu 1</a></li>
                  <li><a>Submenu 2</a></li>
                </ul>
              </details>
            </li>
            <li><Link to="/booking"><a>จองตั๋วเครื่องบิน</a></Link></li>
            <li><a>สถานที่ท่องเที่ยว</a></li>
            <li><a>แพ็กเกจ</a></li>
            <li><a>องค์กร</a></li>
          </ul>
        </div>
        <div className="navbar-end justify-end">
          <a className="btn mx-5 bg-base-100 border-hidden">ติดต่อเพิ่มเติม</a>
          <a className="btn mx-5 bg-base-600 shadow-md">เข้าสู่ระบบ</a>
          <a className="btn mr-5 bg-purple-600 text-white shadow-md">ลงทะเบียน</a>
        </div>
      </div>
    </>
  );
}

export default Navbar;
