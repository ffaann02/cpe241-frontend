import { Checkbox, Input } from '@chakra-ui/react';
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

const EmergencyContactForm: React.FC<EmergencyContactProps> = ({
    emergencyContactData,
    usePassengerDataForEmergencyContact,
    handleChangeCheckbox,
    handleChangeEmergencyContact,
}) => {
    return (
        <div>
            <h2 className="text-[#6E7491] text-lg font-medium mt-10">ข้อมูลติดต่อฉุกเฉิน</h2>
            <Checkbox
                size={'md'}
                className="flex cursor-pointer mt-2"
                checked={usePassengerDataForEmergencyContact}
                onChange={handleChangeCheckbox}
            >
                <div className="flex mt-0.5">
                    <span className="text-[#6E7491]">ใช้ข้อมูลของผู้โดยสาร 1</span>
                </div>
            </Checkbox>
            <div className="grid grid-cols-2 gap-4 mb-4 mt-4">
                <Input
                    size="lg"
                    focusBorderColor={'purple.200'}
                    type="text"
                    className="placeholder:text-sm text-slate-500"
                    placeholder="ชื่อ*"
                    name="firstName"
                    value={emergencyContactData.firstName}
                    onChange={handleChangeEmergencyContact}
                    disabled={usePassengerDataForEmergencyContact}
                />
                <Input
                    size="lg"
                    focusBorderColor={'purple.200'}
                    type="text"
                    className="placeholder:text-sm text-slate-500"
                    placeholder="นามสกุล*"
                    name="lastName"
                    value={emergencyContactData.lastName}
                    onChange={handleChangeEmergencyContact}
                    disabled={usePassengerDataForEmergencyContact}
                />
                <Input
                    size="lg"
                    focusBorderColor={'purple.200'}
                    type="text"
                    className="placeholder:text-sm text-slate-500"
                    placeholder="ที่อยู่อีเมล*"
                    name="email"
                    value={emergencyContactData.email}
                    onChange={handleChangeEmergencyContact}
                    disabled={usePassengerDataForEmergencyContact}
                />
                <Input
                    size="lg"
                    focusBorderColor={'purple.200'}
                    type="text"
                    className="placeholder:text-sm text-slate-500"
                    placeholder="เบอร์ติดต่อ*"
                    name="phoneNumber"
                    value={emergencyContactData.phoneNumber}
                    onChange={handleChangeEmergencyContact}
                    disabled={usePassengerDataForEmergencyContact}
                />
            </div>
        </div>
    );
};

export default EmergencyContactForm;
