import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SearchHeader from '../components/searchPage/SearchHeader';
import FilterSideBar from '../components/searchPage/FilterSideBar';
import FlightResult from '../components/searchPage/FlightResult';

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

    return (
        <div className="w-full min-h-screen h-full flex flex-col">
            <SearchHeader />
            <div
                className="grid grid-cols-12 h-full gap-x-4 mt-6 w-full max-w-5xl mx-auto"
                id="flight_result_container"
            >
                <FilterSideBar />
                <FlightResult />
            </div>
        </div>
    );
};

export default Search;
