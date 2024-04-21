import React, { useState } from 'react';
import { IoMdAirplane, IoIosGift } from 'react-icons/io';
import { LocationInputForm } from './FlightInputForm';
import { PiAirplaneTakeoffFill, PiAirplaneLandingFill } from 'react-icons/pi';

const flightTypeList = [
    { id: 1, name: 'เที่ยวเดียว' },
    { id: 2, name: 'ไป-กลับ' },
    { id: 3, name: 'เดินทางหลายเมือง' },
];

export interface FlightData {
    from: string;
    to: string;
    departDate: string;
    returnDate: string;
    adult: number;
    child: number;
    infant: number;
}

const HereBlock = () => {
    const [serviceIndex, setServiceIndex] = useState<number>(1);
    const [flightType, setFlightType] = useState<number>(2);
    const [flightData, setFlightData] = useState<FlightData[]>([
        {
            from: '',
            to: '',
            departDate: '',
            returnDate: '',
            adult: 1,
            child: 0,
            infant: 0,
        },
    ]);
    const [focusedState, setFocusedState] = useState<string>('');
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleChangeService = (index: number) => setServiceIndex(index);
    const handleChangeFlightType = (index: number) => setFlightType(index);
    
    return (
        <div className="bg-purple-200 min-h-[50vh] pt-8 relative justify-center">
            <div className="">
                <h1 className="text-3xl text-center font-semibold tracking-wide drop-shadow-md">
                    จองตั๋วเครื่องบินทั่วไทยและทั่วโลกที่คุณสนใจเลยวันนี้
                </h1>
                <h2 className="text-2xl mt-2 text-center font-semibold tracking-wide drop-shadow-sm">
                    ครอบคลุมบริการสายการบินกว่า 20 สายทั่วโลก
                </h2>
                <div className="bg-slate-50 w-full max-w-5xl mt-10 p-8 rounded-2xl drop-shadow-sm mx-auto relative">
                    <div
                        className="bg-slate-50 absolute drop-shadow-md px-3 rounded-md -top-6 left-0 right-0 mx-auto 
                        w-fit flex gap-x-3"
                    >
                        <button
                            className={`flex px-2 py-2 border-b-2 ${serviceIndex === 1 ? 'border-purple-400' : 'border-white'}`}
                            onClick={() => {
                                handleChangeService(1);
                            }}
                        >
                            <IoMdAirplane
                                className={`text-xl my-auto rotate-45 ${serviceIndex === 1 ? 'text-purple-600' : 'text-slate-600'}`}
                            />
                            <p
                                className={`${serviceIndex === 1 ? 'text-purple-600' : 'text-slate-600'} ml-0.5`}
                            >
                                จองไฟล์ท
                            </p>
                        </button>
                        <button
                            className={`flex px-2 py-2 border-b-2 ${serviceIndex === 2 ? 'border-purple-400' : 'border-white'}`}
                            onClick={() => {
                                handleChangeService(2);
                            }}
                        >
                            <IoIosGift
                                className={`text-xl my-auto ${serviceIndex === 2 ? 'text-purple-600' : 'text-slate-600'}`}
                            />
                            <p
                                className={`${serviceIndex === 2 ? 'text-purple-600' : 'text-slate-600'} ml-0.5`}
                            >
                                โปรโมชั่น
                            </p>
                        </button>
                    </div>
                    <div className="flex gap-x-3">
                        {flightTypeList.map((item) => (
                            <button
                                key={item.id}
                                className={`transition-all duration-100 ease-linear px-3.5 py-1.5 border-2 rounded-2xl ${flightType === item.id ? 'bg-violet-100 text-violet-600 border-violet-400' : 'bg-white text-slate-500 border-slate-200 hover:bg-violet-50 hover:text-violet-400 hover:border-violet-300'}`}
                                onClick={() => handleChangeFlightType(item.id)}
                            >
                                {item.name}
                            </button>
                        ))}
                    </div>
                    {flightData.map((flight, index) => (
                        <div className="grid grid-cols-2 gap-x-4 mt-4" key={index}>
                            <LocationInputForm
                                icon={<PiAirplaneTakeoffFill/>}
                                title="จาก"
                                state="from"
                                flight={flight}
                                index={index}
                                setFlightData={setFlightData}
                                focusedState={focusedState}
                                setFocusedState={setFocusedState}
                            />
                            <LocationInputForm
                                icon={<PiAirplaneLandingFill/>}
                                title="ไป"
                                state="to"
                                flight={flight}
                                index={index}
                                setFlightData={setFlightData}
                                focusedState={focusedState}
                                setFocusedState={setFocusedState}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HereBlock;
