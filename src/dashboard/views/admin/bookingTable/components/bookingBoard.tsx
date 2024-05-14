import Search from './search'
import BookingTable from './bookingTable'
import { Flex } from '@chakra-ui/react'

export default function BookingBoard() {
    return (
        <Flex direction={"column"} mt={'3'} gap={2} w={"full"} border={'2px'} borderColor='gray.200' p={4} borderRadius={'5'} bg='white'>
            <Search />
            <BookingTable />
        </Flex >
    )
}
