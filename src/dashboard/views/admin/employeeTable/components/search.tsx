import { Box, Flex, Button, InputGroup, InputLeftElement, Input } from '@chakra-ui/react';
// Icons
import { SearchIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { useDisclosure } from '@chakra-ui/react';
interface SearchProps {
    type: string;
}

export default function Search({ type }: SearchProps) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Box w={'full'}>
            {/* Search bar */}
            <InputGroup size={{ base: 'xs', md: 'sm' }} fontSize={{ base: 'sm', md: 'md' }}>
                <InputLeftElement pointerEvents="none">
                    <SearchIcon color="gray.300" />
                </InputLeftElement>
                {type === 'employee' && <Input borderRadius="md" type="text" placeholder="Search employee name" />}
                {type === 'task' && <Input borderRadius="md" type="text" placeholder="Search employee task" />}
            </InputGroup>
        </Box>
    );
}
