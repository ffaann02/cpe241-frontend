import { Box, Flex, Button, InputGroup, InputLeftElement, Input } from '@chakra-ui/react';
// Icons
import { SearchIcon, ChevronDownIcon } from '@chakra-ui/icons';

export default function Search({ searchFlightNumber, setSearchFlightNumber }) {
    const handleSearch = (e) => {
        setSearchFlightNumber(e.target.value);
    };

    return (
        <Box w={'full'}>
            {/* Search bar */}
            <InputGroup size={{ base: 'xs', md: 'sm' }} fontSize={{ base: 'sm', md: 'md' }} display={'flex'} className=''>
                <InputLeftElement pointerEvents="none" className="pt-2.5">
                    <SearchIcon color="gray.300" />
                </InputLeftElement>
                <Input
                    borderRadius="md"
                    type="text"
                    placeholder="ค้นหารหัสเที่ยวบิน"
                    paddingY={5}
                    onChange={handleSearch}
                    value={searchFlightNumber}
                    backgroundColor={'white'}
                />
            </InputGroup>
        </Box>
    );
}
