import { useState } from 'react';
import { FlightData } from '../FlightResult';
import { Collapse } from '@chakra-ui/react';
import '../../component.css';
export const FlightCard = ({ flight, index }: { flight: FlightData; index: number }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [detailSection, setDetailSection] = useState<string>('flight');

    const handleToggle = (detail: string, event: React.MouseEvent) => {
        event.stopPropagation(); // This will stop the event from bubbling up
        setDetailSection(detail);
        if (detailSection === detail) setIsOpen(!isOpen);
        else setIsOpen(true);
    };
    return (
        <div
            className="border transition-all duration-100 ease-linear border-neutral-300 bg-white 
            hover:drop-shadow-md hover:border-royal-blue-300 pt-3 rounded-[5px] cursor-pointer"
            id={`${flight.airline}_${index}`}
            onClick={(event) => handleToggle('flight', event)}
        >
            <div className="grid grid-cols-6 px-4">
                <div className="flex flex-col col-span-2">
                    <div className="flex gap-x-2">
                        <img src={flight.airlineIcon} className="w-4 h-4" />
                        <p className="text-slate-600 text-sm my-auto">{flight.airline}</p>
                    </div>
                    <div className="mt-1">
                        <div className="flex">
                            <div>
                                <p className="text-slate-500 font-semibold text-lg">{flight.departureTime}</p>
                                <p className="text-slate-600 text-xs">{flight.destination}</p>
                            </div>
                            <div className="mx-auto"></div>
                            <div>
                                <p className="text-slate-500 font-semibold text-lg">{flight.arrivalTime}</p>
                                <p className="text-slate-600 text-xs">{flight.destination}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="my-auto pt-2 col-span-2 ml-14 text-slate-500">
                    <p>{flight.FlightTime}</p>
                </div>
                <div className="my-auto text-right justify-end col-span-2">
                    <div className="flex ml-auto mr-0 justify-end gap-x-1">
                        <span className="text-royal-blue-600  text-xl my-auto font-semibold">฿</span>
                        <p className="text-royal-blue-600 font-bold text-xl">1,000</p>
                        <span className="text-sm my-auto text-slate-600">/คน</span>
                    </div>
                    <button
                        className="px-6 py-2 bg-royal-blue-600 hover:bg-royal-blue-400 text-sm 
                    font-semibold text-white rounded-md"
                    >
                        เลือก
                    </button>
                </div>
            </div>
            <div className="mt-4 px-4 flex gap-x-6 text-sm mb-2">
                <button
                    className="text-royal-blue-600 hover:underline"
                    onClick={(event) => handleToggle('flight', event)}
                >
                    <p>รายละเอียดเที่ยวบิน</p>
                </button>
                <button
                    className="text-royal-blue-600 hover:underline"
                    onClick={(event) => handleToggle('price', event)}
                >
                    <p>รายละเอียดราคา</p>
                </button>
            </div>
            <Collapse in={isOpen} animateOpacity>
                <div className="bg-royal-blue-50 border-t border-t-royal-blue-200 py-2 px-4 rounded-b-md">
                    {detailSection === 'flight' ? (
                        <div>
                            <p>Flight details here</p>
                        </div>
                    ) : (
                        <div>
                            <p>Price details here</p>
                        </div>
                    )}
                </div>
            </Collapse>
        </div>
    );
};
