import { Box, Flex } from '@chakra-ui/react';

import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer } from '@chakra-ui/react';

import UserBoard from './components/userBoard';

const UserReport = () => {
    return (
        <Flex mt={'3'} w={'100%'}>
            <UserBoard />
        </Flex>
    );
};

export default UserReport;
