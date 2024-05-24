import Datepicker from 'react-tailwindcss-datepicker';
import React, { useState } from 'react';
import { PassengerData } from '../../context/BookingDetailsProvider';
import { Input, InputGroup, FormControl, FormErrorMessage, Select } from '@chakra-ui/react';
import nationalityData from "../../data/nationality.json"

interface PassengerProps {
    index: number;
    passenger: PassengerData;
    handleChangePassenger: (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void; // Updated handleChangePassenger to handle Select element
    handleDateOfBirthChange: (index: number, e: any) => void;
    passengerData: PassengerData[];
    handleDeletePassenger: (index: number) => void;
    handleAddPassenger: () => void;
    passengerEmailError: any;
    passengerPhoneNumberError: any;
    setPassengerEmailError: any;
    setPassengerPhoneNumberError: any;
}

export interface FormProps {
    value: string;
    handleChange: (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void; // Updated handleChange to handle Select element
    onBlur?: any;
    index: number;
    placeholder: string;
    name: string;
    className: string;
}

export const Form: React.FC<FormProps> = ({ value, handleChange, index, placeholder, name, className, onBlur }) => {
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
                    onChange={(e) => {
                        handleChange(index, {
                            ...e,
                            target: {
                                ...e.target,
                                name: name,
                            },
                        });
                    }}
            />
        </InputGroup>
    );
};

const PassengerForm: React.FC<PassengerProps> = ({
    index,
    passenger,
    handleChangePassenger,
    handleDateOfBirthChange,
    passengerData,
    handleDeletePassenger,
    handleAddPassenger,
    setPassengerEmailError,
    setPassengerPhoneNumberError
}: PassengerProps) => {
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

        if (name === 'email') {
            setPassengerEmailError(validate('email', passenger.email) ? '' : 'Please enter a valid email address');
        } else if (name === 'phoneNumber') {
            setPassengerPhoneNumberError(validate('phoneNumber', passenger.phoneNumber) ? '' : 'Please enter a valid phone number (e.g., 123456789)');
        }
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
        <div className="grid grid-cols-6 gap-4 mb-4" key={index}>
            <h2 className="text-slate-500 text-lg font-medium col-span-6">
                ผู้โดยสาร {index + 1} {index > 0 ? null : '(ผู้ใหญ่)'}
            </h2>
            <FormControl isInvalid={(touched.firstName && passenger.firstName.trim() === '') && !passenger.firstName.trim()} onBlur={() => handleBlur('firstName')} className='col-span-2'>
                <Form
                    value={passenger.firstName}
                    handleChange={handleChangePassenger}
                    index={index}
                    placeholder="ชื่อ*"
                    name="firstName"
                    className="col-span-2"
                />
                <FormErrorMessage>First name is required.</FormErrorMessage>
            </FormControl>
            <Form
                value={passenger.middleName}
                handleChange={handleChangePassenger}
                index={index}
                placeholder="ชื่อกลาง"
                name="middleName"
                className="col-span-2"
            />
            <FormControl isInvalid={(touched.lastName && passenger.lastName.trim() === '') && !passenger.lastName.trim()} onBlur={() => handleBlur('lastName')} className='col-span-2'>
                <Form
                    value={passenger.lastName}
                    handleChange={handleChangePassenger}
                    index={index}
                    placeholder="นามสกุล*"
                    name="lastName"
                    className="col-span-2"
                />
                <FormErrorMessage>Last name is required.</FormErrorMessage>
            </FormControl>
            {/* <Form
                value={passenger.prefix}
                handleChange={handleChangePassenger}
                index={index}
                placeholder="คำนำหน้า"
                name="prefix"
                className="col-span-2"
            /> */}
            <div className='col-span-2'>
                <Select
                    value={passenger.nationality}
                    onChange={(e) => handleChangePassenger(index, e)}
                    placeholder='สัญชาติ'
                    name="nationality"
                    size={'lg'}
                    focusBorderColor="purple.200"
                    className={`transform origin-top-left 
                        ${passenger.nationality==="" ? "text-slate-400":"text-slate-500"} h-full`}
                >
                    {nationalityData.map((nationality: any, i: number) => (
                        <option key={i} value={nationality.name}>
                            {nationality.name}
                        </option>
                    ))}
                </Select>
            </div>
            <div className="col-span-2 relative"
                id="datepicker">
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
                />
            </div>
            <FormControl isInvalid={(touched.email && passenger.email.trim() === '') || (touched.email && !validate('email', passenger.email))} onBlur={() => handleBlur('email')} className='col-span-3'>
                <Form
                    value={passenger.email}
                    handleChange={handleChangePassenger}
                    index={index}
                    placeholder="ที่อยู่อีเมล*"
                    name="email"
                    className="col-span-3"
                />
                <FormErrorMessage>Please enter a valid email address</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={(touched.phoneNumber && passenger.phoneNumber.trim() === '') || (touched.phoneNumber && !validate('phoneNumber', passenger.phoneNumber))} onBlur={() => handleBlur('phoneNumber')} className='col-span-3'>
                <Form
                    value={passenger.phoneNumber}
                    handleChange={handleChangePassenger}
                    index={index}
                    placeholder="เบอร์ติดต่อ*"
                    name="phoneNumber"
                    className="col-span-3"
                />
                <FormErrorMessage>Please enter a valid phone number (e.g., 123456789)</FormErrorMessage>
            </FormControl>
            <div className="col-span-full">
                {index === passengerData.length - 1 ? (
                    <button
                        className="bg-white text-royal-blue-500 border-royal-blue-400 hover:bg-royal-blue-500 px-3 py-2
                    hover:text-white hover:border-royal-blue-400 col-start-1 border rounded-md"
                        onClick={handleAddPassenger}
                    >
                        เพิ่มผู้โดยสาร
                    </button>
                ) : (
                    <button
                        className="bg-white text-red-500 border-red-400 hover:bg-red-500 px-3 py-2
                    hover:text-white hover:border-red-400 col-start-1 border rounded-md"
                        onClick={() => handleDeletePassenger(index)}
                    >
                        ลบผู้โดยสาร
                    </button>
                )}
            </div>
        </div>
    );
};
export default PassengerForm;
