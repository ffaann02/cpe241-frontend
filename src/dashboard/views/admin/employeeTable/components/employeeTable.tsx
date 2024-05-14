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
  const [employeeData, setemployeeData] = useState<EmployeeInfo[]>([
    {
      employeeID: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'jdoe@bu.edu',
      phoneNumber: '123-456-7890',
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
      lastName: 'Doe',
      email: 'jdoe@bu.edu',
      phoneNumber: '123-456-7890',
      department: 'CPE 241',
      position: 'Developer',
      salary: '$50,000',
      startDate: '2024-05-12T10:00:00Z',
      endDate: '2024-05-12T13:30:00Z',
      permissionLevel: 2,
    },
    {
      employeeID: 3,
      firstName: 'Bob',
      lastName: 'Smith',
      email: 'jdoe@bu.edu',
      phoneNumber: '123-456-7890',
      department: 'CPE 241',
      position: 'Developer',
      salary: '$50,000',
      startDate: '2024-05-12T10:00:00Z',
      endDate: '',
      permissionLevel: 3,
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
              <Td>{new Date(employee.endDate).toLocaleString()}</Td>
              <Td>{employee.permissionLevel}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default EmployeeTable;