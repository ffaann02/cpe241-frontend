import { useEffect, useState } from 'react';
import { FormHelperText, Select, Textarea } from '@chakra-ui/react';
import { Link, useParams } from 'react-router-dom';
import { Checkbox, CheckboxGroup, FormControl, FormLabel, FormErrorMessage, Input, VStack } from '@chakra-ui/react';
import axiosPrivate from '../api/axios';
import { formatDuration } from '../utils/timeFormat';

export default function CancelBooking() {
    const [selectedReasons, setSelectedReasons] = useState([]);
    const [isOtherSelected, setIsOtherSelected] = useState(false);
    const [customReason, setCustomReason] = useState('');
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [selectedBank, setSelectedBank] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [isAccountNumberValid, setIsAccountNumberValid] = useState(true);
    const [accountNumberTouched, setAccountNumberTouched] = useState(false);
    const [bookingData, setBookingData] = useState<any>([]);
    const { bookingID } = useParams();
    useEffect(() => {
        const getBookingData = async () => {
            const response = await axiosPrivate.get(`/api/booking/${bookingID}`);
            console.log(response.data);
            setBookingData(response.data);
        };
        getBookingData();
    }, []);

    const bankList = ['กรุงเทพ (BBL)', 'กสิกรไทย (KBANK)', 'กรุงไทย (KTB)', 'ไทยพาณิชย์ (SCB)', 'กรุงศรีอยุธยา (BAY)'];

    const handleSelectedReasonsChange = (values) => {
        const isOtherSelected = values.includes('อื่นๆ');
        if (values.length > 1) {
            setSelectedReasons([values[values.length - 1]]);
        } else {
            setSelectedReasons(values);
        }
        setIsOtherSelected(isOtherSelected);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'selectedBank') {
            setSelectedBank(value);
        } else if (name === 'accountNumber') {
            setAccountNumber(value);
            setIsAccountNumberValid(validateAccountNumber(value));
        }
    };

    const validateAccountNumber = (value) => {
        const isValid = /^\d{10}$/.test(value);
        return isValid;
    };

    const handleBlur = () => {
        setAccountNumberTouched(true);
    };

    const isCancellationButtonDisabled = () => {
        if (
            (selectedReasons.includes('อื่นๆ') && customReason.trim() === '') ||
            selectedReasons.length === 0 ||
            !selectedBank ||
            (!isAccountNumberValid && accountNumberTouched)
        ) {
            return true;
        } else {
            return false;
        }
    };

    const handleCancelConfirmation = async () => {
        console.log('Flight cancelled successfully!');
        console.log('Selected Reasons:', selectedReasons);
        console.log('Custom Reason:', customReason);
        console.log('Selected Bank:', selectedBank);
        console.log('Account Number:', accountNumber);
        // const response = await axiosPrivate.post(`/api/booking/cancel`, {
        //     bookingID: bookingID,
        //     reasons: selectedReasons,
        //     customReason: customReason,
        //     bank: selectedBank,
        //     accountNumber: accountNumber
        // })
        // console.log(response);
        setShowConfirmation(false);
        setShowSuccessMessage(true);
    };

    return (
        <>
            {/* <div className="flex justify-center mt-10">
                <h1 className="font-bold text-2xl">ยกเลิกเที่ยวบิน</h1>
            </div> */}
            {bookingData.length > 0 && (
                <div className="flex justify-center mt-6">
                    <div className="border max-w-4xl w-full border-neutral-300 bg-white hover:border-royal-blue-200 p-3 rounded-lg cursor-pointer">
                        {!showSuccessMessage && (
                            <h1 className="font-semibold text-2xl text-center mt-2 text-slate-500">
                                ยกเลิกการจองเที่ยวบิน
                            </h1>
                        )}
                        <div className={`px-4 border-b pb-2 mt-2 ${!showSuccessMessage ? 'block' : 'hidden'}`}>
                            <div className="flex flex-col">
                                <div className="mx-auto">
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/Hawaiian_Airlines_logo_2017.svg/800px-Hawaiian_Airlines_logo_2017.svg.png"
                                        className="w-12 h-12 mx-auto"
                                    />
                                    <p className="text-slate-600 text-xl font-semibold my-auto mt-2">
                                        {bookingData[0].airlineName}
                                    </p>
                                </div>
                                <div className="mt-4 w-full">
                                    <div className="flex w-full justify-center gap-x-44">
                                        <div>
                                            <p className="text-slate-500 font-semibold text-2xl">
                                                {new Date(bookingData[0].departureDateTime).toLocaleTimeString(
                                                    'en-GB',
                                                    {
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                    }
                                                )}
                                            </p>
                                            <div className="flex justify-between">
                                                <div className="text-sm text-royal-blue-700">
                                                    <p>
                                                        {new Date(bookingData[0].departureDateTime).toLocaleDateString(
                                                            'th-TH',
                                                            {
                                                                weekday: 'long',
                                                                day: 'numeric',
                                                                month: 'long',
                                                            }
                                                        )}
                                                    </p>
                                                    <p>
                                                        {bookingData[0].departureCity} (
                                                        {bookingData[0].departureIATACode})
                                                    </p>
                                                    <p className="text-royal-blue-700 text-sm">
                                                        {bookingData[0].arrivalAirportName}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="border-t-2 absolute w-[24%] mt-4 border-dashed border-royal-blue-300">
                                            <div className="absolute left-0 w-4 h-4 bg-royal-blue-300 -top-2.5 rounded-full"></div>
                                            <p className="absolute text-royal-blue-600 -top-5 text-sm left-1/2 transform -translate-x-1/2">
                                                {formatDuration(
                                                    (new Date(bookingData[0].arrivalDateTime).getTime() -
                                                        new Date(bookingData[0].departureDateTime).getTime()) /
                                                        1000 /
                                                        60
                                                )}
                                            </p>
                                            <div className="absolute right-0 w-4 h-4 bg-royal-blue-300 -top-2.5 rounded-full"></div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-slate-500 font-semibold text-2xl">
                                                {new Date(bookingData[0].arrivalDateTime).toLocaleTimeString('en-GB', {
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                })}
                                            </p>
                                            <div className="flex justify-between">
                                                <div className="text-sm text-royal-blue-700">
                                                    <p>
                                                        {new Date(bookingData[0].arrivalDateTime).toLocaleDateString(
                                                            'th-TH',
                                                            {
                                                                weekday: 'long',
                                                                day: 'numeric',
                                                                month: 'long',
                                                            }
                                                        )}
                                                    </p>
                                                    <p>
                                                        {bookingData[0].arrivalCity} ({bookingData[0].arrivalIATACode})
                                                    </p>
                                                    <p className="text-royal-blue-700 text-sm">
                                                        {bookingData[0].arrivalAirportName}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4 text-sm text-slate-500">
                                    <p>หมายเลขอ้างอิงการจอง: {bookingData[0].bookingID}</p>
                                </div>
                            </div>
                        </div>
                        {/* Button to trigger cancel */}
                        {!showConfirmation && !showSuccessMessage && (
                            <div className="mt-4 mx-4">
                                <FormControl>
                                    <FormLabel>เหตุผลในการยกเลิก</FormLabel>
                                    <CheckboxGroup value={selectedReasons} onChange={handleSelectedReasonsChange}>
                                        <VStack align="start" spacing={2}>
                                            <Checkbox value="เปลี่ยนแปลงแผนการเดินทาง">
                                                เปลี่ยนแปลงแผนการเดินทาง
                                            </Checkbox>
                                            <Checkbox value="ราคาของตั๋วเครื่องบินที่แพงเกินไป">
                                                ราคาของตั๋วเครื่องบินที่แพงเกินไป
                                            </Checkbox>
                                            <Checkbox value="ปัญหาด้านสุขภาพส่วนบุคคล">
                                                ปัญหาด้านสุขภาพส่วนบุคคล
                                            </Checkbox>
                                            <Checkbox value="สภาพอากาศ">สภาพอากาศ</Checkbox>
                                            <Checkbox value="ฉุกเฉินส่วนตัว">ฉุกเฉินส่วนตัว</Checkbox>
                                            <Checkbox value="ข้อจำกัดหรือข้อบังคับเกี่ยวกับการเดินทาง">
                                                ข้อจำกัดหรือข้อบังคับเกี่ยวกับการเดินทาง
                                            </Checkbox>
                                            <Checkbox value="บริการที่ไม่น่าพอใจ">บริการที่ไม่น่าพอใจ</Checkbox>
                                            <Checkbox value="อื่นๆ">อื่นๆ</Checkbox>
                                        </VStack>
                                    </CheckboxGroup>
                                </FormControl>
                                {/* Input for custom reason */}
                                {selectedReasons.includes('อื่นๆ') && (
                                    <Input
                                        placeholder="กรุณาระบุเหตุผล"
                                        mt={2}
                                        value={customReason}
                                        onChange={(e) => setCustomReason(e.target.value)}
                                    />
                                )}
                                {/* Description for selected reason */}
                                {selectedReasons.length === 1 && (
                                    <div className="mt-2">
                                        <h3 className="font-semibold">{selectedReasons}</h3>
                                        <Textarea
                                            placeholder="กรุณาอธิบายเกี่ยวกับเหตุผลที่คุณเลือก"
                                            mt={2}
                                            value={customReason}
                                            onChange={(e) => setCustomReason(e.target.value)}
                                        />
                                    </div>
                                )}
                                <div className="mt-4">
                                    <h1 className="font-bold text-md mb-2">บัญชีที่ต้องการขอเงินคืน</h1>
                                    {accountNumber && !selectedBank && (
                                        <div className="mb-2 text-red-500">โปรดระบุธนาคาร</div>
                                    )}
                                    <div className="flex gap-4">
                                        <Select
                                            name="selectedBank"
                                            value={selectedBank || ''}
                                            onChange={handleChange}
                                            placeholder="กรุณาระบุบัญชีธนาคาร"
                                        >
                                            {bankList.map((option, idx) => (
                                                <option key={idx} value={option}>
                                                    {option}
                                                </option>
                                            ))}
                                        </Select>
                                        <FormControl isInvalid={!isAccountNumberValid && accountNumberTouched}>
                                            <Input
                                                type="text"
                                                name="accountNumber"
                                                placeholder="ระบุเลขบัญชี"
                                                value={accountNumber}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {!isAccountNumberValid && accountNumberTouched && (
                                                <FormErrorMessage>
                                                    เลขบัญชีต้องประกอบด้วยตัวเลขเท่านั้นและมีความยาว 10 หลัก
                                                </FormErrorMessage>
                                            )}
                                        </FormControl>
                                    </div>
                                </div>
                                <div className="flex justify-end mt-4">
                                    <button
                                        className={`bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded ${isCancellationButtonDisabled() ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        onClick={() => setShowConfirmation(true)}
                                        disabled={isCancellationButtonDisabled()}
                                    >
                                        ยกเลิกเที่ยวบิน
                                    </button>
                                </div>
                            </div>
                        )}
                        {/* Confirmation message */}
                        {showConfirmation && (
                            <div className="mt-4">
                                <p className='ml-4 text-xl'>คุณต้องการยกเลิกเที่ยวบินนี้ใช่หรือไม่?</p>
                                <div className="flex justify-end">
                                    <button
                                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-2"
                                        onClick={handleCancelConfirmation}
                                    >
                                        ใช่, ฉันต้องการยกเลิกเที่ยวบิน
                                    </button>
                                    <button
                                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                                        onClick={() => setShowConfirmation(false)}
                                    >
                                        ยกเลิกการเปลี่ยนแปลง
                                    </button>
                                </div>
                            </div>
                        )}
                        {/* Success message */}
                        {showSuccessMessage && (
                            <div className="mt-4 flex flex-col w-full items-center">
                                <div>
                                    <img
                                        src="https://freepngimg.com/thumb/airplane/126147-flying-airplane-vector-pic-free-download-png-hd.png"
                                        className="w-96 mx-auto"
                                    />
                                    <h1 className="text-center text-2xl font-bold text-royal-blue-500">
                                        ยกเลิกการจองสำเร็จ
                                    </h1>
                                    <p className="text-center text-sm text-slate-500">
                                        เราหวังว่าคุณจะได้รับประสบการณ์ที่ดีจาก Agado
                                    </p>
                                    <p className="text-center text-sm text-royal-blue-500 mt-6">
                                        หมายเลขอ้างอิงการจอง: {bookingData[0].bookingID}
                                    </p>
                                </div>
                                <div className="mt-4 w-full">
                                    <div className="flex w-full justify-center gap-x-44">
                                        <div>
                                            <p className="text-slate-500 font-semibold text-2xl">
                                                {new Date(bookingData[0].departureDateTime).toLocaleTimeString(
                                                    'en-GB',
                                                    {
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                    }
                                                )}
                                            </p>
                                            <div className="flex justify-between">
                                                <div className="text-sm text-royal-blue-700">
                                                    <p>
                                                        {new Date(bookingData[0].departureDateTime).toLocaleDateString(
                                                            'th-TH',
                                                            {
                                                                weekday: 'long',
                                                                day: 'numeric',
                                                                month: 'long',
                                                            }
                                                        )}
                                                    </p>
                                                    <p>
                                                        {bookingData[0].departureCity} (
                                                        {bookingData[0].departureIATACode})
                                                    </p>
                                                    <p className="text-royal-blue-700 text-sm">
                                                        {bookingData[0].arrivalAirportName}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="border-t-2 absolute w-[24%] mt-4 border-dashed border-royal-blue-300">
                                            <div className="absolute left-0 w-4 h-4 bg-royal-blue-300 -top-2.5 rounded-full"></div>
                                            <p className="absolute text-royal-blue-600 -top-5 text-sm left-1/2 transform -translate-x-1/2">
                                                {formatDuration(
                                                    (new Date(bookingData[0].arrivalDateTime).getTime() -
                                                        new Date(bookingData[0].departureDateTime).getTime()) /
                                                        1000 /
                                                        60
                                                )}
                                            </p>
                                            <div className="absolute right-0 w-4 h-4 bg-royal-blue-300 -top-2.5 rounded-full"></div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-slate-500 font-semibold text-2xl">
                                                {new Date(bookingData[0].arrivalDateTime).toLocaleTimeString('en-GB', {
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                })}
                                            </p>
                                            <div className="flex justify-between">
                                                <div className="text-sm text-royal-blue-700">
                                                    <p>
                                                        {new Date(bookingData[0].arrivalDateTime).toLocaleDateString(
                                                            'th-TH',
                                                            {
                                                                weekday: 'long',
                                                                day: 'numeric',
                                                                month: 'long',
                                                            }
                                                        )}
                                                    </p>
                                                    <p>
                                                        {bookingData[0].arrivalCity} ({bookingData[0].arrivalIATACode})
                                                    </p>
                                                    <p className="text-royal-blue-700 text-sm">
                                                        {bookingData[0].arrivalAirportName}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Link to="/" className="block mt-2 text-center">
                                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                                        ค้นหาเที่ยวบินอื่น ๆ
                                    </button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
