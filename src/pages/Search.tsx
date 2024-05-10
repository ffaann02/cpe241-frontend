import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SearchHeader from '../components/searchPage/SearchHeader';
import FilterSideBar from '../components/searchPage/FilterSideBar';
import FlightResult from '../components/searchPage/FlightResult';
import { LoadingAirplaneGif } from '../components/LoadingGroup';
import fakeFlightData from "../data/fakeFlightData.json"

export interface Flight{
    airlineIcon: string;
    airline: string;
    flightNumber: string;
    FlightTime: string;
    departureTime: string;
    arrivalTime: string;
    duration: string;
    from: string;
    destination: string;
    subtotal: number;
}

const Search = () => {
    const location = useLocation();
    const [searchParams, setSearchParams] = useState(null);

    useEffect(() => {
        if (!searchParams) {
            const searchParamsObject = Object.fromEntries(new URLSearchParams(location.search).entries());
            console.log(searchParamsObject);
            setSearchParams(searchParamsObject);
        }
    }, [location.search]);

    const [isFetching, setIsFetching] = useState(false);
    const [flightResult, setFlightResult] = useState<Flight[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            setIsFetching(true);
            // Simulate fetching flight data
            await new Promise((resolve) => setTimeout(resolve, 2000));
            setFlightResult(fakeFlightData as Flight[]);
            setIsFetching(false);
        };
        fetchData();
    }, []);

    return (
        <div className="w-full min-h-screen h-full flex flex-col">
            <LoadingAirplaneGif loading={isFetching} title="กำลังค้นหาเที่ยวบินให้คุณ" />
            <SearchHeader />
            <div
                className="grid grid-cols-12 h-full gap-x-4 mt-6 w-full max-w-5xl mx-auto"
                id="flight_result_container"
            >
                <FilterSideBar />
                <FlightResult isFetching={isFetching} flightResult={flightResult} selectedTime={null}/>
            </div>
        </div>
    );
};

export default Search;
