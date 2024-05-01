import React from 'react';
import { PassengerData } from '../../pages/Booking';
interface AddLuggageProps {
    passenger: PassengerData;
    index: number;
    increment: (index: number) => void;
    decrement: (index: number) => void;
}

const AddLuggage:React.FC<AddLuggageProps> = ({passenger,index,increment,decrement}:AddLuggageProps) => {
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
                    <button
                        className="text-[#605DEC] text-3xl font-semibold cursor-pointer disabled:cursor-not-allowed"
                        onClick={() => decrement(index)}
                    >
                        -
                    </button>
                    <span className="text-[#6E7491] text-base font-semibold">{passenger.count}</span>
                    <button
                        className="text-[#605DEC] text-xl font-semibold cursor-pointer"
                        onClick={() => increment(index)}
                    >
                        +
                    </button>
                </div>
            </div>
        </div>
    );
};
export default AddLuggage;
