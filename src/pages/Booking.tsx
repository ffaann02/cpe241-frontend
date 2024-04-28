import { useState } from 'react';
import Datepicker from "react-tailwindcss-datepicker"; 
import FlightCartData from '../components/Card/FlightCartCard';
import fakeFlightData from '../data/fakeFlightData.json';

export default function Booking() {
  const [passengerData, setPassengerData] = useState([
    {
      firstName: '',
      middleName: '',
      lastName: '',
      suffix: '',
      dateOfBirth: { startDate: null, endDate: null },
      email: '',
      phoneNumber: '',
      count: 1
    }
  ]);
  
  const increment = (index) => {
    setPassengerData((prevPassengerData) => {
      const updatedPassengerData = [...prevPassengerData];
      updatedPassengerData[index] = {
        ...updatedPassengerData[index],
        count: updatedPassengerData[index].count + 1
      };
      return updatedPassengerData;
    });
  };
  
  const decrement = (index) => {
    setPassengerData((prevPassengerData) => {
      const updatedPassengerData = [...prevPassengerData];
      if (updatedPassengerData[index].count > 1) {
        updatedPassengerData[index] = {
          ...updatedPassengerData[index],
          count: updatedPassengerData[index].count - 1
        };
      }
      return updatedPassengerData;
    });
  };  

    const [emergencyContactData, setEmergencyContactData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: ''
    });
  
    const [usePassengerDataForEmergencyContact, setUsePassengerDataForEmergencyContact] = useState(false);  
  
    const handleChangePassenger = (index, e) => {
      const { name, value } = e.target;
      const updatedPassengerData = [...passengerData];
      updatedPassengerData[index][name] = value;
  
      if (name === 'dateOfBirth') {
        updatedPassengerData[index][name] = new Date(value);
      }
  
      setPassengerData(updatedPassengerData);
    };

    const handleDateOfBirthChange = (index, value) => {
      const updatedPassengerData = [...passengerData];
      updatedPassengerData[index].dateOfBirth = value;
      setPassengerData(updatedPassengerData);
    };

    const handleAddPassenger = () => {
      setPassengerData([
        ...passengerData,
        {
          firstName: '',
          middleName: '',
          lastName: '',
          suffix: '',
          dateOfBirth: { startDate: null, endDate: null},
          email: '',
          phoneNumber: '',
          count: 1
        }
      ]);
    };
    
    const handleDeletePassenger = (index) => {
      if (passengerData.length > 1) {
        const updatedPassengerData = [...passengerData];
        updatedPassengerData.splice(index, 1);
        setPassengerData(updatedPassengerData);
      }
    };    

    const handleChangeEmergencyContact = (e) => {
      const { name, value } = e.target;
      setEmergencyContactData(prevData => ({
        ...prevData,
        [name]: value
      }));
    };
    
    const handleChangeCheckbox = (e) => {
      const { checked } = e.target;
      setUsePassengerDataForEmergencyContact(checked);
  
      if (!checked) {
        setEmergencyContactData({
          firstName: '',
          lastName: '',
          email: '',
          phoneNumber: ''
        });
      } else {
        const firstPassengerData = passengerData[0];
        setEmergencyContactData({
          firstName: firstPassengerData.firstName,
          lastName: firstPassengerData.lastName,
          email: firstPassengerData.email,
          phoneNumber: firstPassengerData.phoneNumber
        });
      }
    };

    const handleSaveAndClose = () => {
      const isValid = passengerData.every(passenger => {
        return passenger.firstName.trim() !== '' &&
               passenger.lastName.trim() !== '' &&
               passenger.email.trim() !== '' &&
               passenger.phoneNumber.trim() !== '';
      });
    
      if (isValid) {
        console.log('Form data saved:', passengerData);      
      } else {
        console.log('Please fill in all required fields for each passenger.');
      }
    };
    // useEffect(() => {
    //     const cityCode = flightData[index][state];
    //     if (cityCode === '') {
    //         setSelectedCity(null);
    //         setSearchTerm('');
    //         return;
    //     }
    //     if (cityCode) {
    //         const city = fakeFlightData.find((city) => city.code === cityCode);
    //         if (city) {
    //             setSelectedCity(city);
    //             setSearchTerm(`${city.name} (${city.code})`);
    //         }
    //     }
    // }, [selectedCity, flightData[index][state]]); 

    const handleSelectSeat = () => {
      console.log('Route to Seat Selection Path')
    }

    return (
        <>
            <section className="p-8 grid md:grid-cols-10 mx-20 gap-x-10">
                <section className="mx-4 md:col-span-6 pr-20">
                    <h1 className="text-blue-500 text-3xl mb-4">ข้อมูลผู้โดยสาร</h1>
                    <p className="mb-8 text-[#7C8DB0] text-base font-normal">
                    Enter the required information for each traveler and be sure that it exactly matches the government-issued ID presented at the airport.
                    </p>
                    {passengerData.map((passenger, index) => (
                      <div className="grid grid-cols-6 gap-4 mb-4" key={index}>
                        <h2 className="text-[#6E7491] text-lg font-medium col-span-6">ผู้โดยสาร {index + 1} {index > 0 ? null : '(ผู้ใหญ่)'}</h2>
                        <label className="input border-[#A1B0CC] placeholder:text-[#7C8DB0] text-[#7C8DB0] px-2 py-3 text-base rounded outline-none flex items-center gap-2 col-span-2">
                          <input
                            type="text"
                            className="grow"
                            placeholder="ชื่อ*"
                            name="firstName"
                            value={passenger.firstName}
                            onChange={(e) => handleChangePassenger(index, e)}
                          />
                        </label>
                        <label className="input border-[#A1B0CC] placeholder:text-[#7C8DB0] text-[#7C8DB0] px-2 py-3 text-base rounded flex items-center gap-2 col-span-2">
                          <input
                            type="text"
                            className="grow"
                            placeholder="ชื่อกลาง"
                            name="middleName"
                            value={passenger.middleName}
                            onChange={(e) => handleChangePassenger(index, e)}
                          />
                        </label>
                        <label className="input border-[#A1B0CC] placeholder:text-[#7C8DB0] text-[#7C8DB0] px-2 py-3 text-base rounded flex items-center gap-2 col-span-2">
                          <input
                            type="text"
                            className="grow"
                            placeholder="นามสกุล*"
                            name="lastName"
                            value={passenger.lastName}
                            onChange={(e) => handleChangePassenger(index, e)}
                          />
                        </label>
                        <label className="input border-[#A1B0CC] placeholder:text-[#7C8DB0] text-[#7C8DB0] px-2 py-3 text-base rounded flex items-center gap-2 col-span-3 ">
                          <input
                            type="text"
                            className="grow"
                            placeholder="คำลงท้าย"
                            name="suffix"
                            value={passenger.suffix}
                            onChange={(e) => handleChangePassenger(index, e)}
                          />
                        </label>
                        <div className="col-span-2 relative">
                          <Datepicker 
                            asSingle={true} 
                            value={passenger.dateOfBirth} 
                            onChange={(e) => handleDateOfBirthChange(index, e)} 
                            popoverDirection="down" 
                            inputClassName="h-full border w-full px-2 py-3 rounded border-[#A1B0CC] focus:border-[#7C8DB0] input input-bordered"
                          />
                        </div>
                        <label className="input border-[#A1B0CC] placeholder:text-[#7C8DB0] text-[#7C8DB0] px-2 py-3 text-base rounded flex items-center gap-2 col-span-3">
                          <input
                            type="text"
                            className="grow"
                            placeholder="ที่อยู่อีเมล*"
                            name="email"
                            value={passenger.email}
                            onChange={(e) => handleChangePassenger(index, e)}
                          />
                        </label>
                        <label className="input border-[#A1B0CC] placeholder:text-[#7C8DB0] text-[#7C8DB0] px-2 py-3 text-base rounded flex items-center gap-2 col-span-2">
                          <input
                            type="text"
                            className="grow"
                            placeholder="เบอร์ติดต่อ*"
                            name="phoneNumber"
                            value={passenger.phoneNumber}
                            onChange={(e) => handleChangePassenger(index, e)}
                          />
                        </label>
                        {index !== passengerData.length - 1 && (
                          <button className="btn rounded bg-white text-red-500 border-red-500 hover:bg-red-500 hover:text-white hover:border-hidden w-[120px] col-start-1" onClick={() => handleDeletePassenger(index)}>ลบผู้โดยสาร</button>
                        )}
                        {index === passengerData.length - 1 && (
                          <button className="btn rounded bg-white text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white hover:border-hidden w-[120px] col-start-1" onClick={handleAddPassenger}>เพิ่มผู้โดยสาร</button>
                        )}
                      </div>
                    ))}
                    <h2 className="text-[#6E7491] text-lg font-medium mt-10">ข้อมูลติดต่อฉุกเฉิน</h2>
                      <div className="justify-start flex my-4">
                        <label className="label">
                          <input
                            type="checkbox"
                            className='my-auto flex cursor-pointer'
                            checked={usePassengerDataForEmergencyContact}
                            onChange={handleChangeCheckbox}
                          />
                          <span className="mx-4 text-[#6E7491] font-normal">ใช้ข้อมูลของผู้โดยสาร 1</span>
                        </label>
                      </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <label className="input border-[#A1B0CC] placeholder:text-[#7C8DB0] text-[#7C8DB0] px-2 py-3 text-base rounded flex items-center gap-2">
                        <input
                          type="text"
                          className="grow"
                          placeholder="ชื่อ*"
                          name="firstName"
                          value={emergencyContactData.firstName}
                          onChange={handleChangeEmergencyContact}    
                          disabled={usePassengerDataForEmergencyContact}              
                        />
                      </label>
                      <label className="input border-[#A1B0CC] placeholder:text-[#7C8DB0] text-[#7C8DB0] px-2 py-3 text-base rounded flex items-center gap-2">
                        <input
                          type="text"
                          className="grow"
                          placeholder="นามสกุล*"
                          name="lastName"
                          value={emergencyContactData.lastName}
                          onChange={handleChangeEmergencyContact}
                          disabled={usePassengerDataForEmergencyContact}
                        />
                      </label>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <label className="input border-[#A1B0CC] placeholder:text-[#7C8DB0] text-[#7C8DB0] px-2 py-3 text-base rounded flex items-center gap-2">
                        <input
                          type="text"
                          className="grow"
                          placeholder="ที่อยู่อีเมล*"
                          name="email"
                          value={emergencyContactData.email}
                          onChange={handleChangeEmergencyContact}
                          disabled={usePassengerDataForEmergencyContact}
                        />
                      </label>
                      <label className="input border-[#A1B0CC] placeholder:text-[#7C8DB0] text-[#7C8DB0] px-2 py-3 text-base rounded flex items-center gap-2">
                        <input
                          type="text"
                          className="grow"
                          placeholder="เบอร์ติดต่อ*"
                          name="phoneNumber"
                          value={emergencyContactData.phoneNumber}
                          onChange={handleChangeEmergencyContact}
                          disabled={usePassengerDataForEmergencyContact}
                        />
                      </label>
                    </div>
                    <h1 className="text-blue-500 text-3xl mt-10 mb-6">ข้อมูลกระเป๋าเดินทาง</h1>
                    <p className="mb-8 text-[#7C8DB0] text-base font-normal">
                      Each passenger is allowed one free carry-on bag and one personal item. 
                      First checked bag for each passenger is also free. Second bag check fees are waived for loyalty program members. 
                      See {' '}
                      <span className="text-[#605CDE]"> the full bag policy.</span>
                    </p>
                    {passengerData.map((passenger, index) => (
                      <div className="grid grid-cols-2 mb-4" key={index}>
                        <div className="text-[#6E7491] text-lg">
                          <h1 className="py-4">ผู้โดยสาร {index + 1}</h1>
                          <h1>
                            {passenger.firstName} &nbsp;&nbsp; {passenger.lastName}
                          </h1>
                        </div>
                        <div className="text-[#6E7491] text-lg">
                          <h1 className="py-4">จำนวนกระเป๋าเดินทาง</h1>
                          <div className="flex items-center gap-4">
                            <button
                              className="text-[#605DEC] text-3xl font-semibold cursor-pointer disabled:cursor-not-allowed"
                              onClick={() => decrement(index)}
                            >
                              -
                            </button>
                            <span className="text-[#6E7491] text-base font-semibold">{passenger.count}</span>
                            <button
                              className="text-[#605DEC] text-xl font-semibold cursor-pointer"
                              onClick={() => increment(index)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="mt-10 flex md:justify-start justify-center">
                        <button
                        className="btn mx-4 border-[1px] border-[#605DEC] text-[#605DEC] rounded hover:bg-[#605DEC] hover:text-white transition-all duration-200"
                        onClick={handleSaveAndClose}
                        disabled={
                            !passengerData.every(
                                passenger => (
                                    passenger.firstName.trim() !== '' &&
                                    passenger.lastName.trim() !== '' &&
                                    passenger.email.trim() !== '' &&
                                    passenger.phoneNumber.trim() !== ''
                                )
                            ) || (
                                !usePassengerDataForEmergencyContact &&
                                (
                                    emergencyContactData.firstName.trim() === '' ||
                                    emergencyContactData.lastName.trim() === '' ||
                                    emergencyContactData.email.trim() === '' ||
                                    emergencyContactData.phoneNumber.trim() === ''
                                )
                            )
                        }
                        >บันทึกและปิด
                        </button>
                        <button 
                            className="btn mx-4 border-[1px] border-[#7C8DB0] text-[#7C8DB0] bg-[#CBD4E6] rounded hover:bg-[#605DEC] hover:text-white hover:border-[#605DEC] transition-all duration-200"
                            onClick={handleSelectSeat}
                        >
                            เลือกที่นั่ง
                        </button>
                    </div>
                </section>
                <section className="justify-end mx-4 my-10 col-span-4">
                    <div>
                        <FlightCartData flight={fakeFlightData[4]} />
                        <div className='mt-6 items-end justify-end'>
                          <button 
                            className="btn mx-4 border-[1px] border-[#7C8DB0] text-[#7C8DB0] bg-[#CBD4E6] rounded hover:bg-[#605DEC] hover:text-white hover:border-[#605DEC] transition-all duration-200"
                            onClick={handleSelectSeat}
                          >
                            เลือกที่นั่ง
                          </button>
                        </div>
                        <div className='flex justify-end h-fit items-end mt-10'>
                          <img src="src\assets\images\Traveling-bag.png" alt="" />
                        </div>
                    </div>
                </section>
            </section>
        </>
    );
}
