import { useContext, useEffect, useState } from 'react';
import FlightCartData from '../components/card/FlightCartCard';
import PassengerForm from '../components/bookingPage/PassengerForm';
import EmergencyContactForm from '../components/bookingPage/EmergencyContactForm';
import AddLuggage from '../components/bookingPage/AddLuggage';
import FormHeader from '../components/bookingPage/FormHeader';
import {
    handleChangePassenger,
    handleDateOfBirthChange,
    handleDeletePassenger,
    handleAddPassenger,
    handleChangeCheckbox,
    handleChangeEmergencyContact,
    increment,
    decrement,
    handleSaveAndClose,
    handleSelectSeat,
} from '../components/bookingPage/bookingFunctions';
import { useNavigate } from 'react-router-dom';
import { BookingDetailsContext } from '../context/BookingDetailsProvider';
import axiosPrivate from '../api/axios';
import { LoadingSpinner } from '../components/LoadingGroup';
import travelBagImage from '../assets/images/Traveling-bag.png';

const initPassenger = {
    firstName: '',
    middleName: '',
    lastName: '',
    suffix: '',
    dateOfBirth: '',
    email: '',
    phoneNumber: '',
    count: 1,
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
    } = useContext(BookingDetailsContext);
    const [usePassengerDataForEmergencyContact, setUsePassengerDataForEmergencyContact] = useState<boolean>(false);
    const [passengerEmailError, setPassengerEmailError] = useState<string[]>([]);
    const [passengerPhoneNumberError, setPassengerPhoneNumberError] = useState<string[]>([]);
    const { setStep } = useContext(BookingDetailsContext);
    const [isFetching, setIsFetching] = useState<boolean>(false);
    useEffect(() => {
        const fetchData = async () => {
            setIsFetching(true);
            try {
                const fid = new URLSearchParams(window.location.search).get('fid');
                const response = await axiosPrivate.get(`/api/flight/${fid}`);
                console.log(response.data);
                setSelectedFlight(response.data);
                const passengerAmount = new URLSearchParams(window.location.search).get('initAmount');
                const initialPassengerData = Array.from({ length: parseInt(passengerAmount) }, () => initPassenger);
                setPassengerData(initialPassengerData);
            } catch (error) {
                console.error('An error occurred while trying to fetch flight data:', error);
            }
            setIsFetching(false);
        };
        fetchData();
    }, []);
    return (
        <div>
            <LoadingSpinner loading={isFetching} />
            <section className="py-8 grid grid-cols-10 gap-x-10 max-w-6xl mx-auto">
                <section className="mx-4 col-span-6 pr-20">
                    <FormHeader
                        title="ข้อมูลผู้โดยสาร"
                        description="Enter the required information for each traveler and be sure that it exactly matches the
                government-issued ID presented at the airport"
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
                        description="Each passenger is allowed one free carry-on bag and one personal item. First checked bag for
                        each passenger is also free. Second bag check fees are waived for loyalty program members."
                        span={
                            <span className="text-royal-blue-500 hover:underline cursor-pointer">
                                {' '}
                                the full bag policy.
                            </span>
                        }
                        className="mt-6"
                    />
                    {passengerData.map((passenger, index) => (
                        <AddLuggage
                            passenger={passenger}
                            index={index}
                            increment={increment(setPassengerData)}
                            decrement={decrement(setPassengerData)}
                        />
                    ))}
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
                    <div>
                        <FlightCartData flight={selectedFlight} />
                    </div>
                    <div className="flex justify-end mt-6">
                        <img src={travelBagImage} alt="" />
                    </div>
                </section>
            </section>
        </div>
    );
}
