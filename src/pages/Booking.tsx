import { useState } from 'react';
import FlightCartData from '../components/card/FlightCartCard';
import fakeFlightData from '../data/fakeFlightData.json';
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

export interface PassengerData {
    firstName: string;
    middleName: string;
    lastName: string;
    suffix: string;
    dateOfBirth: string;
    email: string;
    phoneNumber: string;
    count: number;
}

export interface EmergencyContactData {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
}

export default function Booking() {
    const [passengerData, setPassengerData] = useState<PassengerData[]>([
        {
            firstName: '',
            middleName: '',
            lastName: '',
            suffix: '',
            dateOfBirth: '',
            email: '',
            phoneNumber: '',
            count: 1,
        },
    ]);

    const [emergencyContactData, setEmergencyContactData] = useState<EmergencyContactData>({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
    });
    const [usePassengerDataForEmergencyContact, setUsePassengerDataForEmergencyContact] = useState<boolean>(false);
    
    return (
        <div>
            <section className="p-8 grid grid-cols-10 mx-20 gap-x-10">
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
                            handleDateOfBirthChange={handleDateOfBirthChange}
                            passengerData={passengerData}
                            handleDeletePassenger={handleDeletePassenger(setPassengerData, passengerData)}
                            handleAddPassenger={handleAddPassenger(setPassengerData, passengerData)}
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
                            <span className="text-[#605CDE] hover:underline cursor-pointer"> the full bag policy.</span>
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
                            className="btn px-4 border-[1px] border-[#605DEC] text-[#605DEC] rounded hover:bg-[#605DEC] hover:text-white transition-all duration-200"
                            onClick={handleSaveAndClose}
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
                            บันทึกและปิด
                        </button>
                        <button
                            className="btn px-4 border-[1px] border-[#7C8DB0] text-[#7C8DB0] bg-[#CBD4E6] rounded hover:bg-[#605DEC] hover:text-white hover:border-[#605DEC] transition-all duration-200"
                            onClick={handleSelectSeat}
                        >
                            เลือกที่นั่ง
                        </button>
                    </div>
                </section>
                <section className="my-10 col-span-4 flex flex-col">
                    <div>
                        <FlightCartData flight={fakeFlightData[2]} />
                    </div>
                    <div className="flex justify-end mt-6">
                        <img src="src\assets\images\Traveling-bag.png" alt="" />
                    </div>
                </section>
            </section>
        </div>
    );
}
