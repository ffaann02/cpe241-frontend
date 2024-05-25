import React from 'react';
import { Flight } from '../../pages/Search';
import { formatDuration } from '../../utils/timeFormat';

interface FlightCardProps {
    flight: any;
    price: number;
}

const FlightCartCard: React.FC<FlightCardProps> = ({ flight, price }) => {
    const {
        airlineName,
        airlineIcon,
        flightNo,
        departureTime,
        arrivalTime,
        duration,
        destination,
        from,
        subtotal,
        departureCity,
        arrivalCity,
    } = flight;
    return (
        <div className="float-right mr-4 w-full max-w-md mt-2">
            <div
                className="bg-white justify-between drop-shadow-sm px-3 py-1 border border-slate-200 
            rounded-xl divide-y divide-border-slate-200"
            >
                {/* <div className="flex justify-between px-2 py-3">
                    <div className="flex">
                        <img src={airlineIcon} alt={airlineName} className="w-10 mr-2 mt-1 mb-auto" />
                        <div className="flex flex-col mt-0 mb-auto">
                            <h2 className="text-lg text-royal-blue-600 font-semibold">{airlineName}</h2>
                            <p className="text-slate-400">{flightNo}</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-end gap-y-1">
                        <p>{2}</p>
                        <p>
                            {departureTime} - {arrivalTime}
                        </p>
                    </div>
                </div> */}
                <div className="flex flex-col">
                    <div className="flex justify-between px-2 py-3">
                        <div className="flex">
                            <img src={airlineIcon} alt={airlineName} className="w-10 mr-2 mt-1 mb-auto" />
                            <div className="flex flex-col mt-0 mb-auto">
                                <h2 className="text-lg text-royal-blue-600 font-semibold">{airlineName}</h2>
                                <p className="text-slate-400">{flightNo}</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-end gap-y-1">
                            <p>{formatDuration(parseInt(duration))}</p>
                            <p>
                                {departureTime} - {arrivalTime}
                            </p>
                        </div>
                    </div>
                    <div className='pl-2 pb-2 flex gap-x-4'>
                        <p className="text-sm">
                            {departureCity} ({from})
                        </p>
                        <div className='border-t-2 w-6 border-t-royal-blue-300 mt-2'>

                        </div>
                        <p className="text-sm">
                            {arrivalCity} ({destination})
                        </p>
                    </div>
                </div>
            </div>
            <div className="gap-x-10 mt-1 gap-y-1 py-2 font-semibold w-full items-end flex flex-col text-slate-500">
                <div className="w-1/2 grid grid-cols-2">
                    <p className="text-right">ราคาย่อย</p>
                    <p className="text-right">฿{price.toFixed(2)}</p>
                </div>
                <div className="w-1/2 grid grid-cols-2">
                    <p className="text-right">ภาษี</p>
                    <p className="text-right">฿{(price * 0.02).toFixed(2)}</p>
                </div>
                {subtotal && (
                    <div className="w-1/2 grid grid-cols-2">
                        <p className="text-right">ราคาสุทธิ</p>
                        <p className="text-right">฿{(subtotal * 4.11 * 1.02).toFixed(2)}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FlightCartCard;
