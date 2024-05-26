import React, { useEffect, useRef, useState } from 'react';
import { FlightData } from '../HereBlock';
import { Input, InputGroup, InputLeftElement, Skeleton, Stack } from '@chakra-ui/react';
import axiosPrivate from '../../../../api/axios';

export interface City {
    airportName: string;
    city: string;
    country: string;
    iata: string;
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
    recommendAirports: City[];
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
    recommendAirports,
}: LocationInputFormProps) => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedCity, setSelectedCity] = useState<City | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [airportResult, setAirportResult] = useState<City[]>([]);
    const [isFetching, setIsFetching] = useState<boolean>(false);

    const handleFocus = () => {
        setFocusedState(state);
    };

    useEffect(() => {
        if (focusedState === state && inputRef.current) {
            inputRef.current.focus();
        }
    }, [focusedState, state]);

    useEffect(() => {
        setAirportResult(recommendAirports);
    }, [recommendAirports]);

    useEffect(() => {
        const getAirports = async (): Promise<void> => {
            setIsFetching(true);
            try {
                if (searchTerm.length > 0) {
                    if (searchTerm.includes('(')) {
                        let [city, iata] = searchTerm.split(' (');
                        iata = iata.slice(0, -1);
                        const selected = airportResult.some(
                            (airport) => airport.city === city && airport.iata === iata
                        );
                        if (selected) return;
                    }
                    const response = await axiosPrivate.get(`/api/search/airports?query=${searchTerm}`);
                    if (response.status === 200) {
                        setAirportResult(response.data);
                        setIsFetching(false);
                    } else {
                        alert('Failed to fetch airport data');
                    }
                }
            } catch (error) {
                console.error('An error occurred while trying to fetch airport data:', error);
            }
        };
        if (searchTerm.length === 0) {
            setAirportResult(recommendAirports);
            setIsFetching(false);
            return;
        }
        getAirports();
    }, [searchTerm]);

    // Allow one backspace to erase selected city
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (
                selectedCity &&
                event.key === 'Backspace' &&
                searchTerm === `${selectedCity.city} (${selectedCity.iata})`
            ) {
                setSearchTerm('');
                setSelectedCity(null);
                setFlightData((prevFlightData) => {
                    return prevFlightData.map((flightData, i) => {
                        if (i === index) {
                            return {
                                ...flightData,
                                [state]: {
                                    airportName: '',
                                    city: '',
                                    country: '',
                                    iata: '',
                                },
                            };
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
        const city = flightData[index][state];
        if (city.iata === '') {
            setSelectedCity(null);
            setSearchTerm('');
            return;
        }
        if (city.iata !== '') {
            setSelectedCity(city);
            setSearchTerm(`${city.city} (${city.iata})`);
        }
    }, [selectedCity, flightData[index][state]]);

    const handleSelectCity = (city: City) => {
        setSelectedCity(city);
        setFlightData((prevFlightData) => {
            return prevFlightData.map((flightData, i) => {
                if (i === index) {
                    return { ...flightData, [state]: city };
                }
                return flightData;
            });
        });
        setFocusedState('');
    };

    return (
        <div>
            <p className="text-slate-500 text-sm ml-0.5">{title}</p>
            <label className="flex items-center gap-2 relative mt-0.5">
                <InputGroup className="flex bg-white rounded-md">
                    <InputLeftElement pointerEvents="none" className="mt-1">
                        <span className="text-royal-blue-600 text-xl ml-3">{icon}</span>
                    </InputLeftElement>
                    <Input
                        size="lg"
                        focusBorderColor="purple.200"
                        ref={inputRef}
                        type="text"
                        className="placeholder:text-sm text-slate-500 pt-0.5"
                        placeholder={`เดินทาง${title}... สนามบิน, เมือง, ประเทศ`}
                        value={searchTerm}
                        onFocus={handleFocus}
                        onChange={handleChange}
                    />
                </InputGroup>
                {!selectedCity && focusedState === state && (
                    <div
                        ref={dropdownRef}
                        className="absolute w-full bg-white overflow-y-auto max-h-80 left-0 top-14 border rounded-lg z-10"
                    >
                        {!isFetching ? (
                            <div>
                                <p className="text-sm sticky top-0 bg-slate-100 pl-4 py-2 shadow-sm shadow-slate-200">
                                    ค้นหาเมืองหรือสนามบินที่คุณต้องการ
                                </p>
                                <ul className="">
                                    {airportResult.map((city, index) => (
                                        <li
                                            key={index}
                                            onClick={() => handleSelectCity(city)}
                                            className={`hover:bg-violet-50 px-4 py-2 rounded-none cursor-pointer 
                                    ${airportResult.length - 1 !== index ? 'border-b' : 'border-b-0'}`}
                                        >
                                            <div className="text-sm">
                                                <p className="font-semibold text-slate-600">
                                                    {city.city}, {city.country}
                                                </p>
                                                <p className="text-slate-500">
                                                    {city.iata} - {city.airportName}
                                                </p>
                                            </div>
                                        </li>
                                    ))}
                                    {airportResult.length === 0 && (
                                        <li className="px-4 py-2 text-sm text-slate-600">ไม่พบผลลัพธ์</li>
                                    )}
                                </ul>
                            </div>
                        ) : (
                            <Stack className="p-2">
                                <Skeleton height="10px" />
                                <Skeleton height="10px" />
                                <Skeleton height="10px" />
                            </Stack>
                        )}
                    </div>
                )}
            </label>
        </div>
    );
};
