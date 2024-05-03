import {
    Input,
    Checkbox,
    Button,
    FormControl,
    FormErrorMessage,
    Divider,
    InputGroup,
    InputRightElement,
    IconButton,
} from '@chakra-ui/react';
import { IoEyeOffOutline } from 'react-icons/io5';
import { IoEyeOutline } from 'react-icons/io5';
import { useState } from 'react';
import logo from '../assets/logo.png';
import signupForeground from '../assets/images/signupForeground.svg';
import { Link, useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import useAuth from '../hooks/useAuth';
import axiosPrivate from '../api/axios';

interface SignupPageProps {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
}

export default function SignupPage() {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(!show);
    const [invalidInput, setInvalidInput] = useState({
        firstName: true,
        lastName: true,
        email: true,
        password: true,
        phoneNumber: true,
        checked: true,
    });
    const [isFetching, setIsFetching] = useState(false);
    const [signupError, setSignupError] = useState('');
    const [signupSuccess, setSignupSuccess] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [signup, setSignup] = useState<SignupPageProps>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phoneNumber: '',
    });

    const navigate = useNavigate();

    const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSignup((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(e.target.checked);
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        if (
            !signup.email ||
            !signup.password ||
            !signup.firstName ||
            !signup.lastName ||
            !signup.phoneNumber ||
            !isChecked ||
            !confirmPassword ||
            signup.password !== confirmPassword
        ) {
            setInvalidInput({
                email: !!signup.email,
                password: !!signup.password,
                firstName: !!signup.firstName,
                lastName: !!signup.lastName,
                phoneNumber: !!signup.phoneNumber,
                checked: !!isChecked,
            });
            if (!confirmPassword) {
                setConfirmPasswordError('กรุณากรอกรหัสผ่านยืนยัน');
            } else if (signup.password !== confirmPassword) {
                setConfirmPasswordError('รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน');
            } else {
                setConfirmPasswordError('');
            }
            return;
        }
        setInvalidInput((prevState) => ({ ...prevState, checked: true }));
        registerUser();
    };

    const { setAuth } = useAuth();

    const registerUser = async (): Promise<void> => {
        try {
            setIsFetching(true);
            const response = await axiosPrivate.post('/api/signup', signup);
            if (response.status === 200) {
                setIsFetching(false);
                setAuth({
                    userid: response.data.userid,
                    role: response.data.role,
                    firstName: response.data.firstName,
                    email: response.data.email,
                });
                localStorage.setItem('auth', JSON.stringify(response.data));
                setSignupError('');
                setSignupSuccess(true);
                setTimeout(() => {
                    navigate('/');
                }, 1500);
            } else {
                console.log('Error');
            }
        } catch (error) {
            if (error.response.status === 400) {
                setSignupError('ข้อมูลไม่ถูกต้อง โปรดลองอีกครั้ง');
                setIsFetching(false);
            } else if (error.response.status === 409) {
                setSignupError('ขออภัยมีอีเมลนี้อยู่ในระบบแล้ว โปรดลองอีกครั้ง');
                setIsFetching(false);
            } else {
                setSignupError('เกิดข้อผิดพลาดภายในเซิฟเวอร์ โปรดลองในภายหลัง');
                setIsFetching(false);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center">
            <div className="max-w-screen-xl m-0 sm:m-10 bg-white drop-shadow-lg sm:rounded-lg flex justify-center flex-1">
                <div className="flex-1 hidden lg:flex w-1/2 ">
                    <div className="bg-royal-blue-600">
                        <img src={signupForeground} className="object-contain w-full h-full" />
                    </div>
                </div>
                <div className="flex flex-col gap-3 mx-auto lg:w-1/2 p-6 sm:p-12">
                    <Link to="/" className="">
                        <div className="text-royal-blue-500 flex flex-row items-center gap-1">
                            <svg
                                width="8"
                                height="12"
                                viewBox="0 0 8 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M6.70994 2.11997L2.82994 5.99997L6.70994 9.87997C7.09994 10.27 7.09994 10.9 6.70994 11.29C6.31994 11.68 5.68994 11.68 5.29994 11.29L0.709941 6.69997C0.319941 6.30997 0.319941 5.67997 0.709941 5.28997L5.29994 0.699971C5.68994 0.309971 6.31994 0.309971 6.70994 0.699971C7.08994 1.08997 7.09994 1.72997 6.70994 2.11997V2.11997Z"
                                    fill="#605dec"
                                />
                            </svg>
                            กลับสู่หน้าหลัก
                        </div>
                    </Link>
                    <div className="flex flex-col gap-3 my-auto">
                        <div className="w-32 my-1">
                            <img src={logo} />
                        </div>
                        <p className="text-xl font-bold">Signup</p>
                        <p>ยินดีต้อนรับสู่ครอบครัวอดาโก้ กรุณากรอกข้อมูลเพื่อสมัครสมาชิก</p>
                        <Divider className="" />
                        <FormControl isInvalid={!invalidInput.firstName}>
                            <Input
                                isRequired
                                type="text"
                                name="firstName"
                                placeholder="ชื่อจริง"
                                onChange={handleSignupChange}
                            />
                            <FormErrorMessage>กรุณากรอกชื่อจริง</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!invalidInput.lastName}>
                            <Input
                                isRequired
                                type="text"
                                name="lastName"
                                placeholder="นามสกุล"
                                onChange={handleSignupChange}
                            />
                            <FormErrorMessage>กรุณากรอกนามสกุล</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!invalidInput.email}>
                            <Input
                                isRequired
                                type="email"
                                name="email"
                                placeholder="อีเมล"
                                onChange={handleSignupChange}
                            />
                            <FormErrorMessage>กรุณากรอกอีเมล</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!invalidInput.password}>
                            <InputGroup>
                                <Input
                                    isRequired
                                    type={show ? 'text' : 'password'}
                                    name="password"
                                    placeholder="รหัสผ่าน"
                                    onChange={handleSignupChange}
                                />
                                <InputRightElement className="">
                                    <IconButton
                                        aria-label="show-password"
                                        onClick={handleShow}
                                        icon={show ? <IoEyeOffOutline size="1.5rem" /> : <IoEyeOutline size="1.5rem" />}
                                    />
                                </InputRightElement>
                            </InputGroup>
                            <FormErrorMessage>กรุณากรอกรหัสผ่าน</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!confirmPasswordError}>
                            <InputGroup>
                                <Input
                                    isRequired
                                    type={show ? 'text' : 'password'}
                                    name="confirm-password"
                                    placeholder="ยืนยันรหัสผ่าน"
                                    onChange={handleConfirmPasswordChange}
                                />
                                <InputRightElement className="">
                                    <IconButton
                                        aria-label="show-password"
                                        onClick={handleShow}
                                        icon={show ? <IoEyeOffOutline size="1.5rem" /> : <IoEyeOutline size="1.5rem" />}
                                    />
                                </InputRightElement>
                            </InputGroup>
                            <FormErrorMessage>{confirmPasswordError}</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!invalidInput.phoneNumber}>
                            <Input
                                isRequired
                                type="text"
                                name="phoneNumber"
                                placeholder="เบอร์โทรศัพท์"
                                onChange={handleSignupChange}
                            />
                            <FormErrorMessage>กรุณากรอกเบอร์โทรศัพท์</FormErrorMessage>
                        </FormControl>
                        <div className="flex flex-row gap-1">
                            <FormControl isInvalid={!invalidInput.checked}>
                                <Checkbox colorScheme="purple" isChecked={isChecked} onChange={handleCheckboxChange}>
                                    ท่านยอมรับ<span className="text-royal-blue-500">ข้อกำหนดการใช้งาน</span> และ
                                    <span className="text-royal-blue-500">นโยบายความเป็นส่วนตัว</span>
                                    ของอดาโก้
                                </Checkbox>
                                <FormErrorMessage>ต้องยอมรับข้อกําหนดการใช้งาน</FormErrorMessage>
                            </FormControl>
                        </div>
                        <Button
                            colorScheme={signupSuccess ? 'green' : 'gray'}
                            onClick={handleSubmit}
                            isLoading={isFetching}
                            isDisabled={signupSuccess}
                        >
                            {signupSuccess ? <FaCheckCircle /> : 'สมัครสมาชิก'}
                        </Button>
                        {signupError && <p className="text-red-500 text-center">{signupError}</p>}
                        <div className="flex flex-row justify-center gap-2">
                            <p>มีบัญชีอยู่แล้ว?</p>
                            <Link to="/login" className="text-royal-blue-500">
                                เข้าสู่ระบบ
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
