// Layouts and components
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react';

import { Box, Center, Text, Flex, IconButton, Button, Heading, Divider, Stack } from '@chakra-ui/react';

// Menu
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';

// Icons
import {
    SearchIcon,
    BellIcon,
    ChevronDownIcon,
    ExternalLinkIcon,
    HamburgerIcon,
    ArrowForwardIcon,
} from '@chakra-ui/icons';

export default function Header() {
    return (
        <Flex flexDirection={'column'} align={'center'} p={0} m={0} w="full" h="auto" gap={5}>
            {/* First row */}
            <Flex flexDirection={'row'} justify={'space-between'} w={{ base: '100%' }} h="auto" gap="2">
                <Box w="auto" h="auto">
                    <div className="flex flex-column gap-4">
                        <Avatar src="https://bit.ly/broken-link" />
                        <Heading color="gray.900">Profile</Heading>
                    </div>
                </Box>
                <Flex w="auto" h="auto" gap={2}>
                    {/* Search Icon */}
                    <IconButton isRound={true} aria-label="Search" icon={<SearchIcon />} bg="gray.50" />
                    {/* Notification Icon */}
                    <IconButton isRound={true} aria-label="Notification" icon={<BellIcon />} bg="gray.50" />
                    {/* Drop down Menu */}
                    <Menu>
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />} bg="gray.50" border={5}>
                            Username
                        </MenuButton>
                        <MenuList color={'gray.900'}>
                            <MenuItem>Profile</MenuItem>
                            <MenuItem>Create a Copy</MenuItem>
                            <MenuItem>Mark as Draft</MenuItem>
                            <MenuItem>Delete</MenuItem>
                            <MenuItem>Attend a Workshop</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </Flex>
            {/* Second row */}

            {/* Divider */}
            <Center mb={{ base: '2', lg: '5' }} w={{ base: '100%', lg: '80%' }}>
                <Divider color="gray.50" />
            </Center>
        </Flex>
    );
}
