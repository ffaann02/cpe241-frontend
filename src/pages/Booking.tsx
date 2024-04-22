import { useState } from 'react';

export default function Booking() {
  const [count, setCount] = useState(1);

  const increment = () => {
    setCount(prevCount => prevCount + 1);
  };

  const decrement = () => {
    if (count >= 1) {
      setCount(prevCount => prevCount - 1);
    }
  };

  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    suffix: '',
    dateOfBirth: '',
    email: '',
    phoneNumber: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSaveAndClose = () => {
    // Add your logic here to save the form data and close
    console.log('Form data saved:', formData);
  };
  
    return (
      <>
        <section className="p-8 grid md:grid-cols-10">
          <section className="mx-4 col-span-6">
            <h1 className="text-blue-500 text-3xl mb-4">ข้อมูลผู้โดยสาร</h1>
            <p className="mb-8">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic, laudantium sint? Repellat exercitationem voluptatibus autem aspernatur hic excepturi molestias ipsa.</p>
            <h2 className="text-[#6E7491] text-lg font-medium my-4">ผู้โดยสาร 1 (ผู้ใหญ่)</h2>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <label className="input input-bordered flex items-center gap-2">
                <input
                  type="text"
                  className="grow"
                  placeholder="ชื่อ*"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <input
                  type="text"
                  className="grow"
                  placeholder="ชื่อกลาง"
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleChange}
                />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <input
                  type="text"
                  className="grow"
                  placeholder="นามสกุล*"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <label className="input input-bordered flex items-center gap-2">
                <input
                  type="text"
                  className="grow"
                  placeholder="คำลงท้าย"
                  name="suffix"
                  value={formData.suffix}
                  onChange={handleChange}
                />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <input
                  type="text"
                  className="grow"
                  placeholder="วันเดือนปีเกิด*"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <label className="input input-bordered flex items-center gap-2">
                <input
                  type="text"
                  className="grow"
                  placeholder="ที่อยู่อีเมล*"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <input
                  type="text"
                  className="grow"
                  placeholder="เบอร์ติดต่อ*"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              </label>
            </div>
            <h2 className="text-[#6E7491] text-lg font-medium my-4">ข้อมูลติดต่อฉุกเฉิน</h2>
            <div className="">
              <div className="justify-start flex my-4">
                <label className="label cursor-pointer">
                  <input type="checkbox" defaultChecked className="checkbox" />
                  <span className="mx-4 text-[#6E7491] font-normal">ใช้ข้อมูลของผู้โดยสาร 1</span> 
                </label>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <label className="input input-bordered flex items-center gap-2">
                  <input
                    type="text"
                    className="grow"
                    placeholder="ชื่อ*"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                  <input
                    type="text"
                    className="grow"
                    placeholder="นามสกุล*"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <label className="input input-bordered flex items-center gap-2">
                  <input
                    type="text"
                    className="grow"
                    placeholder="ที่อยู่อีเมล*"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                  <input
                    type="text"
                    className="grow"
                    placeholder="เบอร์ติดต่อ*"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                  />
                </label>
              </div>
            </div>
            <h1 className="text-blue-500 text-3xl my-4">ข้อมูลกระเป๋าเดินทาง</h1>
            <p className="mb-8">Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis cum natus consequatur quam ullam vero itaque aspernatur omnis voluptates ad culpa, corrupti ut sit, quisquam at repellat consectetur quaerat laborum odio. Quo nihil unde ab ducimus repellendus sapiente nisi sunt.</p>
            <div className="grid grid-cols-2">
              <div className="text-[#6E7491] text-lg">
                <h1 className="py-4">ผู้โดยสาร 1</h1>
                <h1>{formData.firstName} {formData.lastName}</h1>
              </div>
              <div className="text-[#6E7491] text-lg">
                <h1 className="py-4">จำนวนกระเป๋าเดินทาง</h1>
                <div className=" flex items-center gap-4">
                  <button className="text-[#605DEC] text-3xl font-semibold cursor-pointer disabled:cursor-not-allowed" onClick={decrement}>-</button>
                  <span className="text-[#6E7491] text-base font-semibold">{count}</span>
                  <button className="text-[#605DEC] text-xl font-semibold cursor-pointer" onClick={increment}>+</button>          
                </div>
              </div>
            </div>
            <div className="mt-10">
            <button className="btn mx-4 bg-white text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white hover:border-hidden" onClick={handleSaveAndClose}>บันทึกและปิด</button>
              <button className="btn mx-4 bg-slate-300 text-slate-600 border-slate-600  hover:bg-blue-500 hover:text-white hover:border-hidden">เลือกที่นั่ง</button>
            </div>
          </section>
          <section className="justify-end mx-4 my-10 col-span-4">
            <img className="w-full h-fit rounded-xl" src="https://cdn.zeebiz.com/sites/default/files/2023/08/19/256870-air-india-reuters.jpg?im=FitAndFill=(1200,900)" alt="" />
            <div className="mt-6 grid-cols-3 grid gap-2">
              <div className="col-end-4 w-full flex items-center justify-between text-[#27273F] text-sm sm:text-base">
                <p>ผลรวมย่อย</p>
                <p>$503</p>
              </div>
              <div className="col-end-4 w-full flex items-center justify-between text-[#27273F] text-sm sm:text-base">
                <p>ภาษี</p>
                <p>$121</p>
              </div>
              <div className="col-end-4 w-full flex items-center justify-between text-[#27273F] text-sm sm:text-base">
                <p>ผลรวมสุทธิ</p>
                <p>$624</p>
              </div>
            </div>
          </section>
        </section>
      </>
    );
    
  } 
  
