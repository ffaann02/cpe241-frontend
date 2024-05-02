import {
    Input,
    HStack,
    Checkbox,
    Button,
    FormControl,
    FormErrorMessage,
    Divider,
    InputGroup,
    InputRightElement,
    IconButton,
} from '@chakra-ui/react';
import placeholder from '../assets/images/placeholder.svg';
import { IoEyeOffOutline } from 'react-icons/io5';
import { IoEyeOutline } from 'react-icons/io5';
import { useState } from 'react';

export default function LoginPage() {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(!show);

    return (
        <HStack className="h-screen">
            <div className="w-1/2">
                <div className="flex flex-col gap-3 mx-36">
                    {/* Add Agado Image */}
                    <p className="text-xl font-bold">Login to your Account</p>
                    <p>ยินดีต้อนรับกลับมา! กรุณากรอกข้อมูลเพื่อเข้าสู่ระบบ</p>
                    <Divider className="" />
                    <FormControl>
                        <Input type="email" placeholder="อีเมล" />
                    </FormControl>
                    <FormControl>
                        <InputGroup>
                            <Input type={show ? 'text' : 'password'} placeholder="รหัสผ่าน" />
                            <InputRightElement className="">
                                <IconButton
                                    aria-label="show-password"
                                    onClick={handleShow}
                                    icon={show ? <IoEyeOffOutline size="1.5rem" /> : <IoEyeOutline size="1.5rem" />}
                                />
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>
                    <div className="flex flex-row justify-between">
                        <Checkbox colorScheme="purple">Remember me</Checkbox>
                        <p className="text-royal-blue-500">ลืมรหัสผ่าน?</p>
                    </div>
                    <Button>เข้าสู่ระบบ</Button>
                    <div className="flex flex-row justify-center gap-2">
                        <p>ยังไม่มีบัญชี?</p>
                        <p className="text-royal-blue-500">สมัครสมาชิก</p>
                    </div>
                </div>
            </div>
            <div className="w-1/2 h-screen">
                <img className="object-contain" src={placeholder} />
            </div>
        </HStack>
    );
}
