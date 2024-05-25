import { Tabs, TabList, TabPanels, Tab, TabPanel, Input, Button } from '@chakra-ui/react';
import { useState } from 'react';
import SeatGroup from './components/SeatGroup';
import axiosPrivate from '../../../../api/axios';
import { MdFlightTakeoff } from 'react-icons/md';

const ServiceTable = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const [bookingID, setBookingID] = useState('');
    const [bookingData, setBookingData] = useState(null);
    const [capacity, setCapacity] = useState<number>(160);

    const handleTabsChange = (index: number) => {
        console.log(index);
        setTabIndex(index);
    };

    const handleSearch = async () => {
        console.log(bookingID);
        try {
            const response = await axiosPrivate.get(`/api/booking/${bookingID}`);
            console.log(response.data);
            setBookingData(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    const [bookedSeat, setBookedSeat] = useState<string[]>(
        Array.from({ length: capacity / 2 }, (_, i) => {
            const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
            const randomLetter = letters[Math.floor(Math.random() * letters.length)];
            return `${randomLetter}${i + 1}`;
        })
    );
    const [chooseSeat, setChooseSeat] = useState<string[]>([]);

    const handleChooseSeat = (seat: string) => {
        console.log(chooseSeat);
        console.log(seat);
        if (chooseSeat.includes(seat)) {
            setChooseSeat(chooseSeat.filter((s) => s !== seat));
        } else {
            setChooseSeat([...chooseSeat, seat]);
        }
    };

    const [passengerData, setPassengerData] = useState([]);
    const handleCheckIn = async () => {
        console.log('Check in');
    };

    return (
        <div className="bg-white w-full mt-3 rounded-md px-10 py-6">
            <div>
                <Tabs index={tabIndex} onChange={handleTabsChange}>
                    <TabList>
                        <Tab>เช็คอินเที่ยวบิน</Tab>
                        <Tab>ซื้อตั๋วหน้าเคาท์เตอร์</Tab>
                        <Tab>ประกาศ Final Call</Tab>
                    </TabList>

                    <TabPanels className="px-0">
                        <TabPanel paddingX={0}>
                            <div className="">
                                <label>ค้นหาหมายเลขการจอง</label>
                                <div className="flex gap-x-2">
                                    <Input
                                        type="text"
                                        value={bookingID}
                                        onChange={(e) => setBookingID(e.target.value)}
                                        placeholder="Booking ID"
                                    />
                                    <Button onClick={handleSearch}>ค้นหา</Button>
                                </div>
                                {bookingData.length > 0 ? (
                                    <div>
                                        <p className="mt-4 text-lg">รายละเอียดการจอง</p>
                                        <div className="grid grid-cols-5 gap-x-4">
                                            <div className="border-2 rounded-lg px-4 py-3 col-span-3 h-fit">
                                                <div className="">
                                                    <p>รายละเอียดเที่ยวบิน</p>
                                                    <div className="px-4 py-2 border bg-slate-50 rounded-md">
                                                        <p className="text-lg text-royal-blue-800 mb-1 flex">
                                                            <MdFlightTakeoff className="mr-2 text-xl text-orange-400" />{' '}
                                                            เที่ยวบิน {bookingData[0].flightNo}
                                                        </p>
                                                        <div className="grid grid-cols-2 divide-x">
                                                            <div className="col-span-1">
                                                                <p className="text-sm text-slate-500">จาก</p>
                                                                <h1 className="text-lg text-royal-blue-600">
                                                                    {bookingData[0].departureCity} (
                                                                    {bookingData[0].departureIATACode})
                                                                </h1>
                                                                <h1 className="text-sm text-royal-blue-600">
                                                                    {new Date(
                                                                        bookingData[0].departureDateTime
                                                                    ).toLocaleDateString('th-TH', {
                                                                        weekday: 'long',
                                                                        day: 'numeric',
                                                                        month: 'long',
                                                                    })}{' '}
                                                                    เวลา{' '}
                                                                    {new Date(
                                                                        bookingData[0].departureDateTime
                                                                    ).toLocaleTimeString('th-TH')}
                                                                </h1>
                                                            </div>
                                                            <div className="col-span-1 pl-4">
                                                                <p className="text-sm text-slate-500">ไป</p>
                                                                <h1 className="text-lg text-royal-blue-600">
                                                                    {bookingData[0].arrivalCity} (
                                                                    {bookingData[0].arrivalIATACode})
                                                                </h1>
                                                                <h1 className="text-sm text-royal-blue-600">
                                                                    {new Date(
                                                                        bookingData[0].arrivalDateTime
                                                                    ).toLocaleDateString('th-TH', {
                                                                        weekday: 'long',
                                                                        day: 'numeric',
                                                                        month: 'long',
                                                                    })}{' '}
                                                                    เวลา{' '}
                                                                    {new Date(
                                                                        bookingData[0].arrivalDateTime
                                                                    ).toLocaleTimeString('th-TH')}
                                                                </h1>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <p className="mt-4">ข้อมูลตั๋ว</p>
                                                    <div className="flex flex-col gap-y-4">
                                                        {bookingData.map((flight, index) => (
                                                            <div className="border rounded-md py-2">
                                                                <div className="grid grid-cols-2 px-6 text-slate-500">
                                                                    <p className="text-sm">ผู้โดยสาร</p>
                                                                    <p className="text-sm">ที่นั่ง</p>
                                                                </div>
                                                                <div className="w-full mt-2 px-6 grid grid-cols-2 text-royal-blue-800">
                                                                    <p>
                                                                        {flight.firstName} {flight.lastName}
                                                                    </p>
                                                                    <p>{chooseSeat[index] ? chooseSeat[index] : '-'}</p>
                                                                    <p className="text-sm">
                                                                        น้ำหนักสัมภาระ {flight.luggageWeight} กิโลกรัม
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div className="flex gap-x-2 mt-2 justify-end">
                                                        <button
                                                            className="px-4 py-3 rounded-lg border bg-slate-50 hover:bg-slate-200
                            border-slate-300 text-slate-500"
                                                        >
                                                            ยกเลิก
                                                        </button>
                                                        <button
                                                            className="px-4 py-3 rounded-lg border border-royal-blue-400 
                            text-royal-blue-600 hover:bg-royal-blue-100"
                                                            onClick={handleCheckIn}
                                                        >
                                                            เช็คอินผู้โดยสาร
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <SeatGroup
                                                capacity={160}
                                                bookedSeat={bookedSeat}
                                                setBookedSeat={setBookedSeat}
                                                handleChooseSeat={handleChooseSeat}
                                                chooseSeat={chooseSeat}
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center mt-10 text-2xl text-slate-400">
                                        ค้นหาข้อมูลการจอง เพื่อเช็คอินเที่ยวบิน
                                    </div>
                                )}
                            </div>
                        </TabPanel>
                        <TabPanel></TabPanel>
                        <TabPanel>
                            <p>three!</p>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </div>
        </div>
    );
};
export default ServiceTable;
