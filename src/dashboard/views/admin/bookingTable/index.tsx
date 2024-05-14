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
    
import BookingBoard from "./components/bookingBoard";

const BookingTable = () => {
    return (
        <Flex mt={'3'}>
            <BookingBoard />
        </Flex>
    );
};

export default BookingTable;
