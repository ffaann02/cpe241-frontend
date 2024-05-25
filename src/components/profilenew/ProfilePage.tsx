import { useEffect, useState } from 'react';
import Datepicker from 'react-tailwindcss-datepicker';
import { Textarea } from '@chakra-ui/react';
import { Editable, EditableInput, EditableTextarea, EditablePreview } from '@chakra-ui/react';
import { FormControl, FormLabel, FormErrorMessage, FormHelperText } from '@chakra-ui/react';
import { Input } from '@chakra-ui/react';
import { Button, ButtonGroup } from '@chakra-ui/react';

// import axiosPrivate from '../api/axios';

interface ProfileProps {
    firstName: string;
    lastName: string;
    gender: string;
    dateOfBirth: string;
    phoneNumber: string;
    address: string;
    idCard: string;
}

export default function ProfilePage() {
    const [profile, setProfile] = useState<ProfileProps>({
        firstName: 'Theetawat',
        lastName: 'Purahong',
        gender: 'Female',
        dateOfBirth: '',
        phoneNumber: '0658647153',
        address: 'มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี 126 ถนนประชาอุทิศ แขวงบางมด เขตทุ่งครุ กรุงเทพฯ 10140',
        idCard: '1709901503207',
    });

    const handleDateOfBirthChange = (newValue) => {
        setProfile({ ...profile, dateOfBirth: newValue.startDate });
    };

    const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfile((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProfile((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // useEffect(() => {
    //     const fetchProfile = async () => {
    //         try {
    //             const response = await axiosPrivate.get('/api/profile');
    //             console.log(response)
    //         } catch (error) {
    //             console.error('An error occurred while fetching the profile:', error);
    //             // handle the error here
    //         }
    //     };

    //     fetchProfile();
    // }, []);

    return (
        <div className="">
            <div className="mb-8"></div>
            <div className="flex flex-row gap-8">
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900  my-auto">ชื่อ</label>
                    <div className="w-96 ">
                        <Input
                            name="firstName"
                            placeholder=""
                            size="lg"
                            value={profile.firstName}
                            onChange={handleProfileChange}
                        />
                    </div>
                </div>
                <div>
                    <label className="block mb-2  text-sm font-medium text-gray-900 my-auto">นามสกุล</label>
                    <div className="w-96">
                        <Input
                            name="lastName"
                            placeholder=""
                            size="lg"
                            value={profile.lastName}
                            onChange={handleProfileChange}
                        />
                    </div>
                </div>
            </div>

            <div className="pt-8 flex flex-row gap-8">
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 ">เพศ</label>
                    <div>
                        <FormControl>
                            <select className="w-96 form-select sm:max-w-md text-sm p-2.5 rounded-lg bg-gray-50 border  placeholder-black">
                                <option>ชาย</option>
                                <option>หญิง</option>
                            </select>
                        </FormControl>
                    </div>
                </div>
                <div className="">
                    <label className="block mb-2 text-sm font-medium text-gray-900 my-auto ">วัน/เดือน/ปี เกิด</label>
                    <div className="col-span-2 relative w-96" id="datepicker ">
                        <Datepicker
                            asSingle={true}
                            value={{
                                startDate: profile.dateOfBirth,
                                endDate: profile.dateOfBirth,
                                // startDate: dateOfBirth,
                                // endDate: dateOfBirth,
                            }}
                            onChange={handleDateOfBirthChange}
                            popoverDirection="down"
                            inputClassName="h-full  bg-gray-50 border  placeholder-black  border w-full px-4 py-[0.6rem] rounded-md text-slate-500 outline-none 
                        focus:outline-2"
                            displayFormat="DD/MM/YYYY"
                        />
                    </div>
                </div>
            </div>
            <div className="flex flex-row gap-8">
                <div className="pt-8">
                    <div className="sm:max-w-md space-x-4">
                        <input className="peer/draft" type="radio" name="status" checked />
                        <label className="mb-2 text-sm font-medium text-gray-900">หมายเลขบัตรประชาชน</label>
                        <input className="peer/published" type="radio" name="status" />
                        <label className="mb-2 text-sm font-medium text-gray-900">เลขที่หนังสือเดินทาง</label>
                    </div>
                    <div className="w-96">
                        <Input
                            placeholder=""
                            size="lg"
                            name="idCard"
                            value={profile.idCard}
                            onChange={handleProfileChange}
                        />
                    </div>
                </div>

                <div className="sm:max-w-md pt-8">
                    <label className="block mb-1 text-sm font-medium text-gray-900">หมายเลขโทรศัพท์</label>
                    <div className="w-96">
                        <Input
                            placeholder=""
                            size="lg"
                            name="phoneNumber"
                            value={profile.phoneNumber}
                            onChange={handleProfileChange}
                        />
                    </div>
                </div>
            </div>
            <div className="pt-4">
                <label className="block mb-2 text-sm font-medium text-gray-900">ที่อยู่</label>
                <div className="w-2/3 rounded-lg">
                    <Textarea
                        placeholder=""
                        rows={5}
                        name="address"
                        value={profile.address}
                        onChange={handleTextareaChange}
                    />
                </div>
            </div>
            <div className="pt-4">
                <div className="pt-4 w-2/3">
                    <label>
                        โปรดกรอกแบบฟอร์มสมัครสมาชิกตามความเป็นจริง
                        ข้อมูลเหล่านี้จะใช้ในการรักษาสิทธ์ของท่านในการใช้บริการ หรือกรณีที่ตั๋วเครื่องบินหาย
                        รวมถึงการติดต่อกลับในการแจ้งรายละเอียดเที่ยวบินต่างๆ และสิทธิพิเศษของสมาชิกเว็บไซต์ AGADO
                        โดยบริษัทฯ จะถือว่าข้อมูลดังกล่าวเป็นความลับ
                    </label>
                </div>
                <div className="flex pt-8">
                    <div></div>
                    <Button colorScheme="purple" size="lg" className="">
                        Edit
                    </Button>
                </div>
            </div>
        </div>
    );
}
