import React from 'react';


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
}interface FlightCardProps {
    flight: FlightData;
}

const FlightCartCard: React.FC<FlightCardProps> = ({ flight }) => {
    const { airlineIcon, airline, flightNumber, FlightTime, departureTime, arrivalTime, duration, destination, subtotal } = flight;
    return (
        <div>
            <h1 className="text-xl text-black text-opacity-50 font-semibold mt-5 mb-5">Departing Date...?</h1>
            <div className="bg-slate-50 justify-between border-2 border-gray-300 rounded-lg">
                <div className="bg-slate-50 justify-between p-2 rounded-xl grid grid-cols-4 gap-4">
                    <div className="flex items-center">
                        <img src={airlineIcon} alt={airline} className="h-8 mr-2" />
                        <div className="flex flex-col">
                            <p className="text-black font-semibold">{FlightTime}</p>
                            <h2 className="text-black text-opacity-50 font-semibold">{airline}</h2>
                        </div>
                    </div>
                    <div className="flex flex-col items-end font-semibold">
                        <p>
                            {departureTime} - {arrivalTime}
                        </p>
                        <p className="text-black text-opacity-50 font-semibold">
                            value
                        </p>
                    </div>
                    <div className="flex flex-col items-end font-semibold">
                        <p>{flightNumber}</p>
                        <p className="text-black text-opacity-50 font-semibold">
                            {duration} in {destination}
                        </p>
                    </div>
                    <div className="flex flex-col items-end font-semibold">
                        <p>${subtotal * 1.24}</p>
                        <p className="text-black text-opacity-50 font-semibold">
                            round trip
                        </p>
                    </div>
                </div>
            </div>
            <h2 className="text-black text-opacity-40 mt-2 font-medium">Seat 9F (economy, window), 1 checked bag</h2>

            <h1 className="text-[#6E7491] text-2xl font-semibold mt-7 mb-3">Price breakdown</h1>

            
        </div>
    );
};

export default FlightCartCard;