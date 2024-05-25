import { Box, Flex } from '@chakra-ui/react';

import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer } from '@chakra-ui/react';

import ExternalBoard from './components/externalBoard';

const ExternalReport = () => {
    return (
        <Flex mt={'3'}>
            <ExternalBoard />
        </Flex>
    );
};

export default ExternalReport;
