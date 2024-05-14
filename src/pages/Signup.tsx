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
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const signupSchema = z
    .object({
        firstName: z.string().min(2, { message: 'ชื่อจริงต้องมีความยาวอย่างน้อย 2 ตัว' }),
        lastName: z.string().min(2, { message: 'นามสกุลต้องมีความยาวอย่างน้อย 2 ตัว' }),
        email: z.string().email({ message: 'รูปแบบอีเมลไม่ถูกต้อง' }),
        password: z.string().min(8, { message: 'รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัว' }),
        confirmPassword: z.string().min(8, { message: 'รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัว' }),
        phoneNumber: z.string().min(10, { message: 'เบอร์โทรศัพท์ต้องมีความยาวอย่างน้อย 10 ตัว' }),
        checked: z.literal(true, {
            errorMap: () => ({ message: 'กรุณายอมรับข้อกำหนดการใช้งานและนโยบายความเป็นส่วนตัว' }),
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'รหัสผ่านและการยืนยันรหัสผ่านต้องตรงกัน',
        path: ['confirmPassword'],
    });

type SignupPageProps = z.infer<typeof signupSchema>;

export default function SignupPage() {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<SignupPageProps>({ mode: 'onSubmit', reValidateMode: 'onBlur', resolver: zodResolver(signupSchema) });
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(!show);
    const [signupSuccess, setSignupSuccess] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    const navigate = useNavigate();

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(e.target.checked);
    };

    const { setAuth } = useAuth();

    const onSubmit = async (data: SignupPageProps) => {
        try {
            const response = await axiosPrivate.post('/api/signup', {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: data.password,
                phoneNumber: data.phoneNumber,
            });
            setAuth({
                userid: response.data.userid,
                role: response.data.role,
                firstName: response.data.firstName,
                email: response.data.email,
            });
            localStorage.setItem('auth', JSON.stringify(response.data));
            setSignupSuccess(true);
            setTimeout(() => {
                navigate('/');
            }, 1500);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setError('root.serverError', {
                    type: 'manual',
                    message: 'ขออภัยข้อมูลไม่ถูกต้อง โปรดลองอีกครั้ง',
                });
            } else if (error.response && error.response.status === 409) {
                setError('root.serverError', {
                    type: 'manual',
                    message: 'ขออภัยมีอีเมลนี้อยู่ในระบบแล้ว โปรดลองอีกครั้ง',
                });
            } else {
                console.log('Error: Internal server error');
                setError('root.serverError', {
                    type: 'manual',
                    message: 'เกิดข้อผิดพลาดภายในเซิฟเวอร์ โปรดลองในภายหลัง',
                });
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
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
                            <FormControl isInvalid={!!errors.firstName}>
                                <Input
                                    {...register('firstName')}
                                    isRequired
                                    type="text"
                                    name="firstName"
                                    placeholder="ชื่อจริง"
                                    autoComplete='given-name'
                                />
                                <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={!!errors.lastName}>
                                <Input
                                    {...register('lastName')}
                                    isRequired
                                    type="text"
                                    name="lastName"
                                    placeholder="นามสกุล"
                                    autoComplete='family-name'
                                />
                                <FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={!!errors.email}>
                                <Input {...register('email')} isRequired type="text" name="email" placeholder="อีเมล" />
                                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={!!errors.password}>
                                <InputGroup>
                                    <Input
                                        {...register('password')}
                                        isRequired
                                        type={show ? 'text' : 'password'}
                                        name="password"
                                        placeholder="รหัสผ่าน"
                                        autoComplete='new-password'
                                    />
                                    <InputRightElement className="">
                                        <IconButton
                                            aria-label="show-password"
                                            onClick={handleShow}
                                            icon={
                                                show ? (
                                                    <IoEyeOffOutline size="1.5rem" />
                                                ) : (
                                                    <IoEyeOutline size="1.5rem" />
                                                )
                                            }
                                        />
                                    </InputRightElement>
                                </InputGroup>
                                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={!!errors.confirmPassword}>
                                <InputGroup>
                                    <Input
                                        {...register('confirmPassword')}
                                        isRequired
                                        type={show ? 'text' : 'password'}
                                        name="confirmPassword"
                                        placeholder="ยืนยันรหัสผ่าน"
                                        autoComplete='new-password'
                                    />
                                    <InputRightElement className="">
                                        <IconButton
                                            aria-label="show-password"
                                            onClick={handleShow}
                                            icon={
                                                show ? (
                                                    <IoEyeOffOutline size="1.5rem" />
                                                ) : (
                                                    <IoEyeOutline size="1.5rem" />
                                                )
                                            }
                                        />
                                    </InputRightElement>
                                </InputGroup>
                                <FormErrorMessage>{errors.confirmPassword?.message}</FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={!!errors.phoneNumber}>
                                <Input
                                    {...register('phoneNumber')}
                                    isRequired
                                    type="text"
                                    name="phoneNumber"
                                    placeholder="เบอร์โทรศัพท์"
                                    autoComplete='tel-national'
                                />
                                <FormErrorMessage>{errors.phoneNumber?.message}</FormErrorMessage>
                            </FormControl>
                            <div className="flex flex-row gap-1">
                                <FormControl isInvalid={!!errors.checked}>
                                    <Checkbox
                                        {...register('checked')}
                                        type="checkbox"
                                        colorScheme="purple"
                                        isChecked={isChecked}
                                        onChange={handleCheckboxChange}
                                    >
                                        ท่านยอมรับ<span className="text-royal-blue-500">ข้อกำหนดการใช้งาน</span> และ
                                        <span className="text-royal-blue-500">นโยบายความเป็นส่วนตัว</span>
                                        ของอดาโก้
                                    </Checkbox>
                                    <FormErrorMessage>{errors.checked?.message}</FormErrorMessage>
                                </FormControl>
                            </div>
                            <Button
                                type="submit"
                                colorScheme={signupSuccess ? 'green' : 'gray'}
                                isLoading={isSubmitting}
                                isDisabled={signupSuccess}
                            >
                                {signupSuccess ? <FaCheckCircle /> : 'สมัครสมาชิก'}
                            </Button>
                            {errors.root?.serverError && (
                                <p className="text-red-500 text-center">{errors.root.serverError.message}</p>
                            )}
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
        </form>
    );
}
