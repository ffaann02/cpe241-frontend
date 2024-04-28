import { useState } from 'react';
import Price from './sideBarChoices/Price';
import Airline from './sideBarChoices/Airline';
import Time from './sideBarChoices/Time';
import Service from './sideBarChoices/Service';

export type PriceRange = {
    min: number;
    max: number;
};

export type TimeRange = {
    q1: boolean;
    q2: boolean;
    q3: boolean;
    q4: boolean;
};

export type ServiceType = {
    extraStorage: boolean;
    food: boolean;
    plug: boolean;
};

const FilterSideBar = () => {
    const [price, setPrice] = useState<PriceRange>({
        min: 1000,
        max: 10000,
    });
    const [selectedAirline, setSelectedAirline] = useState<string[]>([]);
    const [selectedTime, setSelectedTime] = useState<TimeRange>({
        q1: false,
        q2: false,
        q3: false,
        q4: false,
    });
    const [selectedServices, setSelectedServices] = useState<ServiceType>({
        extraStorage: false,
        food: false,
        plug: false
    });

    return (
        <div className="col-span-3">
            <div className="flex justify-between">
                <h1 className="text-slate-600 font-bold text-lg">คัดกรองการค้นหา</h1>
                <button className="text-red-600 text-sm">ล้างข้อมูล</button>
            </div>
            <div className="flex flex-col gap-y-2 mt-1" id="choice_container">
                <Price title="ราคา" price={price} setPrice={setPrice} />
                <Airline title="สายการบิน" selectedAirline={selectedAirline} setSelectedAirline={setSelectedAirline} />
                <Time title="เวลาออกเดินทาง" selectedTime={selectedTime} setSelectedTime={setSelectedTime} />
                <Service title="บริการเพิ่มเติม" selectedServices={selectedServices} setSelectedServices={setSelectedServices}/>
            </div>
        </div>
    );
};
export default FilterSideBar;
