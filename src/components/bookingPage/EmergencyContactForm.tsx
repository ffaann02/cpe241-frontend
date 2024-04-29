import React from 'react';

interface EmergencyContactData {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
}

interface EmergencyContactProps {
    emergencyContactData: EmergencyContactData;
    usePassengerDataForEmergencyContact: boolean;
    handleChangeCheckbox: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleChangeEmergencyContact: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const EmergencyContactForm: React.FC<EmergencyContactProps> = ({ emergencyContactData, usePassengerDataForEmergencyContact, handleChangeCheckbox, handleChangeEmergencyContact }) => {

    return (
        <div>
            <h2 className="text-[#6E7491] text-lg font-medium mt-10">ข้อมูลติดต่อฉุกเฉิน</h2>
            <div className="justify-start flex my-4">
                <label className="label">
                    <input
                        type="checkbox"
                        className="my-auto flex cursor-pointer"
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
        </div>
    );
};

export default EmergencyContactForm;