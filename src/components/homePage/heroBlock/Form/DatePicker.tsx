import { useState } from 'react';
import Datepicker from 'react-tailwindcss-datepicker';
import { MdOutlineDateRange } from 'react-icons/md';
import { Flex, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';

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
            // onMouseEnter={() => {
            //     setIsPickingDate(true);
            // }}
            onMouseLeave={() => {
                setIsPickingDate(false);
            }}
        >
            <p className="text-slate-500 text-sm ml-0.5 mb-0.5">วันที่เดินทาง</p>
            <Datepicker
                separator="-"
                primaryColor={'blue'}
                placeholder="โปรดเลือกวันที่ต้องการเดินทาง"
                value={selectedDate}
                asSingle={true}
                displayFormat={'DD/MM/YYYY'}
                popoverDirection={'down' as any}
                inputClassName={
                    'p-3 z-[50] opacity-0 w-full'
                }
                onChange={handleDateChange}
                readOnly
            />
            <div>
                <Flex className='absolute w-full top-0 mt-[1.35rem] -z-50'>
                    <InputGroup
                        className={`text-slate-500 bg-white placeholder:text-sm
                        rounded-md ${isPickingDate && 'drop-shadow-md'} transition-all duration-100 ease-linear`}
                    >
                        <InputLeftElement pointerEvents="none" className="mt-1 ml-0.5">
                            <span className="text-royal-blue-600 text-xl ml-3">
                                <MdOutlineDateRange className="" />
                            </span>
                        </InputLeftElement>
                        <Input
                            size="lg"
                            focusBorderColor="purple.200"
                            type="text"
                            className="placeholder:text-sm text-slate-500 pt-0.5"
                            placeholder="โปรดเลือกวันที่ต้องการเดินทาง"
                            value={selectedDate.startDate ? formatThaiDate(selectedDate.startDate) : ''}
                        />
                    </InputGroup>
                </Flex>
            </div>
        </div>
    );
};
