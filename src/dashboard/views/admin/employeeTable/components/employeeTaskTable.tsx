import React, { useState } from 'react';
import {
    Table,
    Thead,
    Tbody,
    TableCaption,
    TableContainer,
    Tr,
    Th,
    Td,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Input,
    FormControl,
    FormLabel,
    Flex,
    Checkbox,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';

export interface EmployeeTaskInfo {
    employeeID: number;
    firstName: string;
    lastName: string;
    assignedDate: string;
    taskType: string;
    taskDescription: string;
    status: string;
    flightNumber: string;
}

const EmployeeTaskTable: React.FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isTimeNow, setIsTimeNow] = useState(false);
    const [editingTask, setEditingTask] = useState<EmployeeTaskInfo | null>(null);
    const [employeeTask, setEmployeeTask] = useState<EmployeeTaskInfo[]>([
        {
            employeeID: 1,
            firstName: 'John',
            lastName: 'Doe',
            assignedDate: '2024-05-12T10:00:00Z',
            taskType: 'Flight Operations',
            taskDescription: 'Perform flight operations',
            status: 'Pending',
            flightNumber: 'AA123',
        },
        {
            employeeID: 2,
            firstName: 'Jane',
            lastName: 'Doe',
            assignedDate: '2024-05-12T10:00:00Z',
            taskType: 'Security Operations',
            taskDescription: 'Perform security operations',
            status: 'Pending',
            flightNumber: 'AA123',
        },
        {
            employeeID: 3,
            firstName: 'Bob',
            lastName: 'Smith',
            assignedDate: '2024-05-12T10:00:00Z',
            taskType: 'Cleaning',
            taskDescription: 'Clean the room',
            status: 'Pending',
            flightNumber: 'AA125',
        },
    ]);

    const openEditModal = (task: EmployeeTaskInfo) => {
        setEditingTask(task);
        onOpen();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditingTask((prev) => (prev ? { ...prev, [name]: value } : null));
    };

    const handleSave = () => {
        if (editingTask) {
            if (isTimeNow) {
                editingTask.assignedDate = new Date().toISOString();
                setIsTimeNow(false);
            }
            const updatedTasks = employeeTask.map((task) =>
                task.employeeID === editingTask.employeeID ? editingTask : task
            );
            setEmployeeTask(updatedTasks);
        }
        console.log(editingTask);
        onClose();
    };

    return (
        <div>
            <TableContainer>
                <Table variant="simple">
                    <TableCaption>Current Flight Operations</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Employee ID</Th>
                            <Th>First Name</Th>
                            <Th>Last Name</Th>
                            <Th>Assigned Date</Th>
                            <Th>Task Type</Th>
                            <Th>Task Description</Th>
                            <Th>Status</Th>
                            <Th>Flight Number</Th>
                            <Th>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {employeeTask.map((task, index) => (
                            <Tr key={index}>
                                <Td>{task.employeeID}</Td>
                                <Td>{task.firstName}</Td>
                                <Td>{task.lastName}</Td>
                                <Td>{new Date(task.assignedDate).toLocaleString()}</Td>
                                <Td>{task.taskType}</Td>
                                <Td>{task.taskDescription}</Td>
                                <Td>{task.status}</Td>
                                <Td>{task.flightNumber}</Td>
                                <Td>
                                    <Flex justifyContent="center">
                                        <EditIcon cursor="pointer" onClick={() => openEditModal(task)} />
                                    </Flex>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>

            {editingTask && (
                <Modal isOpen={isOpen} onClose={onClose} isCentered motionPreset="slideInBottom">
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Edit Task Information</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <form>
                                <FormControl mb={4}>
                                    <FormLabel>Employee ID</FormLabel>
                                    <Input name="employeeID" value={editingTask.employeeID} readOnly />
                                </FormControl>
                                <Flex direction={'row'} gap={2}>
                                    <FormControl mb={4}>
                                        <FormLabel>Assign Date</FormLabel>
                                        <Input
                                            name="assignedDate"
                                            type="date"
                                            value={new Date(editingTask.assignedDate).toISOString().slice(0, 10)}
                                            onChange={(e) =>
                                                setEditingTask({
                                                    ...editingTask,
                                                    assignedDate: `${e.target.value}T${new Date(editingTask.assignedDate).toISOString().slice(11, 16)}:00Z`,
                                                })
                                            }
                                        />
                                        <Checkbox onChange={() => setIsTimeNow(!isTimeNow)}>Use Current Time</Checkbox>
                                    </FormControl>
                                    <FormControl mb={4}>
                                        <FormLabel>Assign Time</FormLabel>
                                        <Input
                                            name="assignedDate"
                                            type="time"
                                            value={new Date(editingTask.assignedDate).toISOString().slice(11, 16)}
                                            onChange={(e) =>
                                                setEditingTask({
                                                    ...editingTask,
                                                    assignedDate: `${new Date(editingTask.assignedDate).toISOString().slice(0, 11)}${e.target.value}:00Z`,
                                                })
                                            }
                                        />
                                    </FormControl>
                                </Flex>
                                <FormControl mb={4}>
                                    <FormLabel>Task Type</FormLabel>
                                    <Input name="taskType" value={editingTask.taskType} onChange={handleInputChange} />
                                </FormControl>
                                <FormControl mb={4}>
                                    <FormLabel>Task Description</FormLabel>
                                    <Input
                                        name="taskDescription"
                                        value={editingTask.taskDescription}
                                        onChange={handleInputChange}
                                    />
                                </FormControl>
                                <FormControl mb={4}>
                                    <FormLabel>Status</FormLabel>
                                    <Input name="status" value={editingTask.status} onChange={handleInputChange} />
                                </FormControl>
                                <FormControl mb={4}>
                                    <FormLabel>Flight Number</FormLabel>
                                    <Input
                                        name="flightNumber"
                                        value={editingTask.flightNumber}
                                        onChange={handleInputChange}
                                    />
                                </FormControl>
                            </form>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="blue" mr={3} onClick={handleSave}>
                                Save
                            </Button>
                            <Button variant="ghost" onClick={onClose}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            )}
        </div>
    );
};

export default EmployeeTaskTable;
