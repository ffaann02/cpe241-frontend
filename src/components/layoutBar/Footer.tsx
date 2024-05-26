import { FaFacebook } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import appleIcon from '../../assets/images/apple-icon.png';
import googlePlay from '../../assets/images/google-play.webp';
function Footer() {
    return (
        <>
            <section className="py-2 mt-6 flex justify-end w-full  border-violet-400 border-y-2">
                <div className="flex mr-16 gap-x-8">
                    <div className="">รายละเอียด</div>
                    <div className="divider divider-horizontal divider-primary"></div>
                    <div className="">อัปเดตรายสัปดาห์</div>
                    <div className="divider divider-horizontal divider-primary"></div>
                    <div className="">ข้อมูล</div>
                    <div className="divider divider-horizontal divider-primary"></div>
                    <div className="">ความปลอดภัย</div>
                </div>
            </section>
            <section className="grid grid-cols-5 gap-4 pt-8">
                <div className="object-center space flex flex-col space-y-5">
                    <div className="object-center px-20">
                        <img src="assets/logo-test.png" className="h-auto w-40" alt="" />
                    </div>
                </div>
                <div className="text-center space flex flex-col space-y-5">
                    <div className="text-xl font-semibold">เกี่ยวกับเรา</div>
                    <div className="text-slate-500">สมาชิก</div>
                    <div className="text-slate-500">ที่มา</div>
                    <div className="text-slate-500">องค์กร</div>
                </div>
                <div className="text-center space flex flex-col space-y-5">
                    <div className="text-xl font-semibold">พาร์ทเนอร์ร่วมกัน</div>
                    <div className="text-slate-500">โปรแกรม</div>
                    <div className="text-slate-500">พาร์ทเนอร์</div>
                    <div className="text-slate-500">สังคม</div>
                </div>
                <div className="text-center space flex flex-col space-y-5">
                    <div className="text-xl font-semibold">ช่วยเหลือ</div>
                    <div className="text-slate-500">ศูนย์ช่วยเหลือ</div>
                    <div className="text-slate-500">ติดต่อเรา</div>
                    <div className="text-slate-500">นโยบายความเป็นส่วนตัว</div>
                </div>
                <div className="text-center space flex flex-col space-y-5">
                    <div className="text-xl font-semibold">ดาวโหลดแอป</div>
                    <button className="bg-black w-fit text-white mx-auto p-2 flex gap-x-4 hover:bg-slate-300 rounded-md">
                        <img src={appleIcon} className="w-5" />
                        App store
                    </button>
                    <button className="bg-black w-fit text-white mx-auto p-2 flex gap-x-4 hover:bg-slate-300 rounded-md">
                        <img src={googlePlay} className="w-5" />
                        Google play
                    </button>
                </div>
            </section>
            <div className=" border-violet-400 border-y-2 mt-32">
                <div className="flex justify-between p-6">
                    <div className="flex flex-row">
                        <FaFacebook className="h-auto w-5 mx-4" />
                        <FaTwitter className="h-auto w-5 mx-4" />
                        <FaInstagram className="h-auto w-5 mx-4" />
                    </div>
                    <div className="">2024 agado incorporated</div>
                </div>
            </div>
        </>
    );
}

export default Footer;
