// Layouts and components
import {
    Box,
    Center,
    Text,
    Flex,
    IconButton,
    Button,
    Heading,
    Divider,
    Stack,
} from '@chakra-ui/react'

// Menu 
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
} from '@chakra-ui/react'


// Icons
import {
    SearchIcon,
    BellIcon,
    ChevronDownIcon,
    ExternalLinkIcon,
    HamburgerIcon,
    ArrowForwardIcon,
} from '@chakra-ui/icons'


export default function Header() {
    return (
        <Flex flexDirection={'column'} align={'center'} p={0} m={0} w='full' h='auto' gap={5}>
            {/* First row */}
            <Flex flexDirection={'row'} justify={'space-between'} w={{ base: '100%' }} h='auto' gap='2'>
                <Box w='auto' h='auto' >
                    <Heading color='gray.900'>Flight</Heading>
                </Box>
                <Flex w='auto' h='auto' gap={2} >
                    {/* Search Icon */}
                    <IconButton isRound={true} aria-label='Search' icon={<SearchIcon />} bg='gray.50' />
                    {/* Notification Icon */}
                    <IconButton isRound={true} aria-label='Notification' icon={<BellIcon />} bg='gray.50' />
                    {/* Drop down Menu */}
                    <Menu>
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />} bg='gray.50' border={5}>
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
            <Flex flexDirection={'row'} justify={'space-between'} w={{ base: '100%', }} h='auto' gap='2'>
                {/* Search Result */}
                <Center w='auto' h='auto' >
                    <Stack direction='row' spacing={4}>
                        <Flex flexDirection={'row'} align={'center'} gap={2}>
                            <Text fontSize='md' fontWeight={'normal'} color='gray.900'>Jakarta</Text>
                            <ArrowForwardIcon color='gray.500' />
                            <Text fontSize='md' fontWeight={'normal'} color='gray.900' >Bali</Text>
                        </Flex>
                        <Button size='sm' fontWeight={'normal'} borderRadius={'md'} variant={'outline'}>
                            Edit Search
                        </Button>
                    </Stack>
                </Center>
                {/* Filter and Exports */}
                <Box w='auto' h='auto' >
                    <Stack direction='row' spacing={2}>

                        <Button size='sm' leftIcon={<HamburgerIcon />} fontWeight={'normal'} borderRadius={'md'} variant={'outline'}>
                            Filters
                        </Button>
                        <Button size='sm' leftIcon={<ExternalLinkIcon />} fontWeight={'normal'} borderRadius={'md'} variant={'outline'}>
                            Exports
                        </Button>
                    </Stack>
                </Box>
            </Flex>
            {/* Divider */}
            <Center mb={{ base: '2', lg: '5' }} w={{ base: '100%', lg: '80%' }} >
                <Divider color='gray.50' />
            </Center>
        </Flex>
    )
}