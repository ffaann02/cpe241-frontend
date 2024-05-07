import { FaUser } from 'react-icons/fa';
const SelectedSeat = ({ index, size }: { index: number; size?: number }) => {
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

const AvailableSeat = ({ index, size }: { index: number; size?: number }) => {
    return (
        <button
            key={index}
            className={`bg-white border border-b-4 border-b-green-400 border-green-400 rounded-md flex hover:bg-green-100 
            col-span-2 ${size && `h-${size} w-${size} `}`}
        ></button>
    );
};

// const AccesibleSeat = ({ index, size }: { index: number; size?: number }) => {
//     return (
//         <button
//             key={index}
//             className={`bg-white border border-b-4 border-b-green-400 border-green-400 rounded-md flex hover:bg-green-100
//             col-span-2 ${size && `h-${size} w-${size} `}`}
//         ></button>
//     );
// };

interface SeatGroupProps {
    capacity: number;
    bookedSeat: string[];
    setBookedSeat: (seat: string[]) => void;
}

const SeatGroup: React.FC<SeatGroupProps> = ({ capacity, bookedSeat, setBookedSeat }: SeatGroupProps) => {
    const seatsPerRow = 6;
    const numberOfRows = Math.ceil(capacity / seatsPerRow);
    const seatData = Array.from({ length: numberOfRows }, (_, i) => i + 1);
    const seatLabelsLeft = ['A', 'B', 'C'];
    const seatLabelsRight = ['D', 'E', 'F'];

    return (
        <div className="col-span-2 relative">
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
                                <SelectedSeat index={-1} size={6} />
                                <p className="my-auto ml-2 text-slate-500 text-sm">จองแล้ว</p>
                            </div>
                            <div className="flex">
                                <AvailableSeat index={-1} size={6} />
                                <p className="my-auto ml-2 text-slate-500 text-sm">ว่าง</p>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-13 px-8 text-sm py-2 font-bold text-slate-500">
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
                {seatData.map((row) => (
                    <div key={row} className="grid grid-cols-13 min-h-10 gap-3 px-8">
                        {seatLabelsLeft.map((label, index) => {
                            const seatId = `${label}${row}`;
                            return bookedSeat.includes(seatId) ? (
                                <SelectedSeat index={index} />
                            ) : (
                                <AvailableSeat index={index} />
                            );
                        })}
                        <div className="col-start-7 m-auto text-neutral-400 text-sm col-span-1">{row}</div>
                        {seatLabelsRight.map((label, index) => {
                            const seatId = `${label}${row}`;
                            return bookedSeat.includes(seatId) ? (
                                <SelectedSeat index={index} />
                            ) : (
                                <AvailableSeat index={index} />
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};
export default SeatGroup;
