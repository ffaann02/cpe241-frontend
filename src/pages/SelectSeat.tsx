import DetailsBar from "../components/selectSeat/DetailsBar";
import SeatGroup from "../components/selectSeat/SeatGroup";

const SelectSeat = () => {
    return (
        <div className="w-full min-h-screen grid grid-cols-2 max-w-6xl mx-auto">
            <SeatGroup/>
            <DetailsBar/>
        </div>
    );
};
export default SelectSeat;
