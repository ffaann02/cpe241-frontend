import React, { useState } from 'react';
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer } from '@chakra-ui/react';

export interface ExternalInfo {
    externalServiceID: string;
    ticketNo: string;
    serviceType: string;
    serviceDetail: string;
    serviceFee: string;
}

const externalTable: React.FC = () => {
    const [externalData, setUserData] = useState<ExternalInfo[]>([
        {
            externalServiceID: '',
            ticketNo: '',
            serviceType: '',
            serviceDetail: '',
            serviceFee: '',
        },
    ]);

    return (
        <TableContainer>
            <Table variant="simple">
                <TableCaption>Current External Service Operations</TableCaption>
                <Thead>
                    <Tr>
                        <Th>User ID</Th>
                        <Th>FirstName</Th>
                        <Th>LastName</Th>
                        <Th>email</Th>
                        <Th>phoneNumber</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {externalData.map((external, index) => (
                        <Tr key={index}>
                            <Td>{external.externalServiceID}</Td>
                            <Td>{external.ticketNo}</Td>
                            <Td>{external.serviceType}</Td>
                            <Td>{external.serviceDetail}</Td>
                            <Td>{external.serviceFee}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
};

export default externalTable;
