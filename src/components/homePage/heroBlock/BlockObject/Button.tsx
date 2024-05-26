import React from 'react';
import { IconType } from 'react-icons';

interface SwitchFlightButtonProps {
    handleSwapLocations: (index: number) => void;
    index: number;
    icon: IconType;
}

export const SwitchFlightButton: React.FC<SwitchFlightButtonProps> = ({ handleSwapLocations, index, icon: Icon }) => {
    return (
        <div className="absolute -bottom-2.5 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <button
                className="p-1.5 bg-royal-blue-100 rounded-lg border border-royal-blue-300 drop-shadow-md
                                 hover:bg-royal-blue-200 hover:text-royal-blue-800"
                onClick={() => handleSwapLocations(index)}
            >
                <Icon className="text-lg" />
            </button>
        </div>
    );
};

interface HeaderServicesButtonsProps {
    serviceIndex: number;
    handleChangeService: (index: number) => void;
    icon1: IconType;
    icon2: IconType;
}

export const HeaderServicesButtons: React.FC<HeaderServicesButtonsProps> = ({
    serviceIndex,
    handleChangeService,
    icon1: Icon1,
    icon2: Icon2,
}) => {
    return (
        <div className="bg-slate-50 absolute drop-shadow-md px-3 rounded-md -top-6 left-0 right-0 mx-auto w-fit flex gap-x-3">
            <button
                className={`flex px-2 py-2 border-b-2 ${serviceIndex === 1 ? 'border-royal-blue-400' : 'border-white'}`}
                onClick={() => handleChangeService(1)}
            >
                <Icon1
                    className={`text-xl my-auto rotate-45 ${serviceIndex === 1 ? 'text-royal-blue-600' : 'text-slate-600'}`}
                />
                <p className={`${serviceIndex === 1 ? 'text-royal-blue-600' : 'text-slate-600'} ml-1 mt-1`}>
                    จองเที่ยวบิน
                </p>
            </button>
            <button
                className={`flex px-2 py-2 border-b-2 ${serviceIndex === 2 ? 'border-royal-blue-400' : 'border-white'}`}
                onClick={() => handleChangeService(2)}
            >
                <Icon2 className={`text-xl my-auto ${serviceIndex === 2 ? 'text-royal-blue-600' : 'text-slate-600'}`} />
                <p className={`${serviceIndex === 2 ? 'text-royal-blue-600' : 'text-slate-600'} ml-1 mt-1`}>
                    โปรโมชั่น
                </p>
            </button>
        </div>
    );
};

export const SearchFlightButton = ({ handleSearchFlight }: { handleSearchFlight: () => void }) => {
    return (
        <button
            onClick={handleSearchFlight}
            className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-royal-blue-400 px-44 py-4 
        rounded-lg text-white tracking-wide text-xl hover:bg-royal-blue-300 transition-all duration-200 
        ease-linear drop-shadow-md"
        >
            ค้นหาเที่ยวบิน
        </button>
    );
};

interface FlightTypeSelectButtonsProps {
    flightTypeList: { id: number; name: string }[];
    flightType: number;
    handleChangeFlightType: (id: number) => void;
}

export const FlightTypeSelectButtons: React.FC<FlightTypeSelectButtonsProps> = ({
    flightTypeList,
    flightType,
    handleChangeFlightType,
}) => {
    return (
        <div className="flex gap-x-3">
            {flightTypeList.map((item) => (
                <button
                    key={item.id}
                    className={`transition-all duration-100 ease-linear px-3.5 py-1.5 border-2 rounded-2xl 
                    ${
                        flightType === item.id
                            ? 'bg-royal-blue-100 text-royal-blue-600 border-royal-blue-400'
                            : 'bg-white text-slate-500 border-slate-200 hover:bg-royal-blue-50 hover:text-royal-blue-400 hover:border-royal-blue-300'
                    }`}
                    onClick={() => handleChangeFlightType(item.id)}
                >
                    {item.name}
                </button>
            ))}
        </div>
    );
};
