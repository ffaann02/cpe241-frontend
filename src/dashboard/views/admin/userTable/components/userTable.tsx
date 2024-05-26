import React, { useState } from 'react';
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer } from '@chakra-ui/react';

export interface UserInfo {
    userID: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
}

const userTable: React.FC = () => {
    const [userData, setUserData] = useState<UserInfo[]>([
        {
            userID: '23c5ed1a-c35d-4085-8f8e-15831926cede',
            firstName: 'รุดฟาน',
            lastName: 'ไมมะหาด',
            email: 'admin_faan1@gmail.com',
            password: '$2b$10$dnfqU2Kaq02VVMqmFSiyY.CNxse8VTfmWcPH/jhPf2fvmfxz6J/gW',
            phoneNumber: '0000000000',
        },
        {
            userID: 'e08456f2-a950-47f2-80c9-1358254283ec',
            firstName: 'นวพล',
            lastName: 'พรมนันท์',
            email: 'nawapon.promnan0@gmail.com',
            password: '$2b$10$UatLb8i24.SXWxkY49uLnuBjbslB6ArIr4E5FZijKjGW.4oykyFLy',
            phoneNumber: '0929832702',
        },
        {
            userID: '764ca2b4-1525-4f16-be5c-81534a18b5cc',
            firstName: 'อภิชาติ',
            lastName: 'เอี่ยมอิ่มภัค',
            email: 'apichataimimpat@gmail.com',
            password: '$2b$10$DCc6YkR8xR7rO5n5SF1euOaXjstUkNsfQ1eUXR7xO0MmhPW2vICQy',
            phoneNumber: '0983522011',
        },
    ]);

    return (
        <TableContainer>
            <Table variant="simple">
                <TableCaption>Current User Operations</TableCaption>
                <Thead>
                    <Tr>
                        <Th>User ID</Th>
                        <Th>FirstName</Th>
                        <Th>LastName</Th>
                        <Th>email</Th>
                        {/* <Th>password</Th> */}
                        <Th>phoneNumber</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {userData.map((user, index) => (
                        <Tr key={index}>
                            <Td>{user.userID}</Td>
                            <Td>{user.firstName}</Td>
                            <Td>{user.lastName}</Td>
                            <Td>{user.email}</Td>
                            {/* <Td>{user.password}</Td> */}
                            <Td>{user.phoneNumber}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
};

export default userTable;
