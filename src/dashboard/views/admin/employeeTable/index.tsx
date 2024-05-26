import { Box, Flex } from '@chakra-ui/react';

import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer } from '@chakra-ui/react';

import EmployeeBoard from './components/employeeBoard';

const EmployeeReport = () => {
    return (
        <Flex mt={'3'} w={'full'}>
            <EmployeeBoard />
        </Flex>
    );
};

export default EmployeeReport;
