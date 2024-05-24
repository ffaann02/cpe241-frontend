import React, { useState } from 'react';
import { Table, Thead, Tbody, TableCaption, TableContainer, Tr, Th, Td } from '@chakra-ui/react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import { EditIcon, AddIcon, DeleteIcon } from '@chakra-ui/icons';
import { useDisclosure, Button, Input, FormControl, FormLabel, Select, Flex } from '@chakra-ui/react';

export interface EmployeeInfo {
    employeeID: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    department: string;
    position: string;
    salary: string;
    startDate: string;
    endDate: string;
    permissionLevel: number;
}

const EmployeeTable: React.FC = () => {
    const [employeeData, setEmployeeData] = useState<EmployeeInfo[]>([
        {
            employeeID: 1,
            firstName: 'John',
            lastName: 'Doe',
            email: 'jdoe@bu.edu',
            phoneNumber: '123-456-890',
            department: 'CPE 241',
            position: 'Developer',
            salary: '$50,000',
            startDate: '2024-05-12T10:00:00Z',
            endDate: '',
            permissionLevel: 1,
        },
        {
            employeeID: 2,
            firstName: 'Jane',
            lastName: 'King',
            email: 'JaneK@KK.fu',
            phoneNumber: '267-456-789',
            department: 'CPE 241',
            position: 'Developer',
            salary: '$150,000',
            startDate: '2024-05-12T10:00:00Z',
            endDate: '2024-05-12T13:30:00Z',
            permissionLevel: 2,
        },
        {
            employeeID: 3,
            firstName: 'Bob',
            lastName: 'Smith',
            email: 'BobS@basd.weu',
            phoneNumber: '919-456-790',
            department: 'CPE 241',
            position: 'Developer',
            salary: '$70,000',
            startDate: '2024-05-12T10:00:00Z',
            endDate: '',
            permissionLevel: 3,
        },
    ]);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [isAdd, setIsAdd] = useState<boolean>(false);
    const [isDelete, setIsDelete] = useState<boolean>(false);
    const [editEmployeeInfo, setEditEmployeeInfo] = useState<EmployeeInfo>({
        employeeID: 0,
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        department: '',
        position: '',
        salary: '',
        startDate: '',
        endDate: '',
        permissionLevel: 0,
    });

    const [startDate, setStartDate] = useState<string>('');
    const [startTime, setStartTime] = useState<string>('');

    const handleEdit = (index: number) => {
        setIsEdit(true);
        setIsAdd(false);
        setIsDelete(false);
        setEditIndex(index);
        const employee = employeeData[index];
        setEditEmployeeInfo(employee);
        setStartDate(employee.startDate.split('T')[0]);
        setStartTime(employee.startDate.split('T')[1].slice(0, 5));
        onOpen();
    };

    const handleDelete = (index: number) => {
        setIsEdit(false);
        setIsAdd(false);
        setIsDelete(true);
        setEditIndex(index);
        const employee = employeeData[index];
        setEditEmployeeInfo(employee);
        setStartDate(employee.startDate.split('T')[0]);
        setStartTime(employee.startDate.split('T')[1].slice(0, 5));
        onOpen();
    };

    const handleIDSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedID = Number(event.target.value);
        const selectedEmployee = employeeData.find(emp => emp.employeeID === selectedID);

        if (selectedEmployee) {
            setEditEmployeeInfo(selectedEmployee);
            const index = employeeData.findIndex(emp => emp.employeeID === selectedID);
            setEditIndex(index);
            setStartDate(selectedEmployee.startDate.split('T')[0]);
            setStartTime(selectedEmployee.startDate.split('T')[1].slice(0, 5));
        }
    };

    const handleAdd = () => {
        setIsEdit(false);
        setIsAdd(true);
        setIsDelete(false);
        setEditEmployeeInfo({
            employeeID: 0,
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            department: '',
            position: '',
            salary: '',
            startDate: '',
            endDate: '',
            permissionLevel: 0,
        });
        setStartDate('');
        setStartTime('');
        onOpen();
    };

    const handleSave = (isEdit: boolean) => {
        const updatedEmployeeInfo = {
            ...editEmployeeInfo,
            startDate: `${startDate}T${startTime}:00Z`
        };

        if (isEdit) {
            if (editIndex !== null) {
                const updatedEmployeeData = [...employeeData];
                if (isDelete) {
                    updatedEmployeeData[editIndex].endDate = new Date().toISOString();
                } else {
                    updatedEmployeeData[editIndex] = updatedEmployeeInfo;
                }
                setEmployeeData(updatedEmployeeData);
            }
        } else {
            const newEmployee: EmployeeInfo = {
                ...updatedEmployeeInfo,
                employeeID: employeeData.length + 1,
            };
            setEmployeeData([...employeeData, newEmployee]);
        }

        onClose();
        setEditIndex(null);
        setIsDelete(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditEmployeeInfo({ ...editEmployeeInfo, [name]: value });
    };

    return (
        <div>
            <Modal isOpen={isOpen} onClose={onClose} isCentered motionPreset="slideInBottom">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{isDelete ? 'Delete Employee' : isAdd ? 'Add Employee' : 'Edit Employee Information'}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            {!isAdd && <FormLabel>Employee ID</FormLabel>}
                            {!isAdd && <Select name="employeeID" onChange={handleIDSelectChange} value={editEmployeeInfo.employeeID}>
                                {employeeData.map((employee) => (
                                    <option key={employee.employeeID} value={employee.employeeID}>
                                        {employee.employeeID}
                                    </option>
                                ))}
                            </Select>}
                        </FormControl>
                        <FormControl>
                            <FormLabel>First name</FormLabel>
                            <Input name="firstName" value={editEmployeeInfo.firstName} onChange={handleInputChange} />
                        </FormControl>
                        <FormControl mt={1}>
                            <FormLabel>Last name</FormLabel>
                            <Input name="lastName" value={editEmployeeInfo.lastName} onChange={handleInputChange} />
                        </FormControl>
                        {!isDelete && <FormControl mt={1}>
                            <FormLabel>Email</FormLabel>
                            <Input name="email" value={editEmployeeInfo.email} onChange={handleInputChange} />
                        </FormControl>}
                        {!isDelete && <FormControl mt={1}>
                            <FormLabel>Phone number</FormLabel>
                            <Input name="phoneNumber" value={editEmployeeInfo.phoneNumber} onChange={handleInputChange} />
                        </FormControl>}
                        {!isDelete && <FormControl mt={1}>
                            <FormLabel>Department</FormLabel>
                            <Input name="department" value={editEmployeeInfo.department} onChange={handleInputChange} />
                        </FormControl>}
                        <FormControl mt={1}>
                            <FormLabel>Position</FormLabel>
                            <Input name="position" value={editEmployeeInfo.position} onChange={handleInputChange} />
                        </FormControl>
                        {!isDelete && <FormControl mt={1}>
                            <FormLabel>Salary</FormLabel>
                            <Input name="salary" value={editEmployeeInfo.salary} onChange={handleInputChange} />
                        </FormControl>}
                        <Flex direction={'row'} gap={2}>
                            <FormControl mt={1}>
                                <FormLabel>Start date</FormLabel>
                                <Input name="startDate" type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)} />
                            </FormControl>
                            <FormControl mt={1}>
                                <FormLabel>Start time</FormLabel>
                                <Input name="startTime" type="time"
                                    value={startTime}
                                    onChange={(e) => setStartTime(e.target.value)} />
                            </FormControl>
                        </Flex>
                        {!isDelete && <FormControl mt={1}>
                            <FormLabel>Permission level</FormLabel>
                            <Input name="permissionLevel" value={editEmployeeInfo.permissionLevel} onChange={handleInputChange} />
                        </FormControl>}
                    </ModalBody>
                    <ModalFooter>
                        {!isAdd && <Button colorScheme="blue" mr={3} onClick={() => handleSave(true)}>
                            Save Changes
                        </Button>}
                        {isAdd && <Button colorScheme="green" onClick={() => handleSave(false)}>
                            Add Employee
                        </Button>}
                        <Button variant="ghost" onClick={onClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <TableContainer className="overflow-x-scroll">
                <div className='float-right'>
                    <EditIcon className="mr-2" cursor="pointer" onClick={() => handleEdit(editIndex ?? 0)} />
                    <AddIcon className="mr-2" cursor="pointer" onClick={handleAdd} />
                    <DeleteIcon className="mr-2" cursor="pointer" onClick={() => handleDelete(editIndex ?? 0)} />
                </div>
                <Table variant="simple">
                    <TableCaption>Current Flight Operations</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Employee ID</Th>
                            <Th>First Name</Th>
                            <Th>Last Name</Th>
                            <Th>Email</Th>
                            <Th>Phone Number</Th>
                            <Th>Department</Th>
                            <Th>Position</Th>
                            <Th>Salary</Th>
                            <Th>Start Date</Th>
                            <Th>End Date</Th>
                            <Th>Permission Level</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {employeeData.map((employee, index) => (
                            <Tr key={index}>
                                <Td>{employee.employeeID}</Td>
                                <Td>{employee.firstName}</Td>
                                <Td>{employee.lastName}</Td>
                                <Td>{employee.email}</Td>
                                <Td>{employee.phoneNumber}</Td>
                                <Td>{employee.department}</Td>
                                <Td>{employee.position}</Td>
                                <Td>{employee.salary}</Td>
                                <Td>{new Date(employee.startDate).toLocaleString()}</Td>
                                <Td>{employee.endDate ? new Date(employee.endDate).toLocaleString() : ''}</Td>
                                <Td>{employee.permissionLevel}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default EmployeeTable;
