// Layouts and components
import { Box, Flex, Button, InputGroup, InputLeftElement, Input } from '@chakra-ui/react';

// Icons
import { SearchIcon, ChevronDownIcon } from '@chakra-ui/icons';

// Menu
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';

export default function HistoryAndSearch() {
    return (
        <Flex flexDirection={'row'} w={{ base: '100%', lg: '80%' }} h="auto" gap="2" mb={{ base: '2' }}>
            <Box w="100%" h="auto">
                <Flex flexDirection="row" gap={2}>
                    {/* Drop down history */}
                    <Box>
                        <Menu>
                            <MenuButton
                                borderRadius="md"
                                fontWeight="normal"
                                size={{ base: 'xs', md: 'sm' }}
                                fontSize={{ base: 'sm', md: 'md' }}
                                variant="outline"
                                color="gray.500"
                                as={Button}
                                rightIcon={<ChevronDownIcon />}
                            >
                                All Times
                            </MenuButton>
                            <MenuList color="gray.900" fontSize={{ base: 'xs', md: 'sm' }}>
                                <MenuItem>Profile</MenuItem>
                                <MenuItem>Create a Copy</MenuItem>
                                <MenuItem>Mark as Draft</MenuItem>
                                <MenuItem>Delete</MenuItem>
                                <MenuItem>Attend a Workshop</MenuItem>
                            </MenuList>
                        </Menu>
                    </Box>
                    {/* Search bar */}
                    <InputGroup
                        size={{ base: 'xs', md: 'sm' }}
                        fontSize={{ base: 'sm', md: 'md' }}
                        w={{ base: 'full', sm: '30%' }}
                        maxWidth={{ base: 'unset', sm: '30%' }}
                    >
                        <InputLeftElement pointerEvents="none">
                            <SearchIcon color="gray.300" />
                        </InputLeftElement>
                        <Input borderRadius="md" type="text" placeholder="Search airline name" />
                    </InputGroup>
                </Flex>
            </Box>
        </Flex>
    );
}
