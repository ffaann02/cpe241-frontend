import { Checkbox, Input, FormControl, FormErrorMessage } from '@chakra-ui/react';
import React, { useState } from 'react';

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
    const [touched, setTouched] = useState({
        firstName: false,
        lastName: false,
        email: false,
        phoneNumber: false,
    });

    const handleBlur = (name: string) => {
        setTouched((prevTouched) => ({
            ...prevTouched,
            [name]: true,
        }));
    };

    const validate = (name: string, value: string) => {
        if (name === 'email') {
            return value.trim() === '' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        } else if (name === 'phoneNumber') {
            return value.trim() === '' || /^\d{10}$/.test(value);
        }
        return true;
    };

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
                <FormControl isInvalid={touched.firstName && emergencyContactData.firstName.trim() === ''}>
                    <Input
                        size="lg"
                        focusBorderColor={'purple.200'}
                        type="text"
                        className="placeholder:text-sm text-slate-500"
                        placeholder="ชื่อ*"
                        name="firstName"
                        value={emergencyContactData.firstName}
                        onChange={handleChangeEmergencyContact}
                        onBlur={() => handleBlur('firstName')}
                        disabled={usePassengerDataForEmergencyContact}
                    />
                    <FormErrorMessage>First name is required.</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={touched.lastName && emergencyContactData.lastName.trim() === ''}>
                    <Input
                        size="lg"
                        focusBorderColor={'purple.200'}
                        type="text"
                        className="placeholder:text-sm text-slate-500"
                        placeholder="นามสกุล*"
                        name="lastName"
                        value={emergencyContactData.lastName}
                        onChange={handleChangeEmergencyContact}
                        onBlur={() => handleBlur('lastName')}
                        disabled={usePassengerDataForEmergencyContact}
                    />
                    <FormErrorMessage>Last name is required.</FormErrorMessage>
                </FormControl>
                <FormControl
                    isInvalid={
                        (touched.email && emergencyContactData.email.trim() === '') ||
                        (touched.email && !validate('email', emergencyContactData.email))
                    }
                >
                    <Input
                        size="lg"
                        focusBorderColor={'purple.200'}
                        type="text"
                        className="placeholder:text-sm text-slate-500"
                        placeholder="ที่อยู่อีเมล*"
                        name="email"
                        value={emergencyContactData.email}
                        onChange={handleChangeEmergencyContact}
                        onBlur={() => {
                            handleBlur('email');
                            validate('email', emergencyContactData.email);
                        }}
                        disabled={usePassengerDataForEmergencyContact}
                    />
                    <FormErrorMessage>Please enter a valid email address</FormErrorMessage>
                </FormControl>
                <FormControl
                    isInvalid={
                        (touched.phoneNumber && emergencyContactData.phoneNumber.trim() === '') ||
                        (touched.phoneNumber && !validate('phoneNumber', emergencyContactData.phoneNumber))
                    }
                >
                    <Input
                        size="lg"
                        focusBorderColor={'purple.200'}
                        type="text"
                        className="placeholder:text-sm text-slate-500"
                        placeholder="เบอร์ติดต่อ*"
                        name="phoneNumber"
                        value={emergencyContactData.phoneNumber}
                        onChange={handleChangeEmergencyContact}
                        onBlur={() => {
                            handleBlur('phoneNumber');
                            validate('phoneNumber', emergencyContactData.phoneNumber);
                        }}
                        disabled={usePassengerDataForEmergencyContact}
                    />
                    <FormErrorMessage>Please enter a valid phone number (e.g., 123456789)</FormErrorMessage>
                </FormControl>
            </div>
        </div>
    );
};

export default EmergencyContactForm;
