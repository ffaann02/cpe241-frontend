import React, { useContext } from 'react';
import { Select } from '@chakra-ui/react';
import { useState } from 'react';
import { PassengerData } from '../../context/BookingDetailsProvider';
import { BookingDetailsContext } from "../../context/BookingDetailsProvider";

interface AddLuggageProps {
    passenger: PassengerData;
    index: number;
    setPassengerData: React.Dispatch<React.SetStateAction<PassengerData[]>>;
}

const AddLuggage: React.FC<AddLuggageProps> = ({ passenger, index, setPassengerData }: AddLuggageProps) => {
    const {
        selectedBagCount,
        setSelectedBagCount,
        setPrice
    } = useContext(BookingDetailsContext);
    console.log(selectedBagCount);

    const bagCountOptions = ['+ 15kg (฿ 456)', '+ 20kg (฿ 508)', '+ 25kg (฿ 636)', '+ 30kg (฿ 1021)', '+ 35kg (฿ 1227)', '+ 40kg (฿ 1535)'];

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
        console.log(selectedValue);
    
        // Extract the price from the previously selected value if it exists
        const previousPrice = selectedBagCount ? parseInt(selectedBagCount.split('฿ ')[1], 10) : 0;
    
        // Extract the price from the selected value if it exists, else set it to 0
        const price = selectedValue !== '' ? parseInt(selectedValue.split('฿ ')[1], 10) : 0;
    
        // Subtract the previous price and add the new price to the total price
        setPrice(prevPrice => prevPrice - previousPrice + price);
    
        setSelectedBagCount(selectedValue);
        updatePassengerData(selectedValue);
    };
    const updatePassengerData = (bagCount: string | null) => {
        setPassengerData((prevPassengers) =>
            prevPassengers.map((passengerData, passengerIndex) =>
                passengerIndex === index ? { ...passengerData, bagCount: bagCount || '' } : passengerData
            )
        );
    };

    return (
        <div className="grid grid-cols-2 mb-4" key={index}>
            <div className="text-[#6E7491] text-lg">
                <h1 className="py-4">ผู้โดยสาร {index + 1}</h1>
                <h1>
                    {passenger.firstName} &nbsp;&nbsp; {passenger.lastName}
                </h1>
            </div>
            <div className="text-[#6E7491] text-lg">
                <h1 className="py-4">จำนวนกระเป๋าเดินทาง</h1>
                <div className="flex items-center gap-4">
                    <div className="select-container w-full h-fit">
                        <Select
                            value={selectedBagCount || ''}
                            onChange={handleChange}
                            placeholder="ไม่มีสัมภาระเพิ่มเติม"
                        >
                            {bagCountOptions.map((option, idx) => (
                                <option key={idx} value={option}>
                                    {option}
                                </option>
                            ))}
                        </Select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddLuggage;