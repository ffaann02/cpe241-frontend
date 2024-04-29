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
}

interface FlightCardProps {
    flight: FlightData;
}

const FlightCartCard: React.FC<FlightCardProps> = ({ flight }) => {
    const {
        airlineIcon,
        airline,
        flightNumber,
        FlightTime,
        departureTime,
        arrivalTime,
        duration,
        destination,
        subtotal,
    } = flight;
    return (
        <div className="float-right mr-4 w-full max-w-md mt-2">
            <div
                className="bg-white justify-between drop-shadow-sm px-3 py-1 border border-slate-200 
            rounded-xl divide-y divide-border-slate-200"
            >
                <div className="flex justify-between px-2 py-3">
                    <div className="flex">
                        <img src={airlineIcon} alt={airline} className="w-10 mr-2 mt-1 mb-auto" />
                        <div className="flex flex-col mt-0 mb-auto">
                            <h2 className="text-lg text-royal-blue-800 font-semibold">{airline}</h2>
                            <p className="text-slate-400">{flightNumber}</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-end gap-y-1">
                        <p>{FlightTime}</p>
                        <p>
                            {departureTime} - {arrivalTime}
                        </p>
                        <p className="text-slate-400">
                            {duration} in {destination}
                        </p>
                    </div>
                </div>
                <div className="flex justify-between px-2 py-3">
                    <div className="flex">
                        <img src={airlineIcon} alt={airline} className="w-10 mr-2 mt-1 mb-auto" />
                        <div className="flex flex-col mt-0 mb-auto">
                            <h2 className="text-lg text-royal-blue-800 font-semibold">{airline}</h2>
                            <p className="text-slate-400">{flightNumber}</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-end gap-y-1">
                        <p>{FlightTime}</p>
                        <p>
                            {departureTime} - {arrivalTime}
                        </p>
                        <p className="text-slate-400">
                            {duration} in {destination}
                        </p>
                    </div>
                </div>
            </div>
            <div className="gap-x-10 mt-1 gap-y-1 py-2 font-semibold w-full items-end flex flex-col text-slate-500">
                <div className="w-1/2 grid grid-cols-2">
                    <p className="text-right">ราคาย่อย</p>
                    <p className="text-right">${subtotal}</p>
                </div>
                <div className="w-1/2 grid grid-cols-2">
                    <p className="text-right">ภาษี</p>
                    <p className="text-right">${subtotal * 0.24}</p>
                </div>
                {subtotal && (
                    <div className="w-1/2 grid grid-cols-2">
                        <p className="text-right">ราคาสุทธิ</p>
                        <p className="text-right">${subtotal * 1.24}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FlightCartCard;
