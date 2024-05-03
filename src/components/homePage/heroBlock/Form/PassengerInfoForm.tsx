import React, { useEffect, useRef } from 'react';
import { IconType } from 'react-icons';
import { PassengerAmountInfo } from '../HereBlock';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';

interface PassengerInfoFormProps {
    icon: IconType;
    passengerAmount: PassengerAmountInfo;
    setPassengerAmount: React.Dispatch<React.SetStateAction<PassengerAmountInfo>>;
    isEnterPassengerPicker: boolean;
    setIsEnterPassengerPicker: React.Dispatch<React.SetStateAction<boolean>>;
}

const PassengerInfoForm: React.FC<PassengerInfoFormProps> = ({
    icon: Icon,
    passengerAmount,
    setPassengerAmount,
    isEnterPassengerPicker,
    setIsEnterPassengerPicker,
}) => {
    const handleIncrement = (key: keyof PassengerAmountInfo) => {
        setPassengerAmount((prev) => ({ ...prev, [key]: prev[key] + 1 }));
    };

    const handleDecrement = (key: keyof PassengerAmountInfo) => {
        if (passengerAmount[key] > 0) {
            setPassengerAmount((prev) => ({ ...prev, [key]: prev[key] - 1 }));
        }
    };

    const handleSubmit = () => {
        console.log(passengerAmount);
        setIsEnterPassengerPicker(false);
    };

    const ref = useRef<any>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setIsEnterPassengerPicker(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={ref}>
            <p className="text-slate-500 text-sm ml-0.5 mb-0.5">จำนวนผู้โดยสาร</p>
            <label className="input input-bordered flex items-center gap-2">
                {/* <Icon />
                <input
                    type="text"
                    onClick={() => setIsEnterPassengerPicker(true)}
                    onFocus={() => setIsEnterPassengerPicker(true)}
                    className="grow text-slate-500 placeholder:text-sm"
                    placeholder="จำนวนผู้ใหญ่, เด็ก, ทารก"
                    value={`ผู้ใหญ่ ${passengerAmount.adult}, เด็ก ${passengerAmount.child}, ทารก ${passengerAmount.infant}`}
                    readOnly
                /> */}
                <InputGroup className="flex bg-white rounded-md">
                    <InputLeftElement pointerEvents="none" className="mt-1">
                        <span className="text-royal-blue-600 text-xl ml-3"><Icon/></span>
                    </InputLeftElement>
                    <Input
                        size="lg"
                        fontSize={'md'}
                        focusBorderColor="purple.200"
                        type="text"
                        onClick={() => setIsEnterPassengerPicker(true)}
                        onFocus={() => setIsEnterPassengerPicker(true)}
                        className="placeholder:text-sm text-slate-500"
                        placeholder="จำนวนผู้ใหญ่, เด็ก, ทารก"
                        value={`ผู้ใหญ่ ${passengerAmount.adult}, เด็ก ${passengerAmount.child}, ทารก ${passengerAmount.infant}`}
                        readOnly
                    />
                </InputGroup>
            </label>
            {isEnterPassengerPicker && (
                <div
                    id="passenger-amount-picker"
                    className="absolute z-50 mt-2 w-full bg-white rounded-md border drop-shadow-sm px-6 py-3 flex flex-col gap-y-4"
                >
                    <div className="flex justify-between border-b py-1">
                        <div className="flex">
                            <a className="text-sm my-auto text-neutral-400">ผู้ใหญ่ (อายุ 12 ปีขึ้นไป)</a>
                        </div>
                        <div className="flex gap-x-4 pl-4">
                            <button onClick={() => handleDecrement('adult')}>
                                <FiMinus className="my-auto" />
                            </button>
                            <div className="text-xl font-semibold text-royal-blue-500 w-6 text-center">
                                {passengerAmount.adult}
                            </div>
                            <button onClick={() => handleIncrement('adult')}>
                                <FiPlus className="my-auto" />
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-between border-b py-1">
                        <div className="flex">
                            <a className="text-sm my-auto text-neutral-400">เด็ก (อายุ 2 - 11 ปี)</a>
                        </div>
                        <div className="flex gap-x-4 pl-4">
                            <button onClick={() => handleDecrement('child')}>
                                <FiMinus className="my-auto" />
                            </button>
                            <div className="text-xl font-semibold text-royal-blue-500 w-6 text-center">
                                {passengerAmount.child}
                            </div>
                            <button onClick={() => handleIncrement('child')}>
                                <FiPlus className="my-auto" />
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-between border-b py-1">
                        <div className="flex">
                            <a className="text-sm my-auto text-neutral-400">ทารก (อายุน้อยกว่า 2 ปี)</a>
                        </div>
                        <div className="flex gap-x-4">
                            <button onClick={() => handleDecrement('infant')}>
                                <FiMinus className="my-auto" />
                            </button>
                            <div className="text-xl font-semibold text-royal-blue-500 w-6 text-center">
                                {passengerAmount.infant}
                            </div>
                            <button onClick={() => handleIncrement('infant')}>
                                <FiPlus className="my-auto" />
                            </button>
                        </div>
                    </div>
                    <button
                        className="bg-royal-blue-400 hover:bg-royal-blue-500 w-fit px-10 py-2 ml-auto text-white rounded-md"
                        onClick={handleSubmit}
                    >
                        เสร็จสิ้น
                    </button>
                </div>
            )}
        </div>
    );
};
export default PassengerInfoForm;
