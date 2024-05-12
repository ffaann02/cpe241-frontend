import {
    Box,
    Flex,
    Button,
    InputGroup,
    InputLeftElement,
    Input,
} from '@chakra-ui/react'
// Icons
import {
    SearchIcon,
    ChevronDownIcon,
} from '@chakra-ui/icons'


export default function Search() {
    return (
        <Box w={'full'}>
            {/* Search bar */}
            <InputGroup
                size={{ base: 'xs', md: 'sm' }}
                fontSize={{ base: 'sm', md: 'md' }}
            >
                <InputLeftElement pointerEvents='none'>
                    <SearchIcon color='gray.300' />
                </InputLeftElement>
                <Input borderRadius='md' type='text' placeholder='Search airline name' />
            </InputGroup>
        </Box>
    )
};
