import Search from '../../userTable/components/search'
import UserTable from './userTable'
import { Flex } from '@chakra-ui/react'

export default function userBoard() {
    return (
        <div className='overflow-x-scroll'>
        <Flex direction={"column"} mt={'3'} gap={2} w={"full"} border={'2px'} borderColor='gray.200' p={4} borderRadius={'5'} bg='white'>
            <Search />

            <UserTable />
        </Flex >
        </div>
    )
}
