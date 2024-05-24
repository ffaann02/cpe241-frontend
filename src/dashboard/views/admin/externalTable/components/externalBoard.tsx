import Search from '../../userTable/components/search'
import ExternalTable from './externalTable'
import { Flex } from '@chakra-ui/react'

export default function externalBoard() {
    return (
        <div className='overflow-x-scroll'>
        <Flex direction={"column"} mt={'3'} gap={2} w={"full"} border={'2px'} borderColor='gray.200' p={4} borderRadius={'5'} bg='white'>
            <Search />

            <ExternalTable />
        </Flex >
        </div>
    )
}
