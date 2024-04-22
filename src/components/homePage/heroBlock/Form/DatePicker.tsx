import { useState } from 'react';
import Datepicker from 'react-tailwindcss-datepicker';
import { MdOutlineDateRange } from "react-icons/md";

export const DatePicker: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<any>({
        startDate: '',
        endDate: '',
    });
    const [isPickingDate, setIsPickingDate] = useState<boolean>(false);

    // Function to format the date in Thai format: วันที่ เดือน ปีพ.ศ.
    const formatThaiDate = (date: string): string => {
        if (!date) return null;
        const thaiMonths = [
            'มกราคม',
            'กุมภาพันธ์',
            'มีนาคม',
            'เมษายน',
            'พฤษภาคม',
            'มิถุนายน',
            'กรกฎาคม',
            'สิงหาคม',
            'กันยายน',
            'ตุลาคม',
            'พฤศจิกายน',
            'ธันวาคม',
        ];
        const thaiYearOffset = 543;
        const [year, month, day] = date.slice(0, 10).split('-');

        const thaiYear = Number(year) + thaiYearOffset;
        const thaiMonth = thaiMonths[Number(month) - 1];
        const thaiDay = Number(day);

        return `${thaiDay} ${thaiMonth} ${thaiYear}`;
    };

    const handleDateChange = (value: any) => {
        setSelectedDate(value);
    };

    return (
        <div
            id="datepicker"
            className="relative"
            onFocus={() => {
                setIsPickingDate(true);
            }}
            onMouseEnter={() => {
                setIsPickingDate(true);
            }}
            onMouseLeave={() => {
                setIsPickingDate(false);
            }}
        >
            <Datepicker
                separator="-"
                primaryColor={'blue'}
                placeholder="โปรดเลือกวันที่ต้องการเดินทาง"
                value={selectedDate}
                asSingle={true}
                displayFormat={'DD/MM/YYYY'}
                popoverDirection={'down' as any}
                inputClassName={
                    'p-3 opacity-0 z-[50] text-slate-500 placeholder:text-sm w-full rounded-lg border border-slate-300 outline-none focus:border-violet-200 transition-all duration-100 ease-linear'
                }
                onChange={handleDateChange}
                readOnly
            />
            <div>
                <input
                    className={`w-full absolute -z-50 top-0 p-3 pl-10 text-slate-500 placeholder:text-sm rounded-lg border 
                border-slate-300 outline-none ${isPickingDate && 'border-violet-200'} transition-all duration-100 ease-linear`}
                    placeholder="โปรดเลือกวันที่ต้องการเดินทาง"
                    value={formatThaiDate(selectedDate.startDate)}
                    readOnly
                />
                <MdOutlineDateRange className="absolute top-1/3 left-4"/>
            </div>
        </div>
    );
};
