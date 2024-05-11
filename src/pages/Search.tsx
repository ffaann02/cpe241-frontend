import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SearchHeader from '../components/searchPage/SearchHeader';
import FilterSideBar from '../components/searchPage/FilterSideBar';
import FlightResult from '../components/searchPage/FlightResult';
import { LoadingAirplaneGif } from '../components/LoadingGroup';
import fakeFlightData from '../data/fakeFlightData.json';
import axios from 'axios';

export interface Flight {
    flightID: string;
    airlineIcon: string;
    airline: string;
    flightNumber: string;
    departureTime: string;
    arrivalTime: string;
    duration: string;
    from: string;
    destination: string;
    subtotal: number;
}

const Search = () => {
    const location = useLocation();
    const [isFetching, setIsFetching] = useState(false);
    const [flightResult, setFlightResult] = useState<Flight[]>([]);
    const [passengerAmount, setPassengerAmount] = useState<number>(1);

    useEffect(() => {
        const getFlights = async (): Promise<void> => {
            try {
                setIsFetching(true);
                const searchParams = Object.fromEntries(new URLSearchParams(location.search).entries());
                const passengerParamsCount = parseInt(searchParams.adult) + parseInt(searchParams.child) + parseInt(searchParams.infant);
                setPassengerAmount(passengerParamsCount);
                const response = await axios.get('/api/search/flights', {
                    params: searchParams,
                });
                if (response.status === 200) {
                    console.log(response.data);
                    setFlightResult(response.data as Flight[]);
                } else {
                    alert('Failed to fetch flight data');
                }
                setIsFetching(false);
            } catch (error) {
                console.error('An error occurred while trying to fetch flight data:', error);
            }
            setIsFetching(false);
        };
        getFlights();
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
                <FlightResult isFetching={isFetching} flightResult={flightResult} passengerAmount={passengerAmount}/>
            </div>
        </div>
    );
};

export default Search;
