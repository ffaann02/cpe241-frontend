import { useState } from 'react';
import { IoMdAirplane, IoIosGift, IoIosSwap } from 'react-icons/io';
import { LocationInputForm } from './Form/FlightInputForm';
import { PiAirplaneTakeoffFill, PiAirplaneLandingFill } from 'react-icons/pi';
import { GoPeople } from 'react-icons/go';
import { DatePicker } from './Form/DatePicker';
import '../../component.css';
import PassengerInfoForm from './Form/PassengerInfoForm';
import {
    FlightTypeSelectButtons,
    HeaderServicesButtons,
    SearchFlightButton,
    SwitchFlightButton,
} from './BlockObject/Button';
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

export interface PassengerAmountInfo {
    adult: number;
    child: number;
    infant: number;
}

const HereBlock = () => {
    const [serviceIndex, setServiceIndex] = useState<number>(1);
    const [flightType, setFlightType] = useState<number>(1);
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
    const [passengerAmount, setPassengerAmount] = useState<PassengerAmountInfo>(
        {
            adult: 1,
            child: 10,
            infant: 2,
        }
    );

    const [focusedState, setFocusedState] = useState<string>('');
    const [isEnterPassengerPicker, setIsEnterPassengerPicker] =
        useState<boolean>(false);

    const handleChangeService = (index: number) => setServiceIndex(index);
    const handleChangeFlightType = (index: number) => setFlightType(index);
    const handleSwapLocations = (index: number) => {
        // console.log(flightData[index])
        const newFlightData = [...flightData];
        const temp = newFlightData[index].from;
        newFlightData[index].from = newFlightData[index].to;
        newFlightData[index].to = temp;
        setFlightData(newFlightData);
    };

    return (
        <>
            <div className="pt-8 relative justify-center pb-16">
                <div className="absolute bg-gradient-to-b from-royal-blue-500 via-royal-blue-300 to-royal-blue-100 w-full h-[80%] top-0"></div>
                <div className="absolute bg-slate-50 w-full h-[20%] bottom-0"></div>
                <div className="">
                    <h1 className="text-3xl text-center font-semibold tracking-wide drop-shadow-lg text-white">
                        จองตั๋วเครื่องบินทั่วไทยและทั่วโลกที่คุณสนใจเลยวันนี้
                    </h1>
                    <h2 className="text-2xl mt-2 text-center font-semibold tracking-wide drop-shadow-sm text-white">
                        ครอบคลุมบริการสายการบินกว่า 20 สายทั่วโลก
                    </h2>
                    <div className="bg-slate-50 w-full max-w-5xl mt-10 px-8 py-10 rounded-2xl drop-shadow-lg mx-auto relative">
                        <HeaderServicesButtons
                            serviceIndex={serviceIndex}
                            handleChangeService={handleChangeService}
                            icon1={IoMdAirplane}
                            icon2={IoIosGift}
                        />
                        <FlightTypeSelectButtons
                            flightTypeList={flightTypeList}
                            flightType={flightType}
                            handleChangeFlightType={handleChangeFlightType}
                        />
                        {flightData.map((flight, index) => (
                            <div
                                className="grid grid-cols-2 gap-3 mt-4 relative"
                                key={index}
                            >
                                <div className="col-span-full">
                                    <div className="grid grid-cols-2 gap-x-3 relative">
                                        <LocationInputForm
                                            icon={<PiAirplaneTakeoffFill />}
                                            title="จาก"
                                            state="from"
                                            flight={flight}
                                            index={index}
                                            flightData={flightData}
                                            setFlightData={setFlightData}
                                            focusedState={focusedState}
                                            setFocusedState={setFocusedState}
                                        />
                                        <LocationInputForm
                                            icon={<PiAirplaneLandingFill />}
                                            title="ไป"
                                            state="to"
                                            flight={flight}
                                            index={index}
                                            flightData={flightData}
                                            setFlightData={setFlightData}
                                            focusedState={focusedState}
                                            setFocusedState={setFocusedState}
                                        />
                                        <SwitchFlightButton
                                            handleSwapLocations={
                                                handleSwapLocations
                                            }
                                            index={index}
                                            icon={IoIosSwap}
                                        />
                                    </div>
                                </div>
                                <DatePicker />
                                <PassengerInfoForm
                                    icon={GoPeople}
                                    passengerAmount={passengerAmount}
                                    setPassengerAmount={setPassengerAmount}
                                    isEnterPassengerPicker={
                                        isEnterPassengerPicker
                                    }
                                    setIsEnterPassengerPicker={
                                        setIsEnterPassengerPicker
                                    }
                                />
                            </div>
                        ))}
                        <SearchFlightButton />
                    </div>
                </div>
            </div>
        </>
    );
};

export default HereBlock;
