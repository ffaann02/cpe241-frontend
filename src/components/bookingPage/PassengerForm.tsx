import Datepicker from 'react-tailwindcss-datepicker';
import { PassengerData } from '../../pages/Booking';
import { Input, InputGroup } from '@chakra-ui/react';

interface PassengerProps {
    index: number;
    passenger: PassengerData;
    handleChangePassenger: (index: number, e: React.ChangeEvent<HTMLInputElement>) => void;
    handleDateOfBirthChange: (index: number, e: any) => void;
    passengerData: PassengerData[];
    handleDeletePassenger: (index: number) => void;
    handleAddPassenger: () => void;
}

export interface FormProps {
    value: string;
    handleChange: (index: number, e: React.ChangeEvent<HTMLInputElement>) => void;
    index: number;
    placeholder: string;
    name: string;
    className: string;
}

export const Form: React.FC<FormProps> = ({ value, handleChange, index, placeholder, name, className }) => {
    return (
        <InputGroup className={'flex bg-white rounded-md ' + className}>
            <Input
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
}: PassengerProps) => {
    return (
        <div className="grid grid-cols-6 gap-4 mb-4" key={index}>
            <h2 className="text-[#6E7491] text-lg font-medium col-span-6">
                ผู้โดยสาร {index + 1} {index > 0 ? null : '(ผู้ใหญ่)'}
            </h2>
            <Form
                value={passenger.firstName}
                handleChange={handleChangePassenger}
                index={index}
                placeholder="ชื่อ*"
                name="firstName"
                className="col-span-2"
            />
            <Form
                value={passenger.middleName}
                handleChange={handleChangePassenger}
                index={index}
                placeholder="ชื่อกลาง"
                name="middleName"
                className="col-span-2"
            />
            <Form
                value={passenger.lastName}
                handleChange={handleChangePassenger}
                index={index}
                placeholder="นามสกุล*"
                name="lastName"
                className="col-span-2"
            />
            <Form
                value={passenger.suffix}
                handleChange={handleChangePassenger}
                index={index}
                placeholder="คำลงท้าย"
                name="suffix"
                className="col-span-3"
            />
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
            <Form
                value={passenger.email}
                handleChange={handleChangePassenger}
                index={index}
                placeholder="ที่อยู่อีเมล*"
                name="email"
                className="col-span-3"
            />
            <Form
                value={passenger.phoneNumber}
                handleChange={handleChangePassenger}
                index={index}
                placeholder="เบอร์ติดต่อ*"
                name="phoneNumber"
                className="col-span-2"
            />
            <div className="col-span-full">
                {index === passengerData.length - 1 ? (
                    <button
                        className="bg-white text-blue-500 border-blue-400 hover:bg-blue-500 px-3 py-2
                    hover:text-white hover:border-blue-400 col-start-1 border rounded-md"
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
