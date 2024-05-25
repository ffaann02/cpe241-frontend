import {
    Button,
    Checkbox,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    NumberInput,
    NumberInputField,
    Select,
    Stack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import axiosPrivate from '../../../../../api/axios';

const ModalMaintainAircraft = ({ isAircraftMaintenance, onCloseAircraftMaintenance, aircraftData }) => {
    const [selectedAircraft, setSelectedAircraft] = useState(null);
    const [newAircraft, setNewAircraft] = useState(null);
    const [estimatedFinishDateTime, setEstimatedFinishDateTime] = useState('');
    const [task, setTask] = useState({
        employee: null,
        type: 'Maintenance',
        description: 'ดำเนินการซ่อมบำรุงเครื่องบิน',
        status: 'pending',
    });
    const [policy, setPolicy] = useState({
        changeStatus: false,
        changeAircraft: false,
    });
    const [employeeData, setEmployeeData] = useState([]);
    const handleCheckboxChange = (field) => {
        if (field === 'changeStatus') {
            setPolicy((prevPolicy) => ({
                changeStatus: !prevPolicy.changeStatus,
                changeAircraft: false,
            }));
        } else if (field === 'changeAircraft') {
            setPolicy((prevPolicy) => ({
                changeStatus: false,
                changeAircraft: !prevPolicy.changeAircraft,
            }));
        }
        console.log(policy);
    };
    const handleTaskChange = (field, value) => {
        setTask((prevTask) => ({ ...prevTask, [field]: value }));
    };

    useEffect(() => {
        const getEmployees = async () => {
            const response = await axiosPrivate.get('/api/search/employees', {
                params: {
                    role: 'Technician',
                },
            });
            console.log(response.data);
            setEmployeeData(response.data);
        };
        getEmployees();
    }, []);

    const handleCreateMaintenance = async () => {
        console.log(selectedAircraft);
        console.log(estimatedFinishDateTime);
        console.log(task);
        console.log(policy);
        try{
            const body = {
                aircraftID: selectedAircraft,
                estimatedFinishDateTime: estimatedFinishDateTime,
                task: task,
                policy: policy,
                newAircraft: newAircraft,
            }
            const response = await axiosPrivate.post('/api/aircraft/maintenance', body);
            console.log(response.data);
            onCloseAircraftMaintenance();
        }
        catch(error){
            console.log(error);
        }
    };

    return (
        <>
            <Modal isOpen={isAircraftMaintenance} onClose={onCloseAircraftMaintenance}>
                <ModalOverlay />
                <ModalContent maxWidth={'40vw'}>
                    <ModalHeader>แจ้งเหตุเครื่องบินขัดข้อง</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <div className="">
                            <label>โปรดเลือกเครื่องบินที่ต้องการ</label>
                            <Select
                                className="placeholder:text-slate-500 text-slate-600 text-sm"
                                placeholder="เครื่องบิน"
                                onChange={(e) => setSelectedAircraft(e.target.value)}
                            >
                                {aircraftData.map((aircraft, index) => (
                                    <option key={index} value={aircraft.aircraftID}>
                                        {aircraft.aircraftCallSign} - {aircraft.airlineName}
                                    </option>
                                ))}
                            </Select>
                        </div>
                        <div className="mt-2">
                            <label>เวลาที่คาดว่าดำเนินการเสร็จ</label>
                            <Input
                                type="time"
                                value={estimatedFinishDateTime}
                                className=""
                                onChange={(e) => setEstimatedFinishDateTime(e.target.value)}
                            />
                        </div>
                        <div className="mt-2 border px-3 py-2 rounded-md">
                            <label>มาตรการรองรับเที่ยวบินที่ใกล้ถึง</label>
                            <Stack spacing={2} direction="column" className="">
                                <Checkbox
                                    colorScheme="blue"
                                    isChecked={policy.changeStatus}
                                    onChange={() => handleCheckboxChange('changeStatus')}
                                >
                                    เปลี่ยนสถานะล่าช้าจนกว่าจะดำเนินการเสร็จ
                                </Checkbox>
                                <Checkbox
                                    colorScheme="blue"
                                    isChecked={policy.changeAircraft}
                                    onChange={() => handleCheckboxChange('changeAircraft')}
                                >
                                    เปลี่ยนเครื่องบิน
                                </Checkbox>
                            </Stack>
                            {policy.changeAircraft && (
                                <div className="">
                                    <Select
                                        className="placeholder:text-slate-500 text-slate-600 text-sm mt-1"
                                        placeholder="เครื่องบิน"
                                        onChange={(e) => setNewAircraft(e.target.value)}
                                    >
                                        {aircraftData.map((aircraft, index) => (
                                            <option key={index} value={aircraft.aircraftID}>
                                                {aircraft.aircraftCallSign} - {aircraft.airlineName}
                                            </option>
                                        ))}
                                    </Select>
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col gap-y-2 mt-2">
                            <FormControl id="employee">
                                <label>ช่างเครื่องบิน</label>
                                <Select
                                    placeholder="Select employee"
                                    onChange={(e) => handleTaskChange('employee', e.target.value)}
                                >
                                    {employeeData
                                        .filter((employee) => employee.position === 'Technician')
                                        .map((employee, index) => (
                                            <option key={index} value={employee.employeeID}>
                                                T{employee.employeeID}: {employee.firstName} - {employee.lastName}
                                            </option>
                                        ))}
                                </Select>
                            </FormControl>
                            <FormControl id="taskType">
                                <label>ประเภทงาน</label>
                                <Select
                                    placeholder="Select task type"
                                    value={'Maintenance'}
                                    disabled
                                    onChange={(e) => handleTaskChange('type', e.target.value)}
                                >
                                    <option value="Flight">Flight</option>
                                    <option value="Maintenance">Maintenance</option>
                                    {/* Add more options as needed */}
                                </Select>
                            </FormControl>
                            <FormControl id="taskDescription">
                                <label>คำอธิบายงาน</label>
                                <Input
                                    value={task.description}
                                    onChange={(e) => handleTaskChange('description', e.target.value)}
                                />
                            </FormControl>
                            <FormControl id="status">
                                <label>สถานะ</label>
                                <Select
                                    disabled
                                    className="disabled:border disabled:border-slate-300
                                    disabled:bg-slate-100 disabled:text-slate-500"
                                    defaultValue={'pending'}
                                    placeholder="โปรดเลือกสถานะ"
                                    onChange={(e) => handleTaskChange('status', e.target.value)}
                                >
                                    <option value="pending">pending</option>
                                </Select>
                            </FormControl>
                        </div>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleCreateMaintenance}>
                            บันทึก
                        </Button>
                        <Button variant="ghost" className="bg-slate-100" onClick={onCloseAircraftMaintenance}>
                            ยกเลิก
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};
export default ModalMaintainAircraft;
