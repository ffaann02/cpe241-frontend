import { FaArrowRightLong } from 'react-icons/fa6';
import { PiAirplaneInFlightLight } from 'react-icons/pi';
import { FiEdit } from 'react-icons/fi';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useRef, useState } from 'react';
import FlightLineImage from '../../assets/images/airplane-vector.png';
import { Button, Collapse } from '@chakra-ui/react';
var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 7,
    slidesToScroll: 1,
};

const SearchHeader = ({ flightResult }: { flightResult: any }) => {
    const sliderRef = useRef<any>(null);

    const handlePrev = () => {
        sliderRef.current.slickPrev();
    };

    const handleNext = () => {
        sliderRef.current.slickNext();
    };
    const [isOpenForm, setIsOpenForm] = useState<boolean>(false);
    const handleToggle = () => setIsOpenForm((prev) => !prev);

    return (
        <div className="pt-6 pb-6 px-24 bg-gradient-to-b from-royal-blue-600 via-royal-blue-400 to-royal-blue-300 relative">
            <img src={FlightLineImage} className="w-44 absolute z-0 right-4 bottom-12 opacity-50 rotate-12" />
            {flightResult.length > 0 && (
                <div className="w-full max-w-5xl mx-auto z-10 relative">
                    <div className="bg-white px-5 py-4 rounded-lg">
                        <div className="flex justify-between">
                            <div className="flex">
                                <PiAirplaneInFlightLight className="text-2xl mr-3 my-auto text-royal-blue-500" />
                                <div className="">
                                    <div className="flex gap-x-4 text-lg font-semibold text-slate-600">
                                        <p>
                                            {flightResult[0].departureCity} ({flightResult[0].from})
                                        </p>
                                        <FaArrowRightLong className="my-auto" />
                                        <p>
                                            {flightResult[0].arrivalCity} ({flightResult[0].destination})
                                        </p>
                                    </div>
                                    <div className="flex text-sm mt-1 divide-x divide-royal-blue-200">
                                        <p className="pr-2.5">จันทร์, 29 เม.ย. 2024</p>
                                        <p className="px-2">1 ผู้โดยสาร</p>
                                        <p className="px-2">ชั้นประหยัด</p>
                                    </div>
                                </div>
                            </div>
                            <div className="my-auto">
                                <Button
                                    onClick={handleToggle}
                                    className="px-4 py-3 rounded-lg bg-royal-blue-200 transition-all duration-100 ease-linear
                     hover:bg-royal-blue-100 hover:text-royal-blue-600 text-royal-blue-800 flex"
                                >
                                    <FiEdit className="my-auto mr-2 text-lg" />
                                    <p>เปลี่ยนแปลงการค้นหา</p>
                                </Button>
                            </div>
                        </div>
                        <Collapse in={isOpenForm} animateOpacity className="mt-2">
                            <div>hello</div>
                        </Collapse>
                    </div>
                    <div className="mt-4 grid grid-cols-14">
                        <div className="col-span-1">
                            <button
                                className="bg-white w-full h-full rounded-md text-royal-blue-500 hover:bg-royal-blue-100 
                            hover:text-royal-blue-600"
                                onClick={handlePrev}
                            >
                                <FaChevronLeft className="text-2xl mx-auto" />
                            </button>
                        </div>
                        <div className="col-span-12 px-2 mr-1" id="card_container">
                            <div>
                                <Slider ref={sliderRef} {...settings}>
                                    {['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์'].map(
                                        (day, index) => {
                                            const price = Math.floor(Math.random() * 1000) + 900; // random price between 100 and 1100

                                            return (
                                                <div key={index} className="px-1.5 cursor-pointer">
                                                    <div className="bg-white py-2.5 rounded-md hover:bg-royal-blue-50">
                                                        <div className="text-center">
                                                            <p className="text-sm text-slate-500">
                                                                {day}, {19 + index}{' '}
                                                            </p>
                                                            <p className="text-royal-blue-400 font-semibold mt-1">
                                                                ฿ {price}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        }
                                    )}
                                </Slider>
                            </div>
                        </div>
                        <button
                            className="bg-white w-full h-full rounded-md text-royal-blue-500 hover:bg-royal-blue-100 
                            hover:text-royal-blue-600"
                            onClick={handleNext}
                        >
                            <FaChevronRight className="text-2xl mx-auto" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
export default SearchHeader;
