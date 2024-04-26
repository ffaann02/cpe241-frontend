import { FaArrowRightLong } from 'react-icons/fa6';
import { PiAirplaneInFlightLight } from 'react-icons/pi';
import { FiEdit } from 'react-icons/fi';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useRef } from 'react';

var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 6,
    slidesToScroll: 1,
};

const SearchHeader = () => {
    const sliderRef = useRef<any>(null);

    const handlePrev = () => {
        sliderRef.current.slickPrev();
    }

    const handleNext = () => {
        sliderRef.current.slickNext();
    }


    return (
        <div className="pt-10 p-24 bg-gradient-to-b from-violet-600 via-violet-400 to-violet-300">
            <div className="w-full max-w-5xl mx-auto">
                <div className=" bg-white px-5 py-4 rounded-lg flex justify-between">
                    <div className="flex">
                        <PiAirplaneInFlightLight className="text-2xl mr-3 my-auto text-violet-500" />
                        <div className="">
                            <div className="flex gap-x-4 text-lg font-semibold text-slate-600">
                                <p>กรุงเทพมหานคร (BKKA)</p>
                                <FaArrowRightLong className="my-auto" />
                                <p>โอซาก้า (OSAA)</p>
                            </div>
                            <div className="flex text-sm mt-1">
                                <p>จันทร์, 29 เม.ย. 2024</p>
                                <div className="divider divider-horizontal"></div>
                                <p>1 ผู้โดยสาร</p>
                                <div className="divider divider-horizontal"></div>
                                <p>ชั้นประหยัด</p>
                            </div>
                        </div>
                    </div>
                    <div className="my-auto">
                        <button
                            className="px-4 py-3 rounded-lg bg-violet-200 transition-all duration-100 ease-linear
                     hover:bg-violet-100 hover:text-violet-600 text-violet-800 flex"
                        >
                            <FiEdit className="my-auto mr-2 text-lg" />
                            <p>เปลี่ยนแปลงการค้นหา</p>
                        </button>
                    </div>
                </div>
                <div className="mt-4 grid grid-cols-12">
                    <div className="col-span-1">
                        <button
                            className="bg-white w-full h-full rounded-md text-violet-500 hover:bg-violet-100 
                            hover:text-violet-600"
                            onClick={handlePrev}
                        >
                            <FaChevronLeft className="text-2xl mx-auto" />
                        </button>
                    </div>
                    <div className="col-span-10 px-2" id="card_container">
                        <div>
                            <Slider ref={sliderRef} {...settings}>
                                {Array(8)
                                    .fill(0)
                                    .map((_, index) => (
                                        <div key={index} className="px-2">
                                            <div className="bg-white h-16 rounded-md flex">
                                                <p className='m-auto'>เสาร์, {index} เม.ย.</p>
                                            </div>
                                        </div>
                                    ))}
                            </Slider>
                        </div>
                    </div>
                    <button
                            className="bg-white w-full h-full rounded-md text-violet-500 hover:bg-violet-100 
                            hover:text-violet-600"
                            onClick={handleNext}
                        >
                            <FaChevronRight className="text-2xl mx-auto" />
                        </button>
                </div>
            </div>
        </div>
    );
};
export default SearchHeader;
