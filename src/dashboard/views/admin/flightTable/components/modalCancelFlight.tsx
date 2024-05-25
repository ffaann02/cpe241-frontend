import {
    Button,
    Checkbox,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
    Stack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import axiosPrivate from '../../../../../api/axios';

const cancellationReasons = [
    { value: 'severeWeather', label: 'สภาพอากาศรุนแรง' },
    { value: 'poorVisibility', label: 'ทัศนวิสัยไม่ดี' },
    { value: 'extremeTemperatures', label: 'อุณหภูมิสุดขั้ว' },
    { value: 'volcanicActivity', label: 'กิจกรรมภูเขาไฟ' },
    { value: 'aircraftMaintenance', label: 'ปัญหาการบำรุงรักษาอากาศยาน' },
    { value: 'mechanicalFailures', label: 'ปัญหาทางกลไก' },
    { value: 'electricalFailures', label: 'ปัญหาระบบไฟฟ้า' },
    { value: 'avionicsIssues', label: 'ปัญหาระบบอิเล็กทรอนิกส์การบิน' },
    { value: 'crewUnavailability', label: 'การไม่พร้อมของลูกเรือ' },
    { value: 'schedulingConflicts', label: 'ข้อขัดแย้งในการกำหนดเวลา' },
    { value: 'overbooking', label: 'การจองเกินจำนวน' },
    { value: 'groundEquipmentFailure', label: 'ความล้มเหลวของอุปกรณ์ภาคพื้น' },
    { value: 'fuelingIssues', label: 'ปัญหาการเติมน้ำมัน' },
    { value: 'runwayClosure', label: 'การปิดรันเวย์' },
    { value: 'atcRestrictions', label: 'ข้อจำกัดการควบคุมการจราจรทางอากาศ' },
    { value: 'airportSecurityIssues', label: 'ปัญหาความปลอดภัยของสนามบิน' },
    { value: 'airportFacilityProblems', label: 'ปัญหาสิ่งอำนวยความสะดวกของสนามบิน' },
    { value: 'securityThreats', label: 'ภัยคุกคามด้านความปลอดภัย' },
    { value: 'travelRestrictions', label: 'ข้อจำกัดการเดินทางของรัฐบาล' },
    { value: 'civilUnrest', label: 'ความไม่สงบในสังคม' },
    { value: 'naturalDisasters', label: 'ภัยพิบัติทางธรรมชาติ' },
    { value: 'medicalEmergencies', label: 'เหตุฉุกเฉินทางการแพทย์' },
    { value: 'epidemicPandemic', label: 'การระบาดของโรค' },
    { value: 'quarantineRequirements', label: 'ข้อกำหนดการกักกัน' },
    { value: 'baggageHandlingIssues', label: 'ปัญหาการจัดการสัมภาระ' },
    { value: 'cargoHandlingIssues', label: 'ปัญหาการจัดการสินค้า' },
    { value: 'missingPassengers', label: 'ผู้โดยสารหาย' },
    { value: 'financialIssues', label: 'ปัญหาทางการเงิน' },
    { value: 'strikes', label: 'การประท้วงหรือข้อพิพาทแรงงาน' },
    { value: 'policyChanges', label: 'การเปลี่ยนแปลงนโยบายของสายการบิน' },
];

const ModalCancelFlight = ({ isCancelFlight, onCloseCancelFlight }) => {
    const [flightResult, setFlightResult] = useState<any[]>([]);
    const [flightTimeResult, setFlightTimeResult] = useState<any[]>([]);
    const [reason, setReason] = useState<string>('');
    const [selectedTime, setSelectedTime] = useState<any | null>(null);
    const [newFlight, setNewFlight] = useState<any | null>(null);
    const [availableFlights, setAvailableFlights] = useState<any[]>([]);

    useEffect(() => {
        const getFlights = async () => {
            try {
                const response = await axiosPrivate.get('/api/search/flights', {
                    params: {
                        all: true,
                    },
                });
                setFlightResult(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        getFlights();
    }, []);
    const handleFlightSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(e.target.value);
        setSelectedCancelFlight(e.target.value);
        const selectedFlightID = Number(e.target.value);
        const selectedFlight = flightTimeResult.find((flight) => flight.flightID === selectedFlightID);
        const selectedFlightDate = selectedFlight ? new Date(selectedFlight.departureDateTime).toDateString() : null;
        const filteredFlights = flightTimeResult.filter((flight) => {
            const flightDate = new Date(flight.departureDateTime).toDateString();
            return flight.flightID !== selectedFlightID && flightDate === selectedFlightDate;
        });
        console.log(filteredFlights);
        setAvailableFlights(filteredFlights);
    };

    const handleNewFlightSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(e.target.value);
        setNewFlight(e.target.value);
    };

    const [selectedCancelFlight, setSelectedCancelFlight] = useState<any | null>(null);
    const handleSelectFlight = async (flightNo: string) => {
        try {
            const response = await axiosPrivate.get(`/api/flight/flightNo/flight?flightNo=${flightNo}`);
            console.log(response.data);
            setFlightTimeResult(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleCancelFlight = async () => {
        console.log(selectedCancelFlight);
        console.log(reason);
        console.log(newFlight);
        try {
            const response = await axiosPrivate.post('/api/flight/cancel', {
                flightID: selectedCancelFlight,
                reason,
                newFlightID: newFlight,
            });
            console.log(response.data);
            onCloseCancelFlight();
        } catch (error) {
            console.log(error);
        }
    };

    const [checkedOption, setCheckedOption] = useState('changeFlight');

    const handleCheckboxChange = (option: string) => {
        setCheckedOption(option);
    };

    return (
        <>
            <Modal isOpen={isCancelFlight} onClose={onCloseCancelFlight}>
                <ModalOverlay />
                <ModalContent minWidth={'40vw'} className="px-6">
                    <h1 className="text-xl mt-6 mb-2 border-b pb-2">ยกเลิกเที่ยวบิน</h1>
                    <div className="flex flex-col gap-y-2 border-b pb-4 mt-2">
                        <div>
                            <p className="text-slate-500">รายละเอียดเที่ยวบิน</p>
                            <div className="grid grid-cols-2 gap-2 mt-1">
                                <div>
                                    <label className="text-sm text-slate-600">เลือกเที่ยวบินที่ต้องการยกเลิก</label>
                                    <Select
                                        placeholder="เลือก Flight No"
                                        onChange={(e) => handleSelectFlight(e.target.value)}
                                    >
                                        {flightResult.map((flight, index) => (
                                            <option key={index} value={flight.flightNo}>
                                                {flight.flightNo}
                                            </option>
                                        ))}
                                    </Select>
                                </div>
                                <div>
                                    <label className="text-sm text-slate-600">เลือกรอบเวลาเที่ยวบิน</label>
                                    <Select placeholder="เลือกรอบเวลาเที่ยวบิน" onChange={handleFlightSelection}>
                                        {flightTimeResult.map((flight, index) => (
                                            <option key={index} value={flight.flightID}>
                                                {new Date(flight.departureDateTime).toLocaleString('th-TH')}
                                            </option>
                                        ))}
                                    </Select>
                                </div>
                                <div className="col-span-full">
                                    <label className="text-sm text-slate-600">ระบุเหตุผลที่ต้องการยกเลิก</label>
                                    <Select
                                        placeholder="เหตุผลที่ต้องการยกเลิก"
                                        onChange={(e) => setReason(e.target.value)}
                                        value={reason}
                                        size="md"
                                        className="col-span-full placeholder:text-slate-500"
                                    >
                                        {cancellationReasons.map((reason) => (
                                            <option key={reason.value} value={reason.value}>
                                                {reason.label}
                                            </option>
                                        ))}
                                    </Select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 flex flex-col gap-y-2 pb-4">
                        <div>
                            <p className="text-slate-500">มาตรการรองรับผู้โดยสาร</p>
                            <Stack spacing={5} direction="row" className="mt-1">
                                <Checkbox
                                    colorScheme="blue"
                                    isChecked={checkedOption === 'changeFlight'}
                                    onChange={() => handleCheckboxChange('changeFlight')}
                                >
                                    เปลี่ยนเป็นเที่ยวบินอื่นในวันเดียวกัน
                                </Checkbox>
                                <Checkbox
                                    colorScheme="blue"
                                    isChecked={checkedOption === 'refundTicket'}
                                    onChange={() => handleCheckboxChange('refundTicket')}
                                >
                                    คืนเงินค่าตั๋ว
                                </Checkbox>
                            </Stack>
                            {checkedOption === 'changeFlight' && (
                                <div className="w-1/2 mt-2">
                                    <Select
                                        placeholder="เลือกรอบเวลาเปลี่ยนเที่ยวบิน"
                                        onChange={handleNewFlightSelection}
                                    >
                                        {availableFlights.map((flight, index) => (
                                            <option key={index} value={flight.flightID}>
                                                {new Date(flight.departureDateTime).toLocaleString('th-TH')}
                                            </option>
                                        ))}
                                    </Select>
                                </div>
                            )}
                        </div>
                    </div>

                    <ModalCloseButton />
                    <ModalBody></ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleCancelFlight}>
                            บันทึก
                        </Button>
                        <Button variant="ghost" className="bg-slate-100" onClick={onCloseCancelFlight}>
                            ยกเลิก
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};
export default ModalCancelFlight;
