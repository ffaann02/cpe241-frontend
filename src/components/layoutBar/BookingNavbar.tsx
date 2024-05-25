import {
    Box,
    Button,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Step,
    StepIcon,
    StepIndicator,
    StepNumber,
    StepSeparator,
    StepStatus,
    StepTitle,
    Stepper,
    useSteps,
} from '@chakra-ui/react';
import Logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { BookingDetailsContext } from '../../context/BookingDetailsProvider';
import { FaPlane, FaRegQuestionCircle, FaRegUserCircle } from 'react-icons/fa';
import axiosPrivate from '../../api/axios';
import { PiSignOut } from 'react-icons/pi';
import useAuth from '../../hooks/useAuth';
const steps = [{ title: 'กรอกผู้โดยสาร' }, { title: 'เลือกที่นั่ง' }, { title: 'ชำระเงิน' }, { title: 'ยืนยันการจอง' }];

const BookingNavbar = () => {
    const { step } = useContext(BookingDetailsContext);
    const { auth, setAuth } = useAuth();
    return (
        <div className="fixed flex w-full bg-white drop-shadow-md z-[100] -mt-[60px]">
            <div className="m-auto max-w-6xl w-full flex gap-x-12 h-16 px-4">
                <Link to="/">
                    <div className="h-full py-4">
                        <img src={Logo} className="h-full w-20" />
                    </div>
                </Link>
                <Stepper index={step} className="w-full">
                    {steps.map((step, index) => (
                        <Step key={index}>
                            <StepIndicator>
                                <StepStatus
                                    complete={<StepIcon />}
                                    incomplete={<StepNumber />}
                                    active={<StepNumber />}
                                />
                            </StepIndicator>

                            <Box flexShrink="0">
                                <StepTitle>{step.title}</StepTitle>
                            </Box>

                            <StepSeparator />
                        </Step>
                    ))}
                </Stepper>
                <div className="my-auto">
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
                </div>
            </div>
        </div>
    );
};
export default BookingNavbar;
