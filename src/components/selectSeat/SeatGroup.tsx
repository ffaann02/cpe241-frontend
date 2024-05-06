const SeatGroup = () => {
    const seatData = Array.from({ length: 10 }, (_, i) => i + 1);
    const seatLabelsLeft = ['A', 'B', 'C'];
    const seatLabelsRight = ['D', 'E', 'F'];

    return (
        <div>
            <div className="w-full bg-neutral-100 pt-6 py-20 px-4 h-full flex flex-col gap-y-2">
                <div className="w-full bg-royal-blue-100 px-3 py-2 text-center rounded-md border border-royal-blue-200">
                    <p className="mt-1">โปรดเลือกที่นั่งที่ต้องการ</p>
                </div>
                {seatData.map((row) => (
                    <div key={row} className="grid grid-cols-7 min-h-16 gap-2">
                        {seatLabelsLeft.map((label, index) => (
                            <div key={index} className="bg-royal-blue-100 border border-royal-blue-200 rounded-lg flex">
                                <p className="m-auto text-xl font-bold text-royal-blue-600">{label}</p>
                            </div>
                        ))}
                        <div className="col-start-4 m-auto text-neutral-400 text-xl font-semibold">{row}</div>
                        {seatLabelsRight.map((label, index) => (
                            <div key={index} className="bg-royal-blue-100 border border-royal-blue-200 rounded-lg flex">
                                <p className="m-auto text-xl font-bold text-royal-blue-600">{label}</p>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};
export default SeatGroup;