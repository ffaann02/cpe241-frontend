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
        <div className="float-right mr-4 w-full max-w-md">
            <div className="bg-slate-50 justify-between p-2 border border-gray-300 rounded-xl divide-y divide-gray-300">
                <div className="bg-slate-50 flex justify-between p-4  rounded-xl">
                    <div className="flex items-center">
                        <img src={airlineIcon} alt={airline} className="h-8 mr-2" />
                        <div className="flex flex-col">
                            <h2 className="text-lg font-semibold">{airline}</h2>
                            <p className="text-black text-opacity-50 font-semibold">{flightNumber}</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-end font-semibold">
                        <p>{FlightTime}</p>
                        <p>
                            {departureTime} - {arrivalTime}
                        </p>
                        <p className="text-black text-opacity-50 font-semibold">
                            {duration} in {destination}
                        </p>
                    </div>
                </div>
                <div className="bg-slate-50 flex justify-between p-4">
                    <div className="flex items-center">
                        <img src={airlineIcon} alt={airline} className="h-8 mr-2" />
                        <div className="flex flex-col">
                            <h2 className="text-lg font-semibold">{airline}</h2>
                            <p className="text-black text-opacity-50 font-semibold">{flightNumber}</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-end font-semibold">
                        <p>{FlightTime}</p>
                        <p>
                            {departureTime} - {arrivalTime}
                        </p>
                        <p className="text-black text-opacity-50 font-semibold">
                            {duration} in {destination}
                        </p>
                    </div>
                </div>
            </div>
            <div className="mt-3 grid-cols-3 grid gap-2 font-semibold">
                <div className="col-end-4 w-full flex items-center justify-between text-[#27273F] text-sm sm:text-base">
                    <p>ผลรวมย่อย</p>
                    <p>${subtotal}</p>
                </div>
                <div className="col-end-4 w-full flex items-center justify-between text-[#27273F] text-sm sm:text-base">
                    <p>ภาษี</p>
                    <p>${subtotal * 0.24}</p>
                </div>
                {/* Render the total only once */}
                {subtotal && (
                    <div className="col-end-4 w-full flex items-center justify-between text-[#27273F] text-sm sm:text-base">
                        <p>ผลรวมสุทธิ</p>
                        <p>${subtotal * 1.24}</p>
                    </div>
                )}
            </div>
        </div>

    );
};

export default FlightCartCard;