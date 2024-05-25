import Datepicker from 'react-tailwindcss-datepicker';
import React, { useState } from 'react';
import { PassengerData } from '../../../pages/Mybooking-Edit';
import { Input, InputGroup, FormControl, FormErrorMessage } from '@chakra-ui/react';

interface PassengerProps {
    index: number;
    passenger: PassengerData;
    handleDateOfBirthChange: (index: number, e: any) => void;
    passengerData: PassengerData[];
}

export interface FormProps {
    value: string;
    handleChange: (index: number, e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: any;
    index: number;
    placeholder: string;
    name: string;
    className: string;
    disabled: boolean;
}

export const Form: React.FC<FormProps> = ({ value, index, placeholder, name, className, onBlur, disabled }) => {
    return (
        <InputGroup className={'flex bg-white rounded-md ' + className}>
            <Input
                onBlur={onBlur}
                size="lg"
                focusBorderColor="purple.200"
                type="text"
                className="placeholder:text-sm text-slate-500 pt-0.5"
                placeholder={placeholder}
                value={value}
                name={name}
                isDisabled={disabled}
            />
        </InputGroup>
    );
};

const PassengerFormLock: React.FC<PassengerProps> = ({
    index,
    passenger,
    handleDateOfBirthChange,
    passengerData,
}: PassengerProps) => {
    const [touched, setTouched] = useState({
        firstName: false,
        lastName: false,
        email: false,
        phoneNumber: false,
    });
    return (
        <div className="grid grid-cols-6 gap-4 mb-4" key={index}>
            <h2 className="text-slate-500 text-lg font-medium col-span-6">
                ผู้โดยสาร {index + 1} {index > 0 ? null : '(ผู้ใหญ่)'}
            </h2>
            <FormControl className="col-span-2">
                <Form
                    value={passenger.firstName}
                    index={index}
                    placeholder="ชื่อ*"
                    name="firstName"
                    className="col-span-2"
                    disabled={true}
                    handleChange={null}
                />
                <FormErrorMessage>First name is required.</FormErrorMessage>
            </FormControl>
            <Form
                value={passenger.middleName}
                index={index}
                placeholder="ชื่อกลาง"
                name="middleName"
                className="col-span-2"
                disabled={true}
                handleChange={null}
            />
            <FormControl className="col-span-2">
                <Form
                    value={passenger.lastName}
                    index={index}
                    placeholder="นามสกุล*"
                    name="lastName"
                    className="col-span-2"
                    disabled={true}
                    handleChange={null}
                />
                <FormErrorMessage>Last name is required.</FormErrorMessage>
            </FormControl>
            <Form
                value={passenger.nationality}
                index={index}
                placeholder="สัญชาติ"
                name="nationality"
                className="col-span-3"
                disabled={true}
                handleChange={null}
            />
            <div className="col-span-2 relative" id="datepicker">
                <Datepicker
                    asSingle={true}
                    value={{
                        // strtDate: passenger.dateOfBirth,
                        startDate: passenger.dateOfBirth,
                        endDate: passenger.dateOfBirth,
                    }}
                    onChange={(e) => handleDateOfBirthChange(index, e)}
                    popoverDirection="down"
                    inputClassName="h-full border w-full px-4 py-[0.6rem] rounded-md text-slate-500 outline-none 
                        focus:outline-2"
                    disabled
                />
            </div>
            <FormControl className="col-span-3">
                <Form
                    value={passenger.email}
                    index={index}
                    placeholder="ที่อยู่อีเมล*"
                    name="email"
                    className="col-span-3"
                    disabled={true}
                    handleChange={null}
                />
                <FormErrorMessage>Please enter a valid email address</FormErrorMessage>
            </FormControl>
            <FormControl className="col-span-2">
                <Form
                    value={passenger.phoneNumber}
                    handleChange={null}
                    index={index}
                    placeholder="เบอร์ติดต่อ*"
                    name="phoneNumber"
                    className="col-span-2"
                    disabled={true}
                />
                <FormErrorMessage>Please enter a valid phone number (e.g., 123456789)</FormErrorMessage>
            </FormControl>
        </div>
    );
};
export default PassengerFormLock;
