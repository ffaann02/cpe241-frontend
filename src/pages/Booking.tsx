import { useContext, useEffect, useState } from 'react';
import FlightCartData from '../components/card/FlightCartCard';
import PassengerForm from '../components/bookingPage/PassengerForm';
import EmergencyContactForm from '../components/bookingPage/EmergencyContactForm';
import AddLuggage from '../components/bookingPage/AddLuggage';
import FormHeader from '../components/bookingPage/FormHeader';
import ServicePackage from '../components/bookingPage/ServicePackage';
import {
    handleChangePassenger,
    handleDateOfBirthChange,
    handleDeletePassenger,
    handleAddPassenger,
    handleChangeCheckbox,
    handleChangeEmergencyContact,
    handleSaveAndClose,
    handleSelectSeat,
} from '../components/bookingPage/bookingFunctions';
import { useNavigate } from 'react-router-dom';
import { BookingDetailsContext } from '../context/BookingDetailsProvider';
import axiosPrivate from '../api/axios';
import { LoadingSpinner } from '../components/LoadingGroup';
import travelBagImage from '../assets/images/Traveling-bag.png';

export const initPassenger = {
    firstName: '',
    middleName: '',
    lastName: '',
    nationality: '',
    dateOfBirth: '',
    email: '',
    phoneNumber: '',
    bagCount: '',
    seat: null,
};

export default function Booking() {
    const navigate = useNavigate();
    const {
        passengerData,
        setPassengerData,
        emergencyContactData,
        setEmergencyContactData,
        selectedFlight,
        setSelectedFlight,
        servicePackageData,
        travelInsuranceData,
        setServicePackageData,
        setTravelInsuranceData,
        price,
        setPrice,
    } = useContext(BookingDetailsContext);

    const [usePassengerDataForEmergencyContact, setUsePassengerDataForEmergencyContact] = useState<boolean>(false);
    const [passengerEmailError, setPassengerEmailError] = useState<string[]>([]);
    const [passengerPhoneNumberError, setPassengerPhoneNumberError] = useState<string[]>([]);
    const { setStep } = useContext(BookingDetailsContext);
    const [isFetching, setIsFetching] = useState<boolean>(false);
    useEffect(() => {
        setStep(0);
        const fetchData = async () => {
            setIsFetching(true);
            try {
                const fid = new URLSearchParams(window.location.search).get('fid');
                const response = await axiosPrivate.get(`/api/flight/${fid}`);
                console.log(response.data);
                const price = response.data.subtotal * 4.11;
                setPrice(price);
                setSelectedFlight(response.data);
                const passengerAmount = new URLSearchParams(window.location.search).get('initAmount');
                const initialPassengerData = Array.from({ length: parseInt(passengerAmount) }, () => initPassenger);
                setPassengerData(initialPassengerData);
            } catch (error) {
                console.error('An error occurred while trying to fetch flight data:', error);
            }
            setIsFetching(false);
        };
        if (!selectedFlight || passengerData.length === 0) {
            fetchData();
        }
    }, []);

    const handleSelectServicePackage = (selectedPackage) => {
        console.log(selectedPackage);
        let previousPrice = 0;
        if (servicePackageData[0].name === 'Basic') {
            previousPrice = 0;
        }
        if (servicePackageData[0].name === 'Plus') {
            previousPrice = 230;
        }
        if (servicePackageData[0].name === 'Premium') {
            previousPrice = 460;
        }

        let newPrice = 0;
        if (selectedPackage.name === 'Basic') {
            newPrice = 0;
        }
        if (selectedPackage.name === 'Plus') {
            newPrice = 230;
        }
        if (selectedPackage.name === 'Premium') {
            newPrice = 460;
        }

        setPrice(price - previousPrice + newPrice);
        setServicePackageData(selectedPackage);
    };

    const handleTravelInsurance = (travelInsurance) => {
        console.log(travelInsurance);
        if (travelInsurance.isIncluded) {
            console.log('1');
            setPrice(price + 230);
        }
        if (travelInsurance.isIncluded === false) {
            setPrice(price - 230);
        }
        // setPrice(price + travelInsurance.price);

        setTravelInsuranceData(travelInsurance);
    };
    console.log(price);

    return (
        <div>
            <LoadingSpinner loading={isFetching} />
            <section className="py-8 grid grid-cols-10 gap-x-10 max-w-6xl mx-auto">
                <section className="mx-4 col-span-6 pr-20">
                    <FormHeader
                        title="ข้อมูลผู้โดยสาร"
                        description="
                        ป้อนข้อมูลที่จำเป็นสำหรับผู้โดยสารแต่ละท่าน และตรวจสอบให้แน่ใจว่าตรงกับบัตรประจำตัวที่ออกโดยหน่วยงานราชการที่แสดงที่สนามบินทุกประการ"
                    />
                    {passengerData.map((passenger, index) => (
                        <PassengerForm
                            index={index}
                            passenger={passenger}
                            handleChangePassenger={handleChangePassenger(setPassengerData, passengerData)}
                            handleDateOfBirthChange={handleDateOfBirthChange(setPassengerData, passengerData)}
                            passengerData={passengerData}
                            handleDeletePassenger={handleDeletePassenger(setPassengerData, passengerData)}
                            handleAddPassenger={handleAddPassenger(setPassengerData, passengerData)}
                            passengerEmailError={passengerEmailError}
                            passengerPhoneNumberError={passengerPhoneNumberError}
                            setPassengerEmailError={setPassengerEmailError}
                            setPassengerPhoneNumberError={setPassengerPhoneNumberError}
                        />
                    ))}
                    <EmergencyContactForm
                        emergencyContactData={emergencyContactData}
                        usePassengerDataForEmergencyContact={usePassengerDataForEmergencyContact}
                        handleChangeCheckbox={handleChangeCheckbox(
                            setUsePassengerDataForEmergencyContact,
                            setEmergencyContactData,
                            passengerData
                        )}
                        handleChangeEmergencyContact={handleChangeEmergencyContact(setEmergencyContactData)}
                    />
                    <FormHeader
                        title="ข้อมูลกระเป๋าเดินทาง"
                        description="ผู้โดยสารแต่ละท่านจะได้รับอนุญาตให้นำกระเป๋าถือขึ้นเครื่องได้ฟรีหนึ่งใบ และของใช้ส่วนตัวหนึ่งชิ้น 
                        กระเป๋าที่เช็คอินใบแรกสำหรับผู้โดยสารแต่ละท่านก็ฟรีเช่นกัน 
                        ค่าธรรมเนียมการตรวจสอบกระเป๋าใบที่สองจะได้รับการยกเว้นสำหรับสมาชิกโปรแกรมสะสมคะแนน"
                        span={
                            <span className="text-royal-blue-500 hover:underline cursor-pointer">
                                {' '}
                                นโยบายกระเป๋าฉบับเต็ม
                            </span>
                        }
                        className="mt-6"
                    />
                    {passengerData.map((passenger, index) => (
                        <AddLuggage passenger={passenger} index={index} setPassengerData={setPassengerData} />
                    ))}
                    <ServicePackage
                        servicePackageData={servicePackageData}
                        travelInsuranceData={travelInsuranceData}
                        onSelectServicePackage={handleSelectServicePackage}
                        onToggleTravelInsurance={handleTravelInsurance}
                    />
                    <div className="mt-10 flex gap-x-4">
                        <button
                            className="cursor-pointer px-4 py-2 border-[1px] border-royal-blue-500 text-royal-blue-500 
                            rounded hover:bg-royal-blue-500 hover:text-white transition-all duration-200"
                            onClick={async () => {
                                const pass = await handleSaveAndClose(passengerData);
                                if (pass) {
                                    setStep(1);
                                    navigate('/booking/select-seat');
                                }
                                console.log(passengerData);
                                console.log(servicePackageData);
                                console.log(travelInsuranceData);
                            }}
                            disabled={
                                !passengerData.every(
                                    (passenger) =>
                                        passenger.firstName.trim() !== '' &&
                                        passenger.lastName.trim() !== '' &&
                                        passenger.email.trim() !== '' &&
                                        passenger.phoneNumber.trim() !== ''
                                ) ||
                                (!usePassengerDataForEmergencyContact &&
                                    (emergencyContactData.firstName.trim() === '' ||
                                        emergencyContactData.lastName.trim() === '' ||
                                        emergencyContactData.email.trim() === '' ||
                                        emergencyContactData.phoneNumber.trim() === ''))
                            }
                        >
                            บันทีกและถัดไป
                        </button>
                        {/* <button
                            className="px-4 py-2 border-[1px] border-[#7C8DB0] text-[#7C8DB0] 
                            bg-[#CBD4E6] rounded hover:bg-royal-blue-500 hover:text-white 
                            hover:border-royal-blue-500 transition-all duration-200"
                            onClick={handleSelectSeat}
                        >
                            เลือกที่นั่ง
                        </button> */}
                    </div>
                </section>
                <section className="my-10 col-span-4 flex flex-col">
                    <div>{selectedFlight && <FlightCartData flight={selectedFlight} price={price} />}</div>
                    <div className="mt-10">
                        <ul className="text-lg text-bold">เงื่อนไขการจอง</ul>
                        <li className="mt-1 text-sm">
                            หากท่านดำเนินการเปลี่ยนแปลงข้อมูลเที่ยวบินกับสายการบินโดยตรง
                            หรือสายการบินเป็นผู้ดำเนินการเปลี่ยนแปลง อโกด้าจะไม่ได้รับแจ้งรายละเอียดดังกล่าว
                            กรุณาตรวจสอบข้อมูลการติดต่อที่ท่านกรอกในแบบฟอร์มการจองให้ถูกต้อง
                            เนื่องจากสายการบินจะแจ้งรายละเอียดการเปลี่ยนแปลงให้ท่านทราบโดยตรง
                        </li>
                        <li className="text-sm">
                            ผลจากการที่ท่านกรอกข้อมูลการติดต่อไม่ถูกต้องจะไม่ถือเป็นความรับผิดชอบของอโกด้า
                            และการเตรียมเอกสารการเดินทางและเอกสารยืนยันตัวตนที่ถูกต้องถือเป็นความรับผิดชอบของท่าน
                        </li>
                        <li className="text-sm">
                            ก่อนเดินทาง กรุณาตรวจสอบเอกสารการเดินทางของท่านว่าสามารถใช้งานได้หรือไม่
                            รวมถึงตรวจสอบว่าท่านมีวีซ่าและเอกสารอื่นๆ ที่จำเป็นครบถ้วน
                        </li>
                        <li className="text-sm">
                            โปรดทราบว่า สายการบินอาจเปลี่ยนแปลงเวลาเที่ยวบินและอาคารผู้โดยสาร
                            ซึ่งสายการบินจะไม่แจ้งข้อมูลดังกล่าวนี้ให้อโกด้าทราบ
                        </li>
                        <li className="text-sm">
                            เมื่อยืนยันการจองแล้ว การเปลี่ยนแปลงจะมีค่าปรับและเป็นไปตามข้อจำกัดที่สายการบินกำหนดไว้
                            บัตรโดยสารบางประเภทไม่สามารถขอรับเงินคืนและไม่สามารถถ่ายโอนสิทธิ์ให้ผู้อื่นได้
                            การเปลี่ยนบัตรโดยสารอาจมีค่าธรรมเนียมต่อผู้โดยสาร
                            การขอเปลี่ยนหรือแก้ไขชื่อผู้โดยสารขึ้นอยู่กับการตัดสินใจของสายการบิน
                        </li>
                        <li className="text-sm">
                            กรุณาไปที่เว็บไซต์อย่างเป็นทางการของสายการบินเพื่ออ่านข้อกำหนดและเงื่อนไขในการขนส่งและราคาบัตรโดยสาร
                            รวมถึงข้อมูลเพิ่มเติมเกี่ยวกับสัมภาระและข้อกำหนดอื่นๆ
                            เที่ยวบินของท่านอาจมีการเรียกเก็บค่าสัมภาระ
                        </li>
                        <li className="text-sm">
                            อโกด้าพยายามอย่างเต็มที่เพื่อให้ท่านสามารถจองเที่ยวบินและชำระเงินได้ในราคาสุดท้าย
                            อย่างไรก็ตาม หากมีการเรียกเก็บภาษีหรือมีการเพิ่มอัตราภาษีใดๆ
                            จากรัฐบาลสำหรับการขนส่งทางอากาศสำหรับเที่ยวบินที่ท่านจองก่อนการเดินทางของท่าน
                            ท่านอาจต้องชำระภาษีหรือค่าธรรมเนียมดังกล่าว
                        </li>
                    </div>
                    <div className="flex justify-end mt-6">
                        <img src={travelBagImage} alt="" />
                    </div>
                </section>
            </section>
        </div>
    );
}
