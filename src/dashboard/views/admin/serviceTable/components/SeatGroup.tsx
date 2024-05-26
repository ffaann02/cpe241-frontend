import { useContext, useState } from 'react';
import { FaUser } from 'react-icons/fa';

interface Seat {
    index: number;
    size?: number;
    number?: number;
    seatId?: string;
    handleChooseSeat?: (seat: string) => void;
}

const BookedSeat = ({ index, size, seatId }: Seat) => {
    return (
        <button
            disabled
            key={index}
            className={`bg-slate-100 border border-b-4 border-b-slate-400 border-slate-300 rounded-md flex col-span-2 
            ${size && `h-${size} w-${size} `}`}
        >
            <FaUser className={`m-auto text-slate-300 ${size && 'p-0.5'}`} />
        </button>
    );
};

const AvailableSeat = ({ index, size, seatId, handleChooseSeat }: Seat) => {
    return (
        <button
            onClick={() => handleChooseSeat(seatId)}
            key={index}
            className={`bg-white border border-b-4 border-b-green-400 border-green-400 rounded-md flex hover:bg-green-100 
            col-span-2 ${size && `h-${size} w-${size} `}`}
        ></button>
    );
};

const ChoosedSeat = ({ index, size, number, seatId, handleChooseSeat }: Seat) => {
    return (
        <button
            onClick={() => handleChooseSeat(seatId)}
            key={index}
            className={`bg-orange-300 border border-b-4 border-b-orange-400 border-orange-400 rounded-md flex 
            col-span-2 ${size && `h-${size} w-${size} `}`}
        >
            <p className="m-auto text-white font-bold pt-1">{number}</p>
        </button>
    );
};

interface SeatGroupProps {
    capacity: number;
    bookedSeat: string[];
    setBookedSeat: (seat: string[]) => void;
    handleChooseSeat: (seat: string) => void;
    chooseSeat: string[];
}

const SeatGroup: React.FC<SeatGroupProps> = ({
    capacity,
    bookedSeat,
    setBookedSeat,
    handleChooseSeat,
    chooseSeat,
}: SeatGroupProps) => {
    const seatsPerRow = 6;
    const numberOfRows = Math.ceil(capacity / seatsPerRow);
    const seatData = Array.from({ length: numberOfRows }, (_, i) => i + 1);
    const seatLabelsLeft = ['A', 'B', 'C'];
    const seatLabelsRight = ['D', 'E', 'F'];

    const [passengerData, setPassengerData] = useState([]);

    return (
        <div className="col-span-2 relative border rounded-xl">
            <div
                className="w-full bg-neutral-50 pb-10 flex flex-col gap-y-2 rounded-xl rounded-r-0 border border-r-0
            relative overflow-y-scroll h-[90vh]"
            >
                <div className="sticky top-0 bg-white border-b drop-shadow-sm">
                    <div className="w-full text-center px-6 pt-4">
                        <div className="">
                            <p className="text-lg font-semibold text-slate-500">โปรดเลือกที่นั่งที่ต้องการ</p>
                        </div>
                        <div className="flex gap-x-4 pt-2">
                            <div className="flex">
                                <BookedSeat index={-1} size={6} />
                                <p className="my-auto ml-2 text-slate-500 text-sm">จองแล้ว</p>
                            </div>
                            <div className="flex">
                                <AvailableSeat index={-1} size={6} />
                                <p className="my-auto ml-2 text-slate-500 text-sm">ว่าง</p>
                            </div>
                            <div className="flex">
                                <ChoosedSeat index={-1} size={6} />
                                <p className="my-auto ml-2 text-slate-500 text-sm">คุณเลือก</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-13 px-0.5 text-sm py-2 font-bold text-slate-500">
                            {seatLabelsLeft.map((label, index) => (
                                <div className="text-center col-span-2">
                                    <p>{label}</p>
                                </div>
                            ))}
                            <div className="text-center col-span-1 text-xs my-auto">
                                <p>แถว</p>
                            </div>
                            {seatLabelsRight.map((label, index) => (
                                <div className="text-center col-span-2">
                                    <p>{label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {seatData.map((row) => (
                    <div key={row} className="grid grid-cols-13 min-h-14 my-1 gap-3 px-8">
                        {/* Left seat labels */}
                        {seatLabelsLeft.map((label, index) => {
                            const seatId = `${label}${row}`;
                            // Check if the seat is booked
                            const isBooked = bookedSeat.includes(seatId);
                            // Check if the seat is chosen
                            const isChosen = chooseSeat.includes(seatId);

                            // Render seat component based on status
                            if (isBooked) {
                                return <BookedSeat key={`${row}-${label}`} index={index} seatId={seatId} />;
                            } else if (isChosen) {
                                return (
                                    <ChoosedSeat
                                        key={`${row}-${label}`}
                                        index={index}
                                        seatId={seatId}
                                        number={chooseSeat.indexOf(seatId) + 1}
                                        handleChooseSeat={handleChooseSeat}
                                    />
                                );
                            } else {
                                return (
                                    <AvailableSeat
                                        key={`${row}-${label}`}
                                        index={index}
                                        seatId={seatId}
                                        handleChooseSeat={handleChooseSeat}
                                    />
                                );
                            }
                        })}

                        {/* Row number */}
                        <div className="col-start-7 m-auto text-neutral-400 text-sm col-span-1">{row}</div>

                        {/* Right seat labels */}
                        {seatLabelsRight.map((label, index) => {
                            const seatId = `${label}${row}`;
                            // Check if the seat is booked
                            const isBooked = bookedSeat.includes(seatId);
                            // Check if the seat is chosen
                            const isChosen = chooseSeat.includes(seatId);

                            // Render seat component based on status
                            if (isBooked) {
                                return <BookedSeat key={`${row}-${label}`} index={index} seatId={seatId} />;
                            } else if (isChosen) {
                                return (
                                    <ChoosedSeat
                                        key={`${row}-${label}`}
                                        index={index}
                                        seatId={seatId}
                                        number={chooseSeat.indexOf(seatId) + 1}
                                        handleChooseSeat={handleChooseSeat}
                                    />
                                );
                            } else {
                                return (
                                    <AvailableSeat
                                        key={`${row}-${label}`}
                                        index={index}
                                        seatId={seatId}
                                        handleChooseSeat={handleChooseSeat}
                                    />
                                );
                            }
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};
export default SeatGroup;
