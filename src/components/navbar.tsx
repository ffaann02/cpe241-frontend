function Navbar() {
  return (
    <>
      <div className="navbar bg-base-100 shadow-md rounded-md">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </div>
            <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <a>Product</a>
                <ul className="p-2">
                  <li><a>Submenu 1</a></li>
                  <li><a>Submenu 2</a></li>
                </ul>
              </li>
              <li>
                <a>Solutions</a>
                <ul className="p-2">
                  <li><a>Submenu 1</a></li>
                  <li><a>Submenu 2</a></li>
                </ul>
              </li>
              <li>
                <a>Learn</a>
                <ul className="p-2">
                  <li><a>Submenu 1</a></li>
                  <li><a>Submenu 2</a></li>
                </ul>
              </li>
              <li><a>Pricing</a></li>
              <li><a>Enterprise</a></li>
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">daisyUI</a>
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
            <li>
              <details>
                <summary>จองตั๋วเครื่องบิน</summary>
                <ul className="p-2">
                  <li><a>Submenu 1</a></li>
                  <li><a>Submenu 2</a></li>
                </ul>
              </details>
            </li>
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
