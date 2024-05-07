import { useState } from 'react';
import DetailsBar from '../components/selectSeat/DetailsBar';
import SeatGroup from '../components/selectSeat/SeatGroup';

export interface Flight {
    departure: string;
    arrival: string;
    from: string;
    to: string;
    airline: string;
    price: number;
}

const SelectSeat = () => {
    const [capacity, setCapacity] = useState<number>(160);
    const [bookedSeat, setBookedSeat] = useState<string[]>(['A1', 'B10', 'C3', 'D7', 'E5', 'F8']);
    const [flight, setFlight] = useState<Flight>({
        departure: '2022-12-31T10:00:00.000Z',
        arrival: '2022-12-31T12:00:00.000Z',
        from: 'Bangkok',
        to: 'Chiang Mai',
        airline: 'Thai Airways',
        price: 1500,
    });

    const [choosedSeat, setChoosedSeat] = useState([
        {
            seat: null,
            name: 'TEST ',
        },
        {
            seat: null,
            name: 'YES',
        },
        {
            seat: 'A2',
            name: 'YES 2',
        },
    ]);

    const handleChooseSeat = (seat: string) => {
        if (choosedSeat.some((s) => s.seat === seat)) {
            setChoosedSeat(choosedSeat.map((s) => (s.seat === seat ? { ...s, seat: null } : s)));
        } else {
            let seatAssigned = false;
            const updatedSeats = choosedSeat.map((s) => {
                if (s.seat === null && !seatAssigned) {
                    seatAssigned = true;
                    return { ...s, seat };
                } else {
                    return s;
                }
            });
            setChoosedSeat(updatedSeats);
        }
    };

    return (
        <div className="w-full grid grid-cols-5 gap-x-2 h-full max-w-5xl mx-auto pt-6">
            <SeatGroup
                capacity={capacity}
                bookedSeat={bookedSeat}
                choosedSeat={choosedSeat}
                setBookedSeat={setBookedSeat}
                handleChooseSeat={handleChooseSeat}
            />
            <DetailsBar
                flight={flight}
                setFlight={setFlight}
                choosedSeat={choosedSeat}
                handleChooseSeat={handleChooseSeat}
            />
        </div>
    );
};
export default SelectSeat;
