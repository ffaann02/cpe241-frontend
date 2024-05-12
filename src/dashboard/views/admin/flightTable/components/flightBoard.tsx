import Search from './search'
import FlightTable from './flightTable'
import { Flex } from '@chakra-ui/react'

export default function flightBoard() {
    return (
        <Flex direction={"column"} mt={'3'} gap={2} w={"full"} border={'2px'} borderColor='gray.200' p={4} borderRadius={'5'} bg='white'>
            <Search />
            <FlightTable />
        </Flex >
    )
}
