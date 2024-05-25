import { useEffect, useState } from 'react';
import FlightCartData from '../components/card/FlightCartConfirm';
import fakeFlightData from '../data/fakeFlightData.json';
import RecommendedTripCard from '../components/card/RecommendedTripCard';
import { MdFlightTakeoff } from 'react-icons/md';
import { Input } from '@chakra-ui/react';
import { Link, useParams } from 'react-router-dom';
import axiosPrivate from '../api/axios';
export default function Confirm() {
    const { bookingID } = useParams<{ bookingID: string }>();

    const [emailInputs, setEmailInputs] = useState<{ id: number; value: string }[]>([{ id: Date.now(), value: '' }]);
    const [flightTypeTrip, setFlightTypeTrip] = useState(false);
    const handleAddEmail = () => {
        setEmailInputs([...emailInputs, { id: Date.now(), value: '' }]);
    };
    const handleEmailChange = (id: number, value: string) => {
        setEmailInputs(emailInputs.map((input) => (input.id === id ? { ...input, value } : input)));
    };
    const handleSubmitEmail = () => {
        // Handle form submission logic here
        console.log(
            'Submitted emails:',
            emailInputs.map((input) => input.value)
        );
    };
    const departingFlightCost = 251.5;
    const arrivalTimeCost = 251.5;
    const baggageFeesCost = 251.5;
    const seatUpgradeCost = 251.5;
    const taxes = 1.094;
    const subtotal = departingFlightCost + arrivalTimeCost + baggageFeesCost + seatUpgradeCost;
    const totalAmountPaid = subtotal * taxes;
    const [confirmFlight, setConfirmFlight] = useState<any>([]);
    useEffect(() => {
        const getBookingDetails = async () => {
            const response = await axiosPrivate.get(`/api/booking/${bookingID}`);
            console.log(response.data);
            setConfirmFlight(response.data);
        };
        getBookingDetails();
    }, []);

    return (
        <>
            {bookingID && confirmFlight.length > 0 && (
                <section className="p-8 grid grid-cols-10 mx-20 gap-x-10">
                    <section className="mx-4 col-span-7 pr-20">
                        <h1 className="text-3xl mb-4 font-bold text-royal-blue-500">การจองเที่ยวบินสำเร็จ</h1>

                        <h1 className="flex justify-between p-4 rounded-xl bg-royal-blue-100 text-royal-blue-600 border-2 border-royal-blue-600">
                            หมายเลขการจองเที่ยวบินของคุณคือ {bookingID}
                        </h1>
                        <div className="border p-6 rounded-lg mt-4">
                            <p>รายละเอียดเที่ยวบิน</p>
                            <div className="px-4 py-2 border bg-slate-50 rounded-md">
                                <p className="text-lg text-royal-blue-800 mb-1 flex">
                                    <MdFlightTakeoff className="mr-2 text-xl text-orange-400" /> เที่ยวบิน{' '}
                                    {confirmFlight[0].flightNo}
                                </p>
                                <div className="grid grid-cols-2 divide-x">
                                    <div className="col-span-1">
                                        <p className="text-sm text-slate-500">จาก</p>
                                        <h1 className="text-lg text-royal-blue-600">
                                            {confirmFlight[0].departureCity} ({confirmFlight[0].departureIATACode})
                                        </h1>
                                        <h1 className="text-sm text-royal-blue-600">
                                            {new Date(confirmFlight[0].departureDateTime).toLocaleDateString('th-TH', {
                                                weekday: 'long',
                                                day: 'numeric',
                                                month: 'long',
                                            })}{' '}
                                            เวลา{' '}
                                            {new Date(confirmFlight[0].departureDateTime).toLocaleTimeString('th-TH')}
                                        </h1>
                                    </div>
                                    <div className="col-span-1 pl-4">
                                        <p className="text-sm text-slate-500">ไป</p>
                                        <h1 className="text-lg text-royal-blue-600">
                                            {confirmFlight[0].arrivalCity} ({confirmFlight[0].arrivalIATACode})
                                        </h1>
                                        <h1 className="text-sm text-royal-blue-600">
                                            {new Date(confirmFlight[0].arrivalDateTime).toLocaleDateString('th-TH', {
                                                weekday: 'long',
                                                day: 'numeric',
                                                month: 'long',
                                            })}{' '}
                                            เวลา{' '}
                                            {new Date(confirmFlight[0].arrivalDateTime).toLocaleTimeString('th-TH')}
                                        </h1>
                                    </div>
                                </div>
                            </div>
                            <p className="mt-4">ข้อมูลตั๋ว</p>
                            <div className="flex flex-col gap-y-4">
                                {confirmFlight.map((flight, index) => (
                                    <div className="border rounded-md py-2">
                                        <div className="grid grid-cols-2 px-6 text-slate-500">
                                            <p className="text-sm">ผู้โดยสาร</p>
                                            <p className="text-sm">ที่นั่ง</p>
                                        </div>
                                        <div className="w-full mt-2 px-6 grid grid-cols-2 text-royal-blue-800">
                                            <p>
                                                {flight.firstName} {flight.lastName}
                                            </p>
                                            <p>{flight.seatNumber}</p>
                                            <p className="text-sm">น้ำหนักสัมภาระ {flight.luggageWeight} กิโลกรัม</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm mt-1 text-slate-500">
                                รายละเอียดตั๋วเพิ่มเติมได้ถูกส่งไปยัง {confirmFlight[0].email} แล้ว
                            </p>
                            <p className="mt-4">รายละเอียดการชำระเงิน</p>
                            <div className="border rounded-md p-2">
                                <div className="px-4 text-royal-blue-800 flex flex-col gap-y-2">
                                    <div className="flex justify-between">
                                        <p>หมายเลขยืนยันการชำระเงิน:</p>
                                        <p>{confirmFlight[0].paymentID}</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p>วันที่ชำระเงิน: </p>
                                        <p>{confirmFlight[0].paymentDateTime}</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p>ยอดรวมสุทธิ: </p>
                                        <p>{confirmFlight[0].price}</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p>ชำระเงินผ่านบัตรเครดิต: </p>
                                        <p>{confirmFlight[0].cardNumber}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-x-2 mt-2 justify-end">
                            <Link to="/">
                                <button
                                    className="px-4 py-3 rounded-lg border bg-slate-50 hover:bg-slate-200
                            border-slate-300 text-slate-500"
                                >
                                    กลับไปหน้าหลัก
                                </button>
                            </Link>
                            <Link to="/mybooking">
                                <button
                                    className="px-4 py-3 rounded-lg border border-royal-blue-400 
                            text-royal-blue-600 hover:bg-royal-blue-100"
                                >
                                    การจองของฉัน
                                </button>
                            </Link>
                        </div>
                    </section>
                    <section className="col-span-3">
                        <p className="mt-8 mb-4 text-royal-blue-600 text-2xl font-bold">ที่พักแนะนำ</p>
                        <p className="text-black text-opacity-40">
                            ค้นหาที่พักที่ดีที่สุดในเมืองที่คุณกำลังเดินทางไป และเพิ่มความสะดวกสบายในการเดินทางด้วย
                        </p>
                        <RecommendedTripCard />
                    </section>
                </section>
            )}
        </>
    );
}
