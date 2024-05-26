import {
    Box,
    Flex,
    Text,
    IconButton,
    Button,
    Stack,
    Collapse,
    Icon,
    Popover,
    PopoverTrigger,
    PopoverContent,
    useColorModeValue,
    useDisclosure,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { FaRegUserCircle, FaPlane, FaRegQuestionCircle } from 'react-icons/fa';
import { PiSignOut } from 'react-icons/pi';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import axiosPrivate from '../../api/axios';

export default function WithSubnavigation() {
    const { isOpen, onToggle } = useDisclosure();
    const { auth, setAuth } = useAuth();
    return (
        <Box>
            <Flex className="top-0 bg-white drop-shadow-md z-50 w-full fixed h-[60px] py-2 px-6 border-b border-solid border-gray-200 items-center">
                <Flex className="flex-1 md:flex-auto -ml-2" display={{ base: 'flex', md: 'none' }}>
                    <IconButton
                        onClick={onToggle}
                        icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
                        variant={'ghost'}
                        aria-label={'Toggle Navigation'}
                    />
                </Flex>
                <Flex className="flex-1 justify-center md:justify-start">
                    <Link to="/">
                        <div className="object-center">
                            <img src="assets/logo-test.png" className="h-auto w-20" alt="" />
                        </div>
                    </Link>
                </Flex>
                <Flex className="my-auto mr-6" display={{ base: 'none', md: 'flex' }}>
                    <DesktopNav />
                </Flex>
                {!auth ? (
                    <Stack flex={{ base: 1, md: 0 }} justify={'flex-end'} direction={'row'} spacing={6}>
                        <Link to="/login" className="my-auto">
                            <Button fontSize={'sm'} fontWeight={500} variant={'link'} color={'slateblue'}>
                                ลงชื่อเข้าใช้งาน
                            </Button>
                        </Link>
                        <Link to="/signup" className="my-auto">
                            <Button
                                as={'a'}
                                display={{ base: 'none', md: 'inline-flex' }}
                                fontSize={'sm'}
                                fontWeight={600}
                                color={'white'}
                                bg={'blue.400'}
                                href={'signup'}
                                _hover={{
                                    bg: 'blue.300',
                                }}
                            >
                                สมัครสมาชิก
                            </Button>
                        </Link>
                    </Stack>
                ) : (
                    <Menu>
                        <MenuButton
                            px={3}
                            py={2}
                            bg="transparent"
                            transition="all 0.2s"
                            borderRadius="md"
                            borderWidth="1px"
                            borderColor={'transparent'}
                            _hover={{ bg: 'gray.100', borderColor: 'gray.200' }}
                            _expanded={{
                                bg: 'gray.100',
                                boxShadow: 'outline',
                            }}
                            _focus={{ bg: 'gray.100' }}
                            as={Button}
                        >
                            <div className="flex text-sm font-normal">
                                <FaRegUserCircle className="text-xl mb-0.5 text-royal-blue-600 mr-2" />
                                <p className="my-auto mr-1">สวัสดี,</p>
                                <p className="my-auto">{auth.firstName}</p>
                            </div>
                        </MenuButton>
                        <MenuList className="" padding={2} marginTop={2} borderY={10} fontSize={'sm'}>
                            <Link to="/profile/flights">
                                <MenuItem borderRadius={4} marginY={1}>
                                    <FaPlane className="mr-3" />
                                    การเดินทางของฉัน
                                </MenuItem>
                            </Link>
                            <Link to="/profile/edit">
                                <MenuItem borderRadius={4} marginY={1}>
                                    <FaRegUserCircle className="mr-3" />
                                    ตั้งค่าบัญชี
                                </MenuItem>
                            </Link>
                            <Link to="/help">
                                <MenuItem borderRadius={4} marginY={1}>
                                    <FaRegQuestionCircle className="mr-3" />
                                    ความช่วยเหลือ
                                </MenuItem>
                            </Link>
                            <MenuItem
                                borderRadius={4}
                                marginY={1}
                                onClick={() => {
                                    localStorage.removeItem('auth');
                                    axiosPrivate.post('/api/logout');
                                    setAuth(null);
                                    window.location.reload();
                                }}
                            >
                                <PiSignOut className="mr-3 text-red-600" />
                                <button>ออกจากระบบ</button>
                            </MenuItem>
                        </MenuList>
                    </Menu>
                )}
            </Flex>

            <Collapse in={isOpen} animateOpacity>
                <MobileNav />
            </Collapse>
        </Box>
    );
}

const DesktopNav = () => {
    const linkColor = useColorModeValue('gray.600', 'gray.200');
    const linkHoverColor = useColorModeValue('gray.800', 'white');
    const popoverContentBgColor = useColorModeValue('white', 'gray.800');

    return (
        <Stack direction={'row'} spacing={4} className="">
            {NAV_ITEMS.map((navItem) => (
                <Box key={navItem.label} className="">
                    <Popover trigger={'hover'} placement={'bottom-start'}>
                        <PopoverTrigger>
                            <Box
                                as="a"
                                p={2}
                                href={navItem.href ?? '#'}
                                fontSize={'sm'}
                                fontWeight={500}
                                color={linkColor}
                                _hover={{
                                    textDecoration: 'none',
                                    color: linkHoverColor,
                                }}
                            >
                                {navItem.label}
                            </Box>
                        </PopoverTrigger>

                        {navItem.children && (
                            <PopoverContent
                                border={0}
                                boxShadow={'xl'}
                                bg={popoverContentBgColor}
                                p={4}
                                rounded={'xl'}
                                minW={'sm'}
                            >
                                <Stack>
                                    {navItem.children.map((child) => (
                                        <DesktopSubNav key={child.label} {...child} />
                                    ))}
                                </Stack>
                            </PopoverContent>
                        )}
                    </Popover>
                </Box>
            ))}
        </Stack>
    );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
    return (
        <Box
            as="a"
            href={href}
            role={'group'}
            display={'block'}
            p={2}
            rounded={'md'}
            _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}
        >
            <Stack direction={'row'} align={'center'}>
                <Box>
                    <Text className="transition-all duration-300 ease text-black group-hover:text-pink-400 font-medium">
                        {label}
                    </Text>
                    <Text className="text-sm">{subLabel}</Text>
                </Box>
                <Flex className="transition-all duration-300 ease transform translate-x-[-10px] opacity-0 group-hover:opacity-100 group-hover:translate-x-0 flex justify-end items-center flex-1">
                    <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
                </Flex>
            </Stack>
        </Box>
    );
};

const MobileNav = () => {
    return (
        <Stack bg={useColorModeValue('white', 'gray.800')} p={4} display={{ md: 'none' }}>
            {NAV_ITEMS.map((navItem) => (
                <MobileNavItem key={navItem.label} {...navItem} />
            ))}
        </Stack>
    );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
    const { isOpen, onToggle } = useDisclosure();

    return (
        <Stack spacing={4} onClick={children && onToggle}>
            <Box
                py={2}
                as="a"
                href={href ?? '#'}
                justifyContent="space-between"
                alignItems="center"
                _hover={{
                    textDecoration: 'none',
                }}
            >
                <Text className="pt-16 font-semibold text-gray-600">{label}</Text>
                {children && (
                    <Icon
                        as={ChevronDownIcon}
                        transition={'all .25s ease-in-out'}
                        transform={isOpen ? 'rotate(180deg)' : ''}
                        w={6}
                        h={6}
                    />
                )}
            </Box>

            <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
                <Stack
                    mt={2}
                    pl={4}
                    borderLeft={1}
                    borderStyle={'solid'}
                    borderColor={useColorModeValue('gray.200', 'gray.700')}
                    align={'start'}
                >
                    {children &&
                        children.map((child) => (
                            <Box as="a" key={child.label} py={2} href={child.href}>
                                {child.label}
                            </Box>
                        ))}
                </Stack>
            </Collapse>
        </Stack>
    );
};

interface NavItem {
    label: string;
    subLabel?: string;
    children?: Array<NavItem>;
    href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
    {
        label: 'จองที่พัก',
        children: [
            {
                label: 'Explore Design Work',
                subLabel: 'Trending Design to inspire you',
                href: '#',
            },
            {
                label: 'New & Noteworthy',
                subLabel: 'Up-and-coming Designers',
                href: '#',
            },
        ],
    },
    {
        label: 'จองตั๋วเครื่องบิน',
        children: [
            {
                label: 'Job Board',
                subLabel: 'Find your dream design job',
                href: '#',
            },
            {
                label: 'สถานที่ท่องเที่ยว',
                subLabel: 'An exclusive list for contract work',
                href: '#',
            },
        ],
    },
    {
        label: 'แพ็กเกจ',
        href: '#',
    },
    {
        label: 'องค์กร',
        href: '#',
    },
];
