import { useState } from 'react';
import Datepicker from 'tailwind-datepicker-react';

const options = {
    title: 'โปรดเลือกวันที่ต้องการเดินทาง',
    autoHide: true,
    todayBtn: false,
    clearBtn: true,
    clearBtnText: 'ยกเลิกข้อมูล',
    maxDate: new Date('2030-01-01'),
    minDate: new Date('1950-01-01'),
    theme: {
        background: 'dark:bg-violet-200 rounded-xl',
        todayBtn: '',
        clearBtn: '',
        icons: '',
        text: '',
        disabledText: '',
        input: '',
        inputIcon: '',
        selected: '',
    },
    icons: {
        // () => ReactElement | JSX.Element
        prev: () => <span className=''>{'<'}</span>,
        next: () => <span>{'>'}</span>,
    },
    datepickerClassNames: "mt-2 ",
    defaultDate: new Date('2022-01-01'),
    language: 'th',
    disabledDates: [],
    weekDays: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
    inputNameProp: 'date',
    inputIdProp: 'date',
    inputPlaceholderProp: 'Select Date',
    inputDateFormatProp: {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    },
};

const DatePicker = () => {
    const [show, setShow] = useState<boolean>(false);
    const [selectedDate, setSelectedDate] = useState<Date>(null || null);
    const handleChange = (selectedDate: Date) => {
        setSelectedDate(selectedDate);
        console.log(selectedDate);
    };
    const handleClose = (state: boolean) => {
        setShow(state);
    };
    return (
        <div className='relative'>
            <Datepicker
                options={options}
                onChange={handleChange}
                show={show}
                setShow={handleClose}
                classNames=""
            >
                <div className="...">
                    <div className="...">
                    </div>
                    <input
                        type="text"
                        className="w-full p-3 rounded-lg border border-slate-300 outline-none focus:border-violet-200 transition-all duration-100 ease-linear"
                        placeholder="Select Date"
                        value={selectedDate}
                        onFocus={() => setShow(true)}
                        readOnly
                    />
                </div>
            </Datepicker>
        </div>
    );
};
export default DatePicker;
