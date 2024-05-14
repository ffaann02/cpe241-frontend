import Search from './search'
import EmployeeTable from './employeeTable'
import EmployeeTaskTable from './employeeTaskTable'
import { Flex } from '@chakra-ui/react'

export default function employeeBoard() {
    return (
        <div className="overflow-x-scroll">
            <Flex direction={"column"} mt={'3'} gap={2} w={"full"} border={'2px'} borderColor='gray.200' p={4} borderRadius={'5'} bg='white'>
                <Search type='employee'/>
                <EmployeeTable />
            </Flex >
            <Flex direction={"column"} mt={'3'} gap={2} w={"full"} border={'2px'} borderColor='gray.200' p={4} borderRadius={'5'} bg='white'>
                <Search type='task'/>
                <EmployeeTaskTable />
            </Flex >
        </div>
    )
}
