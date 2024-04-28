import FilterSideBar from '../components/searchPage/FilterSideBar';
import FlightResult from '../components/searchPage/FlightResult';
import SearchHeader from '../components/searchPage/SearchHeader';

const Search = () => {
    return (
        <div className="w-full min-h-screen h-full flex flex-col">
            <SearchHeader />
            <div className="grid grid-cols-12 h-full gap-x-4 mt-6 w-full max-w-5xl mx-auto" id="flight_result_container">
                <FilterSideBar/>
                <FlightResult/>
            </div>
        </div>
    );
};
export default Search;
