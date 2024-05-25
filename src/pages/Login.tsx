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
import loginForeground from '../assets/images/loginForeground.svg';
import { Link, useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import useAuth from '../hooks/useAuth';
import axiosPrivate from '../api/axios';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const loginSchema = z.object({
    email: z.string().email({ message: 'รูปแบบอีเมลไม่ถูกต้อง' }),
    password: z.string().min(8, { message: 'รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัว' }),
});

type LoginPageProps = z.infer<typeof loginSchema>;

export default function LoginPage() {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<LoginPageProps>({ mode: 'onSubmit', reValidateMode: 'onBlur', resolver: zodResolver(loginSchema) });
    const navigate = useNavigate();
    const { setAuth } = useAuth();
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(!show);
    const [loginSuccess, setLoginSuccess] = useState(false);

    const onSubmit = async (data: LoginPageProps) => {
        try {
            const response = await axiosPrivate.post('/api/login', data);
            setAuth({
                userid: response.data.userid,
                role: response.data.role,
                firstName: response.data.firstName,
                email: response.data.email,
            });
            localStorage.setItem('auth', JSON.stringify(response.data));
            setLoginSuccess(true);
            setTimeout(() => {
                navigate('/');
            }, 1500);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setError('root.serverError', {
                    type: 'manual',
                    message: 'ขออภัยอีเมลหรือรหัสผ่านไม่ถูกต้อง โปรดลองอีกครั้ง',
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
                            <p className="text-xl font-bold">Login to your account</p>
                            <p>ยินดีต้อนรับกลับมา! กรุณากรอกข้อมูลเพื่อเข้าสู่ระบบ</p>
                            <Divider className="" />
                            <FormControl isInvalid={!!errors.email}>
                                <Input
                                    name="email"
                                    {...register('email')}
                                    type="text"
                                    placeholder="อีเมล"
                                    autoComplete="email"
                                />
                                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={!!errors.password}>
                                <InputGroup>
                                    <Input
                                        name="password"
                                        type={show ? 'text' : 'password'}
                                        {...register('password')}
                                        placeholder="รหัสผ่าน"
                                        autoComplete="current-password"
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
                            <div className="flex flex-row justify-between">
                                <Checkbox colorScheme="purple">จดจําฉันไว้</Checkbox>
                                <p className="text-royal-blue-500">ลืมรหัสผ่าน?</p>
                            </div>
                            <Button
                                colorScheme={loginSuccess ? 'green' : 'gray'}
                                type="submit"
                                isLoading={isSubmitting}
                                isDisabled={loginSuccess}
                                onClick={() => console.log(errors.email, errors.password)}
                            >
                                {loginSuccess ? <FaCheckCircle /> : 'เข้าสู่ระบบ'}
                            </Button>
                            {errors.root?.serverError && (
                                <p className="text-red-500 text-center">{errors.root.serverError.message}</p>
                            )}
                            <div className="flex flex-row justify-center gap-2">
                                <p>ยังไม่มีบัญชี?</p>
                                <Link to="/signup" className="text-royal-blue-500">
                                    สมัครสมาชิก
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 hidden lg:flex w-1/2">
                        <div className="bg-royal-blue-500">
                            <img src={loginForeground} className="object-contain w-full h-full" />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}
