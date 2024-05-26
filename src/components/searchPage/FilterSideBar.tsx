import { useEffect, useState } from 'react';
import Price from './sideBarChoices/Price';
import Airline from './sideBarChoices/Airline';
import Time from './sideBarChoices/Time';
import Service from './sideBarChoices/Service';
import { Accordion } from '@chakra-ui/react';
import FlightResult from './FlightResult';
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
export const InitialTimeRange: TimeRange = {
    q1: false,
    q2: false,
    q3: false,
    q4: false,
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
    const [selectedTime, setSelectedTime] = useState<TimeRange>(InitialTimeRange);
    const [selectedServices, setSelectedServices] = useState<ServiceType>({
        extraStorage: false,
        food: false,
        plug: false,
    });
    useEffect(() => {
        InitialTimeRange.q1 = selectedTime.q1;
        InitialTimeRange.q2 = selectedTime.q2;
        InitialTimeRange.q3 = selectedTime.q3;
        InitialTimeRange.q4 = selectedTime.q4;
    }, [selectedTime]);

    return (
        <div className="col-span-3">
            <div className="flex justify-between">
                <h1 className="text-slate-600 font-bold text-lg">คัดกรองการค้นหา</h1>
                <button className="text-red-600 text-sm">ล้างข้อมูล</button>
            </div>
            <Accordion className="flex flex-col gap-y-2 mt-1" id="choice_container" defaultIndex={[0]} allowMultiple>
                <Price title="ราคา" price={price} setPrice={setPrice} />
                <Airline title="สายการบิน" selectedAirline={selectedAirline} setSelectedAirline={setSelectedAirline} />
                <Time title="เวลาออกเดินทาง" selectedTime={selectedTime} setSelectedTime={setSelectedTime} />
                {/* <FlightResult isFetching={null} flightResult={[]}/> */}
                <Service
                    title="บริการเพิ่มเติม"
                    selectedServices={selectedServices}
                    setSelectedServices={setSelectedServices}
                />
            </Accordion>
        </div>
    );
};
export default FilterSideBar;
