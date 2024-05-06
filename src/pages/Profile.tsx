import { useEffect, useState } from 'react';
import Header from '../components/login-registerPage/LoginHeader';
import Signup from '../components/login-registerPage/Signup';

import { Editable, EditableInput, EditableTextarea, EditablePreview } from '@chakra-ui/react';
import { FormControl, FormLabel, FormErrorMessage, FormHelperText } from '@chakra-ui/react';
import { Input } from '@chakra-ui/react';
import { Button, ButtonGroup } from '@chakra-ui/react'
import axiosPrivate from '../api/axios';




export default function ProfilePage() {
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axiosPrivate.get('/api/profile');
                console.log(response)
            } catch (error) {
                console.error('An error occurred while fetching the profile:', error);
                // handle the error here
            }
        };
    
        fetchProfile();
    }, []);

    return (
        <div className="w-full flex">
            <section className="grid grid-cols-7 gap-x-4 pt-8 max-w-5xl mx-auto w-full">
                <div className="col-span-2 justify-center sm:px-6 lg:px-8">
                    <div className="bg-violet-400 w-10 h-10 p-4 rounded-full flex mt-10">
                        <p className="my-auto text-center">T</p>
                    </div>
                    <div className='justify-center'>
                    <div className="block mb-2  text-sm font-medium text-gray-900 hover:text-slate-300 pt-4">ตั๋วของฉัน</div>
                    <div className="block mb-2  text-sm font-medium text-gray-900 hover:text-slate-300 pt-4">ประวัติการสั่งซื้อ</div>
                    <div className="block mb-2  text-sm font-medium text-gray-900 hover:text-slate-300 pt-4">แก้ไขข้อมูลส่วนตัว</div>
                    <div className="block mb-2  text-sm font-medium text-gray-900 hover:text-slate-300 pt-4">เปลี่ยนรหัสผ่าน</div>
                    <div className="block mb-2  text-sm font-medium text-gray-900 hover:text-slate-300 pt-4">ออกจากระบบ</div>
                    </div>
                </div>

                <div className=" flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 col-span-5 border-l-2 border-violet-400">
                <div className="sm:mx-auto sm:w-full sm:max-w-md font-medium text-center text-2xl">ข้อมูลส่วนตัว</div>

                    <div className="justify-center sm:mx-auto sm:w-full sm:max-w-md pt-10">
                        <label className="block mb-2  text-sm font-medium text-gray-900">ชื่อ</label>
                        <Editable
                            defaultValue="Theetawat"
                            className="sm:mx-auto sm:w-full sm:max-w-md text-sm p-2.5 rounded-lg bg-gray-50 border border-gray-300 placeholder-black border-violet-400"
                        >
                            <EditablePreview className="" />
                            <EditableTextarea className="" />
                        </Editable>
                    </div>
                    <div className="justify-center  sm:mx-auto sm:w-full sm:max-w-md pt-4">
                        <label className="block mb-2  text-sm font-medium text-gray-900">นามสกุล</label>
                        <Editable
                            defaultValue="Purahong"
                            className="sm:mx-auto sm:w-full sm:max-w-md text-sm p-2.5 rounded-lg bg-gray-50 border border-gray-300 placeholder-black border-violet-400"
                        >
                            <EditablePreview className="" />
                            <EditableTextarea className="" />
                        </Editable>
                    </div>
                    <div className="justify-center  sm:mx-auto sm:w-full sm:max-w-md pt-4">
                        <label className="block mb-2 text-sm font-medium text-gray-900">เพศ</label>
                        <FormControl>
                            <select className="form-select sm:mx-auto sm:w-full sm:max-w-md text-sm p-2.5 rounded-lg bg-gray-50 border  placeholder-black border-violet-400">
                                <option>ชาย</option>
                                <option>หญิง</option>
                            </select>
                        </FormControl>
                    </div>
                    <div className="justify-center sm:mx-auto sm:w-full sm:max-w-md pt-4">
                        <label className="block mb-2 text-sm font-medium text-gray-900">วัน/เดือน/ปี เกิด</label>
                    </div>
                    <div className="grid grid-cols-3 gap-4 justify-center sm:mx-auto sm:w-full sm:max-w-md">
                        <div>
                            <Editable
                                defaultValue="16"
                                className="sm:mx-auto sm:w-full sm:max-w-md text-sm p-2.5 rounded-lg bg-gray-50 border  placeholder-black border-violet-400"
                            >
                                <EditablePreview className="" />
                                <EditableTextarea className="" />
                            </Editable>
                        </div>
                        <div>
                            <Editable
                                defaultValue="12"
                                className="sm:mx-auto sm:w-full sm:max-w-md text-sm p-2.5 rounded-lg bg-gray-50 border  placeholder-black border-violet-400"
                            >
                                <EditablePreview className="" />
                                <EditableTextarea className="" />
                            </Editable>
                        </div>
                        <div>
                            <Editable
                                defaultValue="2003"
                                className="sm:mx-auto sm:w-full sm:max-w-md text-sm p-2.5 rounded-lg bg-gray-50 border  placeholder-black border-violet-400"
                            >
                                <EditablePreview className="" />
                                <EditableTextarea className="" />
                            </Editable>
                        </div>
                    </div>
                    <div className="justify-center sm:mx-auto sm:w-full sm:max-w-md pt-4 space-x-4">
                        <input className="peer/draft" type="radio" name="status" checked />
                        <label className="">หมายเลขบัตรประชาชน</label>
                        <input className="peer/published" type="radio" name="status" />
                        <label className="">เลขที่หนังสือเดินทาง</label>
                    </div>
                    <Editable
                        defaultValue="17099015030207"
                        className="sm:mx-auto sm:w-full sm:max-w-md text-sm p-2.5 rounded-lg bg-gray-50 border  placeholder-black border-violet-400"
                    >
                        <EditablePreview className="" />
                        <EditableTextarea className="" />
                    </Editable>
                    <div className="justify-center sm:mx-auto sm:w-full sm:max-w-md pt-4">
                        <label className="block mb-2 text-sm font-medium text-gray-900">หมายเลขโทรศัพท์</label>
                        <Editable
                            defaultValue="0658647153"
                            className="sm:mx-auto sm:w-full sm:max-w-md text-sm p-2.5 rounded-lg bg-gray-50 border  placeholder-black border-violet-400"
                        >
                            <EditablePreview className="" />
                            <EditableTextarea className="" />
                        </Editable>
                    </div>
                    <div className="justify-center sm:mx-auto sm:w-full sm:max-w-md pt-4">
                        <label className="block mb-2 text-sm font-medium text-gray-900">ที่อยู่</label>
                        <Editable
                            defaultValue="4-chōme-2-8 Shibakōen, Minato City, Tokyo 105-0011 ญี่ปุ่น"
                            className="sm:mx-auto sm:w-full sm:max-w-md text-sm py-10 px-2.5 rounded-lg bg-gray-50 border  placeholder-black border-violet-400"
                        >
                            <EditablePreview className="" />
                            <EditableTextarea className="" />
                        </Editable>
                    </div>
                    <div className="justify-center sm:mx-auto sm:w-full sm:max-w-md pt-4">
                        <div className="grid grid-cols-7">
                            <div className='col-span-2'>
                            <label className="block  text-sm w-40 font-medium text-gray-900 py-4">ประเทศ</label>
                            <label className="block  text-sm w-40 font-medium text-gray-900 py-6">จังหวัด</label>
                            <label className="block  text-sm w-40 font-medium text-gray-900 py-6">เขต/อำเภอ</label>
                            <label className="block  text-sm w-40 font-medium text-gray-900 py-6">รหัสไปรษณีย์</label>
                            </div>
                            <div className='col-span-5'>
                            <div>
                            <Editable
                                defaultValue="ไทย"
                                className="sm:mx-auto sm:w-full sm:max-w-md text-sm p-2.5 rounded-lg bg-gray-50 border placeholder-black border-violet-400"
                            >
                                <EditablePreview className="" />
                                <EditableTextarea className="" />
                            </Editable>
                            </div>
                            <div className='pt-4'>
                            <Editable
                                defaultValue="ประจวบคีครีขันธ์"
                                className="sm:mx-auto sm:w-full sm:max-w-md text-sm p-2.5 rounded-lg bg-gray-50 border placeholder-black border-violet-400"
                            >
                                <EditablePreview className="" />
                                <EditableTextarea className="" />
                            </Editable>
                            </div>
                            <div className='pt-4'>
                            <Editable
                                defaultValue="หัวหิน"
                                className="sm:mx-auto sm:w-full sm:max-w-md text-sm p-2.5 rounded-lg bg-gray-50 border border-violet-400 placeholder-black"
                            >

                                <EditablePreview className="" />
                                <EditableTextarea className="" />
                            </Editable>
                            </div>
                            <div className='pt-4'>
                            <Editable
                                defaultValue="77110"
                                className="sm:mx-auto sm:w-full sm:max-w-md text-sm p-2.5 rounded-lg bg-gray-50 border border-violet-400 placeholder-black"
                            >
                                <EditablePreview className="" />
                                <EditableTextarea className="" />
                            </Editable>
                            </div>
                            </div>
                        </div>
                        <div className='pt-4'>
                            <label>
                            โปรดกรอกแบบฟอร์มสมัครสมาชิกตามความเป็นจริง ข้อมูลเหล่านี้จะใช้ในการรักษาสิทธ์ของท่านในการใช้บริการ หรือกรณีที่ตั๋วเครื่องบินหาย 
                            รวมถึงการติดต่อกลับในการแจ้งรายละเอียดเที่ยวบินต่างๆ และสิทธิพิเศษของสมาชิกเว็บไซต์ AGADO โดยบริษัทฯ จะถือว่าข้อมูลดังกล่าวเป็นความลับ
                            </label>
                        </div>
                        <div className='flex justify-between pt-8'>
                        <div></div>
                        <Button colorScheme='purple' size='lg' className=''>Edit</Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
