import { useState } from 'react';
import { FormHelperText, Select, Textarea } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import {
    Checkbox,
    CheckboxGroup,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    VStack,
} from "@chakra-ui/react";

export default function CancelBooking() {
    const [selectedReasons, setSelectedReasons] = useState([]);
    const [isOtherSelected, setIsOtherSelected] = useState(false);
    const [customReason, setCustomReason] = useState("");
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [selectedBank, setSelectedBank] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [isAccountNumberValid, setIsAccountNumberValid] = useState(true);
    const [accountNumberTouched, setAccountNumberTouched] = useState(false);

    const bankList = ['กรุงเทพ (BBL)', 'กสิกรไทย (KBANK)', 'กรุงไทย (KTB)', 'ไทยพาณิชย์ (SCB)', 'กรุงศรีอยุธยา (BAY)'];

    const handleSelectedReasonsChange = (values) => {
        const isOtherSelected = values.includes("อื่นๆ");
        if (values.length > 1) {
            setSelectedReasons([values[values.length - 1]]);
        } else {
            setSelectedReasons(values);
        }
        setIsOtherSelected(isOtherSelected);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "selectedBank") {
            setSelectedBank(value);
        } else if (name === "accountNumber") {
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
            (selectedReasons.includes("อื่นๆ") && customReason.trim() === "") ||
            selectedReasons.length === 0 ||
            !selectedBank ||
            (!isAccountNumberValid && accountNumberTouched)
        ) {
            return true;
        } else {
            return false;
        }
    };

    const handleCancelConfirmation = () => {
        console.log("Flight cancelled successfully!");
        console.log("Selected Reasons:", selectedReasons);
        console.log("Custom Reason:", customReason);
        console.log("Selected Bank:", selectedBank);
        console.log("Account Number:", accountNumber);
        setShowConfirmation(false);
        setShowSuccessMessage(true);
    };    

    return (
        <>
            <div className="flex justify-center mt-10">
                <h1 className="font-bold text-xl">เที่ยวบินที่ต้องการยกเลิก</h1>
            </div>
            <div className="flex justify-center mt-5">
                <div className="border max-w-[700px] w-full border-neutral-300 bg-white hover:drop-shadow-md hover:border-royal-blue-300 p-3 rounded-[5px] cursor-pointer">
                    <div className="grid grid-cols-6 px-4">
                        <div className="flex flex-col col-span-2">
                            <div className="flex gap-x-2">
                                <img src="https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/Hawaiian_Airlines_logo_2017.svg/800px-Hawaiian_Airlines_logo_2017.svg.png" className="w-4 h-4" />
                                <p className="text-slate-600 text-sm my-auto">Delta Airlines</p>
                            </div>
                            <div className="mt-1">
                                <div className="flex">
                                    <div>
                                        <p className="text-slate-500 font-semibold text-lg">9:30 AM</p>
                                        <p className="text-slate-600 text-xs">FLN</p>
                                    </div>
                                    <div className="mx-4"></div>
                                    <div>
                                        <p className="text-slate-500 font-semibold text-lg">12:00 PM</p>
                                        <p className="text-slate-600 text-xs">YYT</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="my-auto pt-2 col-span-2 ml-14 text-slate-500">
                            <p>2 ชม. 30 นาที</p>
                        </div>
                        <div className="my-auto text-right justify-end col-span-2">
                            <div className="flex ml-auto mr-0 justify-end gap-x-1">
                                <span className="text-royal-blue-600  text-xl my-auto font-semibold">฿</span>
                                <p className="text-royal-blue-600 font-bold text-xl">160</p>
                                <span className="text-sm my-auto text-slate-600">/คน</span>
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
                                        <Checkbox value="เปลี่ยนแปลงแผนการเดินทาง">เปลี่ยนแปลงแผนการเดินทาง</Checkbox>
                                        <Checkbox value="ราคาของตั๋วเครื่องบินที่แพงเกินไป">ราคาของตั๋วเครื่องบินที่แพงเกินไป</Checkbox>
                                        <Checkbox value="ปัญหาด้านสุขภาพส่วนบุคคล">ปัญหาด้านสุขภาพส่วนบุคคล</Checkbox>
                                        <Checkbox value="สถานการณ์อากาศ">สถานการณ์อากาศ</Checkbox>
                                        <Checkbox value="ฉุกเฉินส่วนตัว">ฉุกเฉินส่วนตัว</Checkbox>
                                        <Checkbox value="ข้อจำกัดหรือข้อบังคับเกี่ยวกับการเดินทาง">ข้อจำกัดหรือข้อบังคับเกี่ยวกับการเดินทาง</Checkbox>
                                        <Checkbox value="บริการที่ไม่น่าพอใจ">บริการที่ไม่น่าพอใจ</Checkbox>
                                        <Checkbox value="อื่นๆ">อื่นๆ</Checkbox>
                                    </VStack>
                                </CheckboxGroup>
                            </FormControl>
                            {/* Input for custom reason */}
                            {selectedReasons.includes("อื่นๆ") && (
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
                            <div className='mt-4'>
                                <h1 className='font-bold text-md mb-2'>บัญชีที่ต้องการขอเงินคืน</h1>
                                {accountNumber && !selectedBank && (
                                    <div className="mb-2 text-red-500">โปรดระบุธนาคาร</div>
                                )}
                                <div className='flex gap-4'>
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
                                            <FormErrorMessage>เลขบัญชีต้องประกอบด้วยตัวเลขเท่านั้นและมีความยาว 10 หลัก</FormErrorMessage>
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
                            <p>คุณต้องการยกเลิกเที่ยวบินนี้ใช่หรือไม่?</p>
                            <div className="flex justify-end mt-2">
                                <button
                                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-2"
                                    onClick={handleCancelConfirmation}
                                >
                                    ใช่
                                </button>
                                <button
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                                    onClick={() => setShowConfirmation(false)}
                                >
                                    ไม่
                                </button>
                            </div>
                        </div>
                    )}
                    {/* Success message */}
                    {showSuccessMessage && (
                        <div className="mt-4 flex flex-col items-center">
                            <p>ยกเลิกเที่ยวบินสำเร็จแล้ว</p>
                            <Link to="/" className="block mt-4 text-center">
                                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                                    กลับสู่หน้าหลัก
                                </button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
