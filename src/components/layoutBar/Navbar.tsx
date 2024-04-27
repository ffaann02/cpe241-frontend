// import { Link } from "react-router-dom";
// import { Avatar } from '@chakra-ui/react'
// import { Menu, MenuButton, MenuList, MenuItem} from '@chakra-ui/react'
// // import logoTest from "/assets/logo-test.png";

// interface NavbarProps {
//   isLoggedIn: boolean;
// }
// function Navbar({ isLoggedIn }: NavbarProps) {
//   return (
//     <>
//       <div className="navbar bg-base-100 shadow-sm rounded-md rounded-b-none fixed px-12 z-50">
//         <div className="navbar-start">
//           <div className="dropdown">
//             <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
//             </div>
//             <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
//               <li>
//                 <a>จองที่พัก</a>
//                 <ul className="p-2">
//                   <li><a>Submenu 1</a></li>
//                   <li><a>Submenu 2</a></li>
//                 </ul>
//               </li>
//               <li><Link to="/booking"><a>จองตั๋วเครื่องบิน</a></Link></li>
//               <li><a>สถานที่ท่องเที่ยว</a></li>
//               <li><a>แพ็กเกจ</a></li>
//               <li><a>องค์กร</a></li>
//             </ul>
//           </div>
//           {/* <Link to="/"><img src={logoTest} className="w-20"/></Link> */}
//           <Link to="/"><a>LOGO</a></Link>
//         </div>
//         <div className="navbar-center hidden lg:flex">
//           <ul className="menu menu-horizontal px-1">
//             <li>
//               <details>
//                 <summary>จองที่พัก</summary>
//                 <ul className="p-2">
//                   <li><a>Submenu 1</a></li>
//                   <li><a>Submenu 2</a></li>
//                 </ul>
//               </details>
//             </li>
//             <li><Link to="/booking"><a>จองตั๋วเครื่องบิน</a></Link></li>
//             <li><a>สถานที่ท่องเที่ยว</a></li>
//             <li><a>แพ็กเกจ</a></li>
//             <li><a>องค์กร</a></li>
//           </ul>
//         </div>
//         <div className="navbar-end justify-end">
//           <a className="btn mx-5 bg-base-100 border-hidden">ติดต่อเพิ่มเติม</a>
//           {!isLoggedIn && <Link to="/login" className="btn mx-5 bg-base-600 shadow-md">เข้าสู่ระบบ</Link>}
//           {!isLoggedIn && <Link to="/SignUp" className="btn mr-5 bg-purple-600 text-white shadow-md">ลงทะเบียน</Link>}
//           {isLoggedIn && <Menu>
//             <MenuButton as={Avatar} src='https://bit.ly/broken-link' />
//             <MenuList>
//               <MenuItem>ข้อมูลผู้ใช้</MenuItem>
//               <MenuItem>ประวัติการจอง</MenuItem>
//             </MenuList>
//           </Menu>}
//         </div>
//       </div>
//     </>
//   );
// }

// export default Navbar;

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
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react'
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons'

export default function WithSubnavigation() {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <Box>
      <Flex className = "top-0 z-50 w-full fixed bg-white min-h-[60px] py-2 px-4 border-b border-solid border-gray-200 items-center">
        <Flex className= 'flex-1 md:flex-auto -ml-2'
          display={{ base: 'flex', md: 'none' }}>
          <IconButton
            onClick={onToggle}
            icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex className='flex-1 justify-center md:justify-start' >
          <Text className='text-gray-800 text-center md:text-left'
            fontFamily={'heading'}>
                    <div className="object-center px-20">
                        <img src="assets/logo-test.png" className="h-auto w-20" alt="" />
                    </div>
          </Text>

          <Flex className='ml-10' 
            display={{ base: 'none', md: 'flex' }}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}>
          <Button as={'a'} fontSize={'sm'} fontWeight={400} variant={'link'} href={'#'}>
            Sign In
          </Button>
          <Button
            as={'a'}
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'sm'}
            fontWeight={600}
            color={'white'}
            bg={'pink.400'}
            href={'#'}
            _hover={{
              bg: 'pink.300',
            }}>
            Sign Up
          </Button>
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  )
}

const DesktopNav = () => {
  const linkColor = useColorModeValue('gray.600', 'gray.200')
  const linkHoverColor = useColorModeValue('gray.800', 'white')
  const popoverContentBgColor = useColorModeValue('white', 'gray.800')

  return (
    <Stack direction={'row'} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
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
                }}>
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
                minW={'sm'}>
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
  )
}

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Box
      as="a"
      href={href}
      role={'group'}
      display={'block'}
      p={2}
      rounded={'md'}
      _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}>
      <Stack direction={'row'} align={'center'}>
        <Box>
          <Text className='transition-all duration-300 ease text-black group-hover:text-pink-400 font-medium'>
            {label}
          </Text>
          <Text className='text-sm'>{subLabel}</Text>
        </Box>
        <Flex className='transition-all duration-300 ease transform translate-x-[-10px] opacity-0 group-hover:opacity-100 group-hover:translate-x-0 flex justify-end items-center flex-1'>
          <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Box>
  )
}

const MobileNav = () => {
  return (
    <Stack bg={useColorModeValue('white', 'gray.800')} p={4} display={{ md: 'none' }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  )
}

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure()

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
        }}>
        <Text className='pt-16 font-semibold text-gray-600'>
          {label}
        </Text>
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
          align={'start'}>
          {children &&
            children.map((child) => (
              <Box as="a" key={child.label} py={2} href={child.href}>
                {child.label}
              </Box>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  )
}

interface NavItem {
  label: string
  subLabel?: string
  children?: Array<NavItem>
  href?: string
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
]