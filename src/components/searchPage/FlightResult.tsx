import { FlightCard } from './flightResult/FlightCard';
import fakeFlightData from '../../data/fakeFlightData.json';

export interface FlightData {
    airlineIcon: string;
    airline: string;
    flightNumber: string;
    FlightTime: string;
    departureTime: string;
    arrivalTime: string;
    duration: string;
    destination: string;
    subtotal: number;
}

const FlightResult = () => {
    return (
        <div className="col-span-9 flex flex-col gap-y-3">
            {fakeFlightData.map((flight,index) => (
                <div key={index}>
                    <FlightCard flight={flight}/>
                </div>
            ))}
        </div>
    );
};
export default FlightResult;
