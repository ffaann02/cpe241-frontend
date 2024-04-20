import { useState } from 'react';

const citiesDummy: string[] = [
    'New York',
    'Los Angeles',
    'Chicago',
    'Houston',
    'Phoenix',
]; // Example list of cities

export const LocationInputForm = () => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setCity(e.target.value);
    };

    const handleSelectCity = (selectedCity: string): void => {
        setCity(selectedCity);
    };

    const [city, setCity] = useState<string>('');

    return (
        <label className="input input-bordered flex items-center gap-2 w-full">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
            >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input type="text" className="grow" placeholder="Email" />
        </label>
    );
};
