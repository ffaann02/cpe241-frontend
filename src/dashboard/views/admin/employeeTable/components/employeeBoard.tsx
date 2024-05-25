import Search from './search';
import EmployeeTable, { EmployeeInfo } from './employeeTable';
import EmployeeTaskTable from './employeeTaskTable';
import { Flex } from '@chakra-ui/react';
import { EditIcon, AddIcon, DeleteIcon } from '@chakra-ui/icons';

import React, { useState } from 'react';
import { useDisclosure, Button, Input, FormControl, FormLabel, Select } from '@chakra-ui/react';

export default function employeeBoard() {
    return (
        <div className="overflow-x-scroll">
            <Flex
                direction={'column'}
                mt={'3'}
                gap={2}
                w={'full'}
                border={'2px'}
                borderColor="gray.200"
                p={4}
                borderRadius={'5'}
                bg="white"
            >
                <Flex direction="row" align="center" gap={2}>
                    <Search type="employee" />
                </Flex>
                <EmployeeTable />
            </Flex>
            <Flex
                direction={'column'}
                mt={'3'}
                gap={2}
                w={'full'}
                border={'2px'}
                borderColor="gray.200"
                p={4}
                borderRadius={'5'}
                bg="white"
            >
                <Search type="task" />
                <EmployeeTaskTable />
            </Flex>
        </div>
    );
}
