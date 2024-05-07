import { useState } from 'react';
import DetailsBar from '../components/selectSeat/DetailsBar';
import SeatGroup from '../components/selectSeat/SeatGroup';

const SelectSeat = () => {
    const [capacity, setCapacity] = useState<number>(160);
    const [bookedSeat, setBookedSeat] = useState<string[]>(['A1', 'B10', 'C3', 'D7', 'E5', 'F8']);
    return (
        <div className="w-full grid grid-cols-5 max-w-5xl mx-auto bg-red-200">
            <SeatGroup capacity={capacity} bookedSeat={bookedSeat} setBookedSeat={setBookedSeat}/>
            <DetailsBar />
        </div>
    );
};
export default SelectSeat;
