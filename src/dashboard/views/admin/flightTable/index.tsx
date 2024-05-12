import {
    Box,
    Flex
} from "@chakra-ui/react"

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
} from '@chakra-ui/react'

import FlightBoard from './components/flightBoard'

const FlightReport = () => {
    return (
        <Flex mt={'3'}>
            <FlightBoard/>
        </Flex>
    );
};

export default FlightReport;
