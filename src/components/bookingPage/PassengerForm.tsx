import Datepicker from 'react-tailwindcss-datepicker';
import { PassengerData } from '../../pages/Booking';

interface PassengerProps {
    index: number;
    passenger: PassengerData;
    handleChangePassenger: (index: number, e: React.ChangeEvent<HTMLInputElement>) => void;
    handleDateOfBirthChange: (index: number, e: any) => void;
    passengerData:PassengerData[];
    handleDeletePassenger: (index: number) => void;
    handleAddPassenger: () => void;
}

const PassengerForm:React.FC<PassengerProps> = ({
    index,
    passenger,
    handleChangePassenger,
    handleDateOfBirthChange,
    passengerData,
    handleDeletePassenger,
    handleAddPassenger,
}:PassengerProps) => {
    return (
        <div className="grid grid-cols-6 gap-4 mb-4" key={index}>
            <h2 className="text-[#6E7491] text-lg font-medium col-span-6">
                ผู้โดยสาร {index + 1} {index > 0 ? null : '(ผู้ใหญ่)'}
            </h2>
            <label className="input border-[#A1B0CC] placeholder:text-[#7C8DB0] text-[#7C8DB0] px-2 py-3 text-base rounded outline-none flex items-center gap-2 col-span-2">
                <input
                    type="text"
                    className="grow"
                    placeholder="ชื่อ*"
                    name="firstName"
                    value={passenger.firstName}
                    onChange={(e) => handleChangePassenger(index, e)}
                />
            </label>
            <label className="input border-[#A1B0CC] placeholder:text-[#7C8DB0] text-[#7C8DB0] px-2 py-3 text-base rounded flex items-center gap-2 col-span-2">
                <input
                    type="text"
                    className="grow"
                    placeholder="ชื่อกลาง"
                    name="middleName"
                    value={passenger.middleName}
                    onChange={(e) => handleChangePassenger(index, e)}
                />
            </label>
            <label className="input border-[#A1B0CC] placeholder:text-[#7C8DB0] text-[#7C8DB0] px-2 py-3 text-base rounded flex items-center gap-2 col-span-2">
                <input
                    type="text"
                    className="grow"
                    placeholder="นามสกุล*"
                    name="lastName"
                    value={passenger.lastName}
                    onChange={(e) => handleChangePassenger(index, e)}
                />
            </label>
            <label className="input border-[#A1B0CC] placeholder:text-[#7C8DB0] text-[#7C8DB0] px-2 py-3 text-base rounded flex items-center gap-2 col-span-3 ">
                <input
                    type="text"
                    className="grow"
                    placeholder="คำลงท้าย"
                    name="suffix"
                    value={passenger.suffix}
                    onChange={(e) => handleChangePassenger(index, e)}
                />
            </label>
            <div className="col-span-2 relative">
                <Datepicker
                    asSingle={true}
                    value={{
                        startDate:passenger.dateOfBirth,
                        endDate:null
                    }}
                    onChange={(e) => handleDateOfBirthChange(index, e)}
                    popoverDirection="down"
                    inputClassName="h-full border w-full px-2 py-3 rounded border-[#A1B0CC] focus:border-[#7C8DB0] input input-bordered"
                />
            </div>
            <label className="input border-[#A1B0CC] placeholder:text-[#7C8DB0] text-[#7C8DB0] px-2 py-3 text-base rounded flex items-center gap-2 col-span-3">
                <input
                    type="text"
                    className="grow"
                    placeholder="ที่อยู่อีเมล*"
                    name="email"
                    value={passenger.email}
                    onChange={(e) => handleChangePassenger(index, e)}
                />
            </label>
            <label className="input border-[#A1B0CC] placeholder:text-[#7C8DB0] text-[#7C8DB0] px-2 py-3 text-base rounded flex items-center gap-2 col-span-2">
                <input
                    type="text"
                    className="grow"
                    placeholder="เบอร์ติดต่อ*"
                    name="phoneNumber"
                    value={passenger.phoneNumber}
                    onChange={(e) => handleChangePassenger(index, e)}
                />
            </label>
            {index !== passengerData.length - 1 && (
                <button
                    className="btn rounded bg-white text-red-500 border-red-500 hover:bg-red-500 hover:text-white hover:border-hidden w-[120px] col-start-1"
                    onClick={() => handleDeletePassenger(index)}
                >
                    ลบผู้โดยสาร
                </button>
            )}
            {index === passengerData.length - 1 && (
                <button
                    className="btn rounded bg-white text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white hover:border-hidden w-[120px] col-start-1"
                    onClick={handleAddPassenger}
                >
                    เพิ่มผู้โดยสาร
                </button>
            )}
        </div>
    );
};
export default PassengerForm;
