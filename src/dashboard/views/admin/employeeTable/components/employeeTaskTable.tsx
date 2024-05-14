import React, { useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';

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
  const [employeeTask, setemployeeTask] = useState<EmployeeTaskInfo[]>([
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

  return (
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
          </Tr>
        </Thead>
        <Tbody>
          {employeeTask.map((employeeTask, index) => (
            <Tr key={index}>
              <Td>{employeeTask.employeeID}</Td>
              <Td>{employeeTask.firstName}</Td>
              <Td>{employeeTask.lastName}</Td>
              <Td>{new Date(employeeTask.assignedDate).toLocaleString()}</Td>
              <Td>{employeeTask.taskType}</Td>
              <Td>{employeeTask.taskDescription}</Td>
              <Td>{employeeTask.status}</Td>
              <Td>{employeeTask.flightNumber}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default EmployeeTaskTable;