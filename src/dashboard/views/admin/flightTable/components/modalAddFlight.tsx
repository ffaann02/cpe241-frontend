import {
    Box,
    Button,
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
    Select,
    Stack,
    Step,
    StepDescription,
    StepIcon,
    StepIndicator,
    StepNumber,
    StepSeparator,
    StepStatus,
    StepTitle,
    Stepper,
    Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import axiosPrivate from '../../../../../api/axios';
import { set } from 'react-hook-form';
import { calculateDistance } from '../../../../../utils/timeFormat';

export const ModalAddFlight = ({ isAddFlight, onCloseAddFlight, newFlight, setNewFlight, setFlightData }) => {
    const handleCreateFlight = async () => {
        try {
            console.log(newFlight);
            console.log(assignTasks);
            const response = await axiosPrivate.post('/api/flight/create', {
                flight: {
                    flightID: newFlight.flightID,
                    flightNo: newFlight.flightNo,
                    airlineID: parseInt(newFlight.airslineID),
                    aircraftID: parseInt(newFlight.aircraftID),
                    departureAirportID: parseInt(newFlight.departureAirportID),
                    arrivalAirportID: parseInt(newFlight.arrivalAirportID),
                    departureDateTime: newFlight.departureDateTime,
                    arrivalDateTime: newFlight.arrivalDateTime,
                    currentCapacity: parseInt(newFlight.currentCapacity),
                    status: newFlight.status,
                    baseFare: parseInt(newFlight.baseFare),
                },
                task: assignTasks.map((task) => ({
                    employeeID: parseInt(task.employeeID),
                    assignDateTime: task.assignDateTime,
                    taskType: task.taskType,
                    taskDescription: task.taskDescription,
                    status: task.status,
                })),
            });
            const updatedFlight = await response.data.newFlight[0];
            console.log(updatedFlight);
            setFlightData((prev) => [...prev, updatedFlight]);
            onCloseAddFlight();
        } catch (error) {
            console.log(error);
        }
    };

    const [assignTasks, setAssignTasks] = useState([
        {
            employeeID: '1',
            assignDateTime: '',
            taskType: 'Fly',
            taskDescription: 'Be a Captain',
            status: 'pending',
        },
    ]);
    const [step, setStep] = useState(0);
    const steps = [
        { title: 'เพิ่มเที่ยวบิน', description: '' },
        { title: 'มอบหมายหน้าที่', description: 'ให้พนักงานในเที่ยวบิน' },
    ];

    const handleNext = () => setStep(step + 1);
    const handleBack = () => setStep(step - 1);

    const [flightList, setFlightList] = useState<any>();
    const [airlineList, setAirlineList] = useState<any>();
    const [airportList, setAirportList] = useState<any>();
    const [aircraftList, setAircraftList] = useState<any>();

    useEffect(() => {
        const getAirline = async () => {
            const response = await axiosPrivate.get('/api/search/airlines');
            setAirlineList(response.data);
        };
        const getFlights = async () => {
            const response = await axiosPrivate.get('/api/search/flights', {
                params: {
                    all: true,
                },
            });
            setFlightList(response.data);
        };

        const getAirports = async () => {
            const response = await axiosPrivate.get('/api/search/airports', {
                params: {
                    all: true,
                },
            });
            setAirportList(response.data);
        };
        const getAircraft = async () => {
            const response = await axiosPrivate.get('/api/search/aircrafts');
            setAircraftList(response.data);
        };

        if (isAddFlight && !airportList && !flightList && !airlineList) {
            getAirline();
            getFlights();
            getAirports();
            getAircraft();
        }
    }, [isAddFlight]);

    useEffect(() => {
        if (
            !newFlight ||
            !newFlight.departureDateTime ||
            !newFlight.arrivalAirportID ||
            !newFlight.departureAirportID
        ) {
            return;
        }

        const departureAirport = airportList.find(
            (airport) => airport.airportID === parseInt(newFlight.departureAirportID)
        );
        const arrivalAirport = airportList.find(
            (airport) => airport.airportID === parseInt(newFlight.arrivalAirportID)
        );

        const { lat: lat1, lon: lon1 } = departureAirport;
        const { lat: lat2, lon: lon2 } = arrivalAirport;
        const distance = calculateDistance(lat1, lon1, lat2, lon2);
        const airportSpeed = 250;
        const durationInHours = distance / airportSpeed;
        const durationInMilliseconds = durationInHours * 60 * 60 * 1000;
        const departureDateTime = new Date(newFlight.departureDateTime);
        const arrivalDateTime = new Date(departureDateTime.getTime() + durationInMilliseconds);
        const formattedArrivalDateTime = `${arrivalDateTime.getFullYear()}-${String(arrivalDateTime.getMonth() + 1).padStart(2, '0')}-${String(arrivalDateTime.getDate()).padStart(2, '0')}T${String(arrivalDateTime.getHours()).padStart(2, '0')}:${String(arrivalDateTime.getMinutes()).padStart(2, '0')}`;        // const arrivalDateTimeUTC = `${arrivalDateTime.getUTCFullYear()}-${String(arrivalDateTime.getUTCMonth() + 1).padStart(2, '0')}-${String(arrivalDateTime.getUTCDate()).padStart(2, '0')}T${String(arrivalDateTime.getUTCHours()).padStart(2, '0')}:${String(arrivalDateTime.getUTCMinutes()).padStart(2, '0')}`;
        setNewFlight({ ...newFlight, arrivalDateTime: formattedArrivalDateTime });
    }, [newFlight?.departureDateTime, newFlight?.arrivalAirportID, newFlight?.departureAirportID]);

    const [flightStatus, setFlightStatus] = useState({
        scheduled: { en: 'Scheduled', th: 'ตามกำหนด' },
        onTime: { en: 'On-Time', th: 'ตรงเวลา' },
        delayed: { en: 'Delayed', th: 'ล่าช้า' },
        departed: { en: 'Departed', th: 'ออกเดินทางแล้ว' },
        inAir: { en: 'In Air', th: 'ในอากาศ' },
        landed: { en: 'Landed', th: 'ลงจอด' },
        arrived: { en: 'Arrived', th: 'ถึงแล้ว' },
        cancelled: { en: 'Cancelled', th: 'ถูกยกเลิก' },
        diverted: { en: 'Diverted', th: 'เปลี่ยนเส้นทาง' },
        boarding: { en: 'Boarding', th: 'ขึ้นเครื่อง' },
        gateChange: { en: 'Gate Change', th: 'เปลี่ยนประตู' },
        finalCall: { en: 'Final Call', th: 'เรียกครั้งสุดท้าย' },
        returnedToGate: { en: 'Returned to Gate', th: 'กลับไปที่ประตู' },
        awaitingTakeoff: { en: 'Awaiting Takeoff', th: 'รอขึ้นเครื่อง' },
        taxiing: { en: 'Taxiing', th: 'ขับเคลื่อน' },
    });

    const [employeeList, setEmployeeList] = useState<any>();

    useEffect(() => {
        const getEmployees = async () => {
            const response = await axiosPrivate.get('/api/search/employees');
            setEmployeeList(response.data);
        };
        if (step === 1 && !employeeList) {
            getEmployees();
        }
    }, [step]);

    return (
        <>
            {newFlight && isAddFlight && airportList && flightList && airlineList && aircraftList && (
                <Modal blockScrollOnMount={true} isOpen={isAddFlight} onClose={onCloseAddFlight}>
                    <ModalOverlay />
                    <ModalContent minWidth={'50vw'}>
                        <Stepper index={step} className="px-10 py-6">
                            {steps.map((step, index) => (
                                <Step key={index}>
                                    <StepIndicator>
                                        <StepStatus
                                            complete={<StepIcon />}
                                            incomplete={<StepNumber />}
                                            active={<StepNumber />}
                                        />
                                    </StepIndicator>

                                    <Box flexShrink="0">
                                        <StepTitle>{step.title}</StepTitle>
                                        <StepDescription>{step.description}</StepDescription>
                                    </Box>

                                    <StepSeparator />
                                </Step>
                            ))}
                        </Stepper>
                        <ModalCloseButton />
                        <ModalBody>
                            {step === 0 && (
                                <div className="grid grid-cols-2 gap-4">
                                    <Stack>
                                        <FormLabel>Flight Number</FormLabel>
                                        <Select
                                            marginTop={-2}
                                            placeholder="เลือกรหัสเที่ยวบิน"
                                            value={newFlight.flightNo}
                                            onChange={(e) => setNewFlight({ ...newFlight, flightNo: e.target.value })}
                                        >
                                            {flightList.map((flight, index) => (
                                                <option key={index} value={flight.flightNo}>
                                                    {flight.flightNo}
                                                </option>
                                            ))}
                                        </Select>
                                    </Stack>
                                    {/* <Stack>
                                        <FormLabel>Airline Name</FormLabel>
                                        <Select
                                            marginTop={-2}
                                            placeholder="เลือกสายการบิน"
                                            value={newFlight.airlineID}
                                            onChange={(e) =>
                                                setNewFlight({ ...newFlight, airlineID: e.target.value })
                                            }
                                        >
                                            {airlineList.map((airline, index) => (
                                                <option key={index} value={airline.airlineID}>
                                                    {airline.airlineName}
                                                </option>
                                            ))}
                                        </Select>
                                    </Stack> */}
                                    <Stack>
                                        <FormLabel>Aircraft</FormLabel>
                                        <Select
                                            marginTop={-2}
                                            placeholder="เลือกเครื่องบิน"
                                            value={newFlight.aircraftID}
                                            onChange={(e) => setNewFlight({ ...newFlight, aircraftID: e.target.value })}
                                        >
                                            {aircraftList.map((aircraft, index) => (
                                                <option key={index} value={aircraft.aircraftID}>
                                                    {aircraft.aircraftCallSign}
                                                </option>
                                            ))}
                                        </Select>
                                    </Stack>
                                    <Stack>
                                        <FormLabel>Departure IATA Code</FormLabel>
                                        <Select
                                            marginTop={-2}
                                            placeholder="เลือกรหัส IATA ของสนามบินขาออก"
                                            value={newFlight.departureAirportID}
                                            onChange={(e) =>
                                                setNewFlight({ ...newFlight, departureAirportID: e.target.value })
                                            }
                                        >
                                            {airportList.map((airport, index) => (
                                                <option key={index} value={airport.airportID}>
                                                    {airport.city} ({airport.iata})
                                                </option>
                                            ))}
                                        </Select>
                                    </Stack>
                                    <Stack>
                                        <FormLabel>Arrival IATA Code</FormLabel>
                                        <Select
                                            marginTop={-2}
                                            placeholder="เลือกรหัส IATA ของสนามบินขาออก"
                                            value={newFlight.arrivalAirportID}
                                            onChange={(e) =>
                                                setNewFlight({ ...newFlight, arrivalAirportID: e.target.value })
                                            }
                                        >
                                            {airportList.map((airport, index) => (
                                                <option key={index} value={airport.airportID}>
                                                    {airport.city} ({airport.iata})
                                                </option>
                                            ))}
                                        </Select>
                                    </Stack>
                                    <FormControl id="departureDateTime" isRequired>
                                        <FormLabel>Departure Date and Time</FormLabel>
                                        <Input
                                            type="datetime-local"
                                            value={newFlight.departureDateTime}
                                            onChange={(e) =>
                                                setNewFlight({ ...newFlight, departureDateTime: e.target.value })
                                            }
                                        />
                                    </FormControl>
                                    <FormControl id="arrivalDateTime" isRequired>
                                        <FormLabel>Arrival Date and Time</FormLabel>
                                        <Input
                                            disabled
                                            _disabled={{ bg: 'gray.50', borderColor: '1px solid #f1f5f9' }}
                                            type="datetime-local"
                                            value={newFlight.arrivalDateTime}
                                            onChange={(e) =>
                                                setNewFlight({ ...newFlight, arrivalDateTime: e.target.value })
                                            }
                                        />
                                    </FormControl>
                                    <Stack>
                                        <FormLabel>Status</FormLabel>
                                        <Select
                                            marginTop={-2}
                                            placeholder="สถานะเริ่มต้นของเที่ยวบิน"
                                            value={newFlight.status || Object.entries(flightStatus)[0][1].en}
                                            onChange={(e) => setNewFlight({ ...newFlight, status: e.target.value })}
                                            isDisabled
                                            _disabled={{ bg: 'gray.50', borderColor: '1px solid #f1f5f9' }}
                                        >
                                            {Object.entries(flightStatus).map(([key, status], index) => (
                                                <option key={index} value={status.en}>
                                                    {status.en} - {status.th}{' '}
                                                </option>
                                            ))}
                                        </Select>
                                    </Stack>
                                    <FormControl id="baseFare" isRequired>
                                        <FormLabel>Base Fare</FormLabel>
                                        <Input
                                            type="number"
                                            value={newFlight.baseFare}
                                            onChange={(e) => setNewFlight({ ...newFlight, baseFare: e.target.value })}
                                        />
                                    </FormControl>
                                </div>
                            )}
                            {step === 1 && employeeList && (
                                <div className="">
                                    {assignTasks.map((task, index) => (
                                        <div key={index} className="grid grid-cols-2 gap-4">
                                            <Stack>
                                                <FormLabel>Employee</FormLabel>
                                                <Select
                                                    marginTop={-2}
                                                    placeholder="เลือกกัปตันของเที่ยวบิน"
                                                    value={task.employeeID}
                                                    onChange={(e) => {
                                                        const newTasks = [...assignTasks];
                                                        newTasks[index].employeeID = e.target.value;
                                                        setAssignTasks(newTasks);
                                                    }}
                                                >
                                                    {employeeList.map((employee, index) => (
                                                        <option key={index} value={employee.employeeID}>
                                                            A{employee.employeeID}: {employee.firstName}{' '}
                                                            {employee.lastName}
                                                        </option>
                                                    ))}
                                                </Select>
                                            </Stack>
                                            {/* <FormControl id={`assignDateTime${index}`} isRequired>
                                                <FormLabel>Assign Date and Time</FormLabel>
                                                <Input
                                                    type="datetime-local"
                                                    value={task.assignDateTime}
                                                    onChange={(e) => {
                                                        const newTasks = [...assignTasks];
                                                        newTasks[index].assignDateTime = e.target.value;
                                                        setAssignTasks(newTasks);
                                                    }}
                                                />
                                            </FormControl> */}
                                            <FormControl id={`taskType${index}`} isRequired>
                                                <FormLabel>Task Type</FormLabel>
                                                <Input
                                                    type="text"
                                                    value={task.taskType}
                                                    onChange={(e) => {
                                                        const newTasks = [...assignTasks];
                                                        newTasks[index].taskType = e.target.value;
                                                        setAssignTasks(newTasks);
                                                    }}
                                                />
                                            </FormControl>
                                            <FormControl id={`taskDescription${index}`} isRequired>
                                                <FormLabel>Task Description</FormLabel>
                                                <Input
                                                    type="text"
                                                    value={task.taskDescription}
                                                    onChange={(e) => {
                                                        const newTasks = [...assignTasks];
                                                        newTasks[index].taskDescription = e.target.value;
                                                        setAssignTasks(newTasks);
                                                    }}
                                                />
                                            </FormControl>
                                            <FormControl id={`status${index}`} isRequired>
                                                <FormLabel>Status</FormLabel>
                                                <Input
                                                    type="text"
                                                    value={task.status || 'pending'}
                                                    onChange={(e) => {
                                                        const newTasks = [...assignTasks];
                                                        newTasks[index].status = e.target.value;
                                                        setAssignTasks(newTasks);
                                                    }}
                                                    isDisabled
                                                    _disabled={{ bg: 'gray.50', borderColor: '1px solid #f1f5f9' }}
                                                />
                                            </FormControl>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </ModalBody>
                        <div className="flex justify-between px-4 pb-1.5">
                            <div className="py-2 ml-2 gap-x-2 flex">
                                <button
                                    className="hover:underline text-slate-600 
                                hover:text-royal-blue-600 disabled:text-slate-400"
                                    disabled={step <= 0}
                                    onClick={handleBack}
                                >
                                    ย้อนกลับ
                                </button>
                                <button
                                    className="hover:underline text-slate-600
                                 hover:text-royal-blue-600 disabled:text-slate-400"
                                    disabled={step >= 1}
                                    onClick={handleNext}
                                >
                                    ถัดไป
                                </button>
                            </div>
                            <div className="mb-2 gap-x-2 flex">
                                <Button colorScheme="blue" onClick={onCloseAddFlight}>
                                    Close
                                </Button>
                                <Button variant="ghost" onClick={handleCreateFlight} className="bg-slate-100">
                                    Save
                                </Button>
                            </div>
                        </div>
                    </ModalContent>
                </Modal>
            )}
        </>
    );
};
