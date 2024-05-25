import { useContext, useEffect, useState } from 'react';
import DetailsBar from '../components/selectSeat/DetailsBar';
import SeatGroup from '../components/selectSeat/SeatGroup';
import { BookingDetailsContext } from '../context/BookingDetailsProvider';

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

    const {passengerData,setPassengerData,setStep,selectedFlight} = useContext(BookingDetailsContext);
    useEffect(()=>{
        setStep(1);
    },[])

    const handleChooseSeat = (seat: string) => {
        if (passengerData.some((s) => s.seat === seat)) {
            setPassengerData(passengerData.map((s) => (s.seat === seat ? { ...s, seat: null } : s)));
        } else {
            let seatAssigned = false;
            const updatedSeats = passengerData.map((s) => {
                if (s.seat === null && !seatAssigned) {
                    seatAssigned = true;
                    return { ...s, seat };
                } else {
                    return s;
                }
            });
            setPassengerData(updatedSeats);
        }
    };

    return (
        <div className="w-full grid grid-cols-5 gap-x-2 h-full max-w-5xl mx-auto pt-6">
            <SeatGroup
                capacity={capacity}
                bookedSeat={bookedSeat}
                setBookedSeat={setBookedSeat}
                handleChooseSeat={handleChooseSeat}
            />
            <DetailsBar
                flight={selectedFlight}
                handleChooseSeat={handleChooseSeat}
            />
        </div>
    );
};
export default SelectSeat;
