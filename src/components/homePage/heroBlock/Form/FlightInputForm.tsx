import React, { useEffect, useRef, useState } from 'react';

import fakeAirportData from '../../../../data/fakeAirportData.json';
import { FlightData } from '../HereBlock';

export interface City {
    name: string;
    name_th: string;
    code: string;
    country: string;
    airport: string;
}

interface LocationInputFormProps {
    icon: React.ReactNode;
    title: string;
    state: string;
    flight: FlightData;
    index: number;
    flightData: FlightData[];
    setFlightData: React.Dispatch<React.SetStateAction<FlightData[]>>;
    focusedState: string;
    setFocusedState: React.Dispatch<React.SetStateAction<string>>;
}

export const LocationInputForm: React.FC<LocationInputFormProps> = ({
    icon,
    title,
    state,
    index,
    flightData,
    setFlightData,
    focusedState,
    setFocusedState,
}: LocationInputFormProps) => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedCity, setSelectedCity] = useState<City | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleFocus = () => {
        setFocusedState(state);
    };

    useEffect(() => {
        if (focusedState === state && inputRef.current) {
            inputRef.current.focus();
        }
    }, [focusedState, state]);

    // Allow one backspace to erase selected city
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (
                selectedCity &&
                event.key === 'Backspace' &&
                searchTerm === `${selectedCity.name} (${selectedCity.code})`
            ) {
                setSearchTerm('');
                setSelectedCity(null);
                setFlightData((prevFlightData) => {
                    return prevFlightData.map((flightData, i) => {
                        if (i === index) {
                            return { ...flightData, [state]: '' };
                        }
                        return flightData;
                    });
                });
            }
        };

        const inputElement = inputRef.current;
        if (inputElement) {
            inputElement.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            if (inputElement) {
                inputElement.removeEventListener('keydown', handleKeyDown);
            }
        };
    }, [searchTerm, selectedCity]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) && focusedState === state) {
                setFocusedState('');
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [focusedState, setFocusedState, state]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setSearchTerm(e.target.value);
    };

    useEffect(() => {
        const cityCode = flightData[index][state];
        if (cityCode === '') {
            setSelectedCity(null);
            setSearchTerm('');
            return;
        }
        if (cityCode) {
            const city = fakeAirportData.find((city) => city.code === cityCode);
            if (city) {
                setSelectedCity(city);
                setSearchTerm(`${city.name} (${city.code})`);
            }
        }
    }, [selectedCity, flightData[index][state]]);

    const handleSelectCity = (city: City) => {
        setSelectedCity(city);
        setFlightData((prevFlightData) => {
            return prevFlightData.map((flightData, i) => {
                if (i === index) {
                    return { ...flightData, [state]: city.code };
                }
                return flightData;
            });
        });
        setFocusedState('');
    };

    const filterCities = (city: City) => {
        const lowercaseSearchTerm = searchTerm.toLowerCase();
        return (
            city.name.toLowerCase().includes(lowercaseSearchTerm) ||
            city.name_th.toLowerCase().includes(lowercaseSearchTerm) ||
            city.code.toLowerCase().includes(lowercaseSearchTerm) ||
            city.country.toLowerCase().includes(lowercaseSearchTerm) ||
            city.airport.toLowerCase().includes(lowercaseSearchTerm)
        );
    };

    return (
        <div>
            <p className="text-slate-500 text-sm ml-0.5">{title}</p>
            <label className="input input-bordered flex items-center gap-2 relative mt-0.5">
                {icon}
                <input
                    ref={inputRef}
                    type="text"
                    className="grow placeholder:text-sm text-slate-500"
                    placeholder={`เดินทาง${title}... สนามบิน, เมือง, ประเทศ`}
                    value={searchTerm}
                    onFocus={handleFocus}
                    onChange={handleChange}
                />
                {focusedState === state && !selectedCity && (
                    <div
                        ref={dropdownRef}
                        className="absolute w-full bg-white overflow-y-auto max-h-80 left-0 top-14 border rounded-lg z-10"
                    >
                        <p className="text-sm sticky top-0 bg-slate-100 pl-4 py-2 shadow-sm shadow-slate-200">
                            ค้นหาเมืองหรือสนามบินที่คุณต้องการ
                        </p>
                        <ul className="">
                            {fakeAirportData.filter(filterCities).map((city, index) => (
                                <li
                                    key={index}
                                    onClick={() => handleSelectCity(city)}
                                    className={`hover:bg-violet-50 px-4 py-2 rounded-none cursor-pointer 
                                    ${fakeAirportData.filter(filterCities).length - 1 !== index ? 'border-b' : 'border-b-0'}`}
                                >
                                    <div className="text-sm">
                                        <p className="font-semibold text-slate-600">
                                            {city.name}, {city.country}
                                        </p>
                                        <p className="text-slate-500">
                                            {city.code} - {city.airport}
                                        </p>
                                    </div>
                                </li>
                            ))}
                            {fakeAirportData.filter(filterCities).length === 0 && (
                                <li className="px-4 py-2 text-sm text-slate-600">ไม่พบผลลัพธ์</li>
                            )}
                        </ul>
                    </div>
                )}
            </label>
        </div>
    );
};
