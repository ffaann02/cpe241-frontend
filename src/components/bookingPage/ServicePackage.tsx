import { Checkbox } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { BookingDetailsContext } from '../../context/BookingDetailsProvider';

export const initServicePackage = {
    name: '',
    price: 0,
};

export const initTravelInsurance = {
    isIncluded: false,
    price: 0,
};

const ServicePackage = ({
    servicePackageData,
    travelInsuranceData,
    onSelectServicePackage,
    onToggleTravelInsurance,
}) => {
    const [bookingData, setBookingData] = useState({
        selectedPackage: initServicePackage,
        travelInsurance: initTravelInsurance,
    });

    const handleSelectPackage = (packageName, price) => {
        const selectedPackage = {
            name: packageName,
            price: price,
        };
        setBookingData((prevData) => ({
            ...prevData,
            selectedPackage: selectedPackage,
        }));
        onSelectServicePackage(selectedPackage);
    };

    const handleToggleTravelInsurance = (isChecked) => {
        const travelInsurance = {
            isIncluded: isChecked,
            price: isChecked ? 230 : 0,
        };

        setBookingData((prevData) => ({
            ...prevData,
            travelInsurance: travelInsurance,
        }));

        onToggleTravelInsurance(travelInsurance);
    };

    return (
        <div className="text-slate-500">
            <h1 className="font-bold text-xl">บริการเสริม</h1>
            <div className="mt-4 border rounded-lg shadow-md p-5">
                <p className="font-medium text-lg">แพ็คเกจการบริการ</p>
                <p className="text-sm mb-6">
                    เลือกรับบริการช่วยเหลือแบบพรีเมียม - รับบริการที่รวดเร็วยิ่งขึ้นจากเจ้าหน้าที่ของเรา
                </p>
                <div className="grid grid-cols-4 gap-4 text-sm divide-x">
                    <div></div>
                    <a
                        className={`col-start-2 justify-center items-center border rounded-lg cursor-pointer ${bookingData.selectedPackage.name === 'Basic' ? 'bg-gray-200' : ''}`}
                        onClick={(e) => handleSelectPackage('Basic', 0)}
                    >
                        <div className="flex justify-center m-2">
                            <Checkbox
                                size={'md'}
                                className="cursor-pointer"
                                isChecked={bookingData.selectedPackage.name === 'Basic'}
                            />
                        </div>
                        <p className="flex justify-center font-bold m-2">เบสิก</p>
                        <p className="flex justify-center font-bold m-2">฿ 0</p>
                    </a>
                    <a
                        className={`col-start-3 justify-center items-center border rounded-lg cursor-pointer ${bookingData.selectedPackage.name === 'Plus' ? 'bg-gray-200' : ''}`}
                        onClick={(e) => handleSelectPackage('Plus', 331)}
                    >
                        <div className="flex justify-center m-2">
                            <Checkbox
                                size={'md'}
                                className="cursor-pointer"
                                isChecked={bookingData.selectedPackage.name === 'Plus'}
                            />
                        </div>
                        <p className="flex justify-center font-bold m-2">พลัส</p>
                        <p className="flex justify-center font-bold m-2">฿ 331</p>
                    </a>
                    <a
                        className={`col-start-4 justify-center items-center border rounded-lg cursor-pointer ${bookingData.selectedPackage.name === 'Premium' ? 'bg-gray-200' : ''}`}
                        onClick={(e) => handleSelectPackage('Premium', 736)}
                    >
                        <div className="flex justify-center m-2">
                            <Checkbox
                                size={'md'}
                                className="cursor-pointer"
                                isChecked={bookingData.selectedPackage.name === 'Premium'}
                            />
                        </div>
                        <p className="flex justify-center font-bold m-2">พรีเมียม</p>
                        <p className="flex justify-center font-bold m-2">฿ 736</p>
                    </a>
                    <div className="flex text-center">
                        <p>บริการช่วยเหลือแบบไลฟ์ทุกวัน 24 ชั่วโมง</p>
                    </div>
                    <div className="flex justify-center items-center">
                        <p>ได้รับ</p>
                    </div>
                    <div className="flex justify-center items-center">
                        <p>ได้รับ</p>
                    </div>
                    <div className="flex justify-center items-center">
                        <p className="text-green-500">ได้รับ</p>
                    </div>
                    <div className="flex text-center">
                        <p>รับความช่วยเหลือจากฝ่ายลูกค้าสัมพันธ์ก่อนใคร</p>
                    </div>
                    <div className="flex justify-center items-center">
                        <p>ไม่ได้รับ</p>
                    </div>
                    <div className="flex justify-center items-center">
                        <p>รวดเร็ว</p>
                    </div>
                    <div className="flex justify-center items-center">
                        <p className="text-green-500">รวดเร็วที่สุด</p>
                    </div>
                    <div className="flex text-center">
                        <p>ค่าธรรมเนียมการแก้ไขหรือยกเลิกการจองของอกาโด้</p>
                    </div>
                    <div className="flex justify-center items-center">
                        <p>฿ 735</p>
                    </div>
                    <div className="flex justify-center items-center">
                        <p>฿ 367</p>
                    </div>
                    <div className="flex justify-center items-center">
                        <p className="text-green-500">ฟรี</p>
                    </div>
                </div>
            </div>
            <div className="mt-4 border rounded-lg shadow-md p-5">
                <h1 className="font-medium text-lg">คุณต้องการคุ้มครองการเดินทางหรือไม่?</h1>
                <p className="text-base">คุ้มครองตลอดทริปไม่ว่าคุณจะเดินทางไปที่ใด</p>
                <div className="grid grid-cols-10 border rounded-lg mt-5 py-2">
                    <div className="flex justify-center">
                        <Checkbox
                            size={'md'}
                            className="cursor-pointer"
                            isChecked={bookingData.travelInsurance.isIncluded}
                            onChange={(e) => handleToggleTravelInsurance(e.target.checked)}
                        />
                    </div>
                    <div className="col-span-9">
                        <span className="text-sm">ฉันต้องการประกันภัยการเดินทาง ฿ 230</span>
                        <div className="flex">
                            <svg
                                width="1em"
                                height="1em"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                className="SvgIconstyled__SvgIconStyled-sc-1i6f60b-0 fvZryX"
                            >
                                <path d="M21.453 4.487l1.094 1.026a.5.5 0 0 1 .023.707L10.412 19.188a1.25 1.25 0 0 1-1.692.122l-.104-.093-7.146-7.146a.5.5 0 0 1 0-.707l1.06-1.061a.5.5 0 0 1 .707 0l6.234 6.234L20.746 4.51a.5.5 0 0 1 .707-.023z"></path>
                            </svg>
                            <p className="text-xs ml-2">คุ้มครองการบอกเลิกการเดินทาง ครอบคลุมสาเหตุจากโรค Covid-19</p>
                        </div>
                        <div className="flex">
                            <svg
                                width="1em"
                                height="1em"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                className="SvgIconstyled__SvgIconStyled-sc-1i6f60b-0 fvZryX"
                            >
                                <path d="M21.453 4.487l1.094 1.026a.5.5 0 0 1 .023.707L10.412 19.188a1.25 1.25 0 0 1-1.692.122l-.104-.093-7.146-7.146a.5.5 0 0 1 0-.707l1.06-1.061a.5.5 0 0 1 .707 0l6.234 6.234L20.746 4.51a.5.5 0 0 1 .707-.023z"></path>
                            </svg>
                            <p className="text-xs ml-2">
                                ชดเชยการสูญเสีย/เสียหายของกระเป๋าเดินทาง และ/หรือทรัพย์สินส่วนตัว
                            </p>
                        </div>
                        <div className="flex">
                            <svg
                                width="1em"
                                height="1em"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                className="SvgIconstyled__SvgIconStyled-sc-1i6f60b-0 fvZryX"
                            >
                                <path d="M21.453 4.487l1.094 1.026a.5.5 0 0 1 .023.707L10.412 19.188a1.25 1.25 0 0 1-1.692.122l-.104-.093-7.146-7.146a.5.5 0 0 1 0-.707l1.06-1.061a.5.5 0 0 1 .707 0l6.234 6.234L20.746 4.51a.5.5 0 0 1 .707-.023z"></path>
                            </svg>
                            <p className="text-xs ml-2">ชดเชยการล่าช้าของเที่ยวบินและกระเป๋าเดินทาง</p>
                        </div>
                        <div className="flex">
                            <svg
                                width="1em"
                                height="1em"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                className="SvgIconstyled__SvgIconStyled-sc-1i6f60b-0 fvZryX"
                            >
                                <path d="M21.453 4.487l1.094 1.026a.5.5 0 0 1 .023.707L10.412 19.188a1.25 1.25 0 0 1-1.692.122l-.104-.093-7.146-7.146a.5.5 0 0 1 0-.707l1.06-1.061a.5.5 0 0 1 .707 0l6.234 6.234L20.746 4.51a.5.5 0 0 1 .707-.023z"></path>
                            </svg>
                            <p className="text-xs ml-2">คุ้มครองอุบัติเหตุ และอื่น ๆ อีกมากมาย</p>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-10 mt-4">
                    <div className="flex justify-center">
                        <Checkbox
                            size={'md'}
                            className="cursor-pointer"
                            isChecked={!bookingData.travelInsurance.isIncluded}
                            onChange={(e) => handleToggleTravelInsurance(!e.target.checked)}
                        />
                    </div>
                    <label htmlFor="no" className="col-span-9 text-sm">
                        ไม่ ฉันไม่ต้องการประกันภัยการเดินทาง ฉันจะรับผิดชอบค่าใช้จ่ายด้วยตนเองในกรณีฉุกเฉิน
                    </label>
                </div>
            </div>
        </div>
    );
};

export default ServicePackage;
