import { Link } from "react-router-dom";
import { Avatar } from '@chakra-ui/react'
import { Menu, MenuButton, MenuList, MenuItem} from '@chakra-ui/react'
// import logoTest from "/assets/logo-test.png";

interface NavbarProps {
  isLoggedIn: boolean;
}
function Navbar({ isLoggedIn }: NavbarProps) {
  return (
    <>
      <div className="navbar bg-base-100 shadow-sm rounded-md rounded-b-none fixed px-12 z-50">
        <div className="navbar-start">
          <div className="dropdown">
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
          {/* <Link to="/"><img src={logoTest} className="w-20"/></Link> */}
          <Link to="/"><a>LOGO</a></Link>
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
          {!isLoggedIn && <Link to="/login" className="btn mx-5 bg-base-600 shadow-md">เข้าสู่ระบบ</Link>}
          {!isLoggedIn && <Link to="/SignUp" className="btn mr-5 bg-purple-600 text-white shadow-md">ลงทะเบียน</Link>}
          {isLoggedIn && <Menu>
            <MenuButton as={Avatar} src='https://bit.ly/broken-link' />
            <MenuList>
              <MenuItem>ข้อมูลผู้ใช้</MenuItem>
              <MenuItem>ประวัติการจอง</MenuItem>
            </MenuList>
          </Menu>}
        </div>
      </div>
    </>
  );
}

export default Navbar;
