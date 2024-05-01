import {
    RangeSlider,
    RangeSliderTrack,
    RangeSliderFilledTrack,
    RangeSliderThumb,
    Box,
    Collapse,
} from '@chakra-ui/react';
import { FaCircle } from 'react-icons/fa';
import { PriceRange } from '../FilterSideBar';
import { useState } from 'react';
import ToggleHeader from './ToggleHeader';

interface PriceProps {
    title: string;
    price: PriceRange;
    setPrice: React.Dispatch<React.SetStateAction<PriceRange>>;
}

const SliderBox = () => {
    return <FaCircle className="text-violet-600" />;
};

const Price: React.FC<PriceProps> = ({ title, price, setPrice }: PriceProps) => {
    const handleSliderChange = (values: number[]) => {
        console.log(values);
        setPrice((prevPrice) => ({ ...prevPrice, min: values[0], max: values[1] }));
    };
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <div className="py-2 border-b border-b-slate-300">
            <ToggleHeader title={title} isOpen={isOpen} setIsOpen={setIsOpen} />
            <Collapse in={isOpen} animateOpacity={false}>
                <div>
                    <RangeSlider
                        aria-label={['min', 'max']}
                        colorScheme="purple"
                        defaultValue={[2000, 4000]}
                        min={1000}
                        max={10000}
                        onChange={handleSliderChange}
                    >
                        <RangeSliderTrack>
                            <RangeSliderFilledTrack />
                        </RangeSliderTrack>
                        <RangeSliderThumb index={0}>
                            <Box as={SliderBox} />
                        </RangeSliderThumb>
                        <RangeSliderThumb index={1}>
                            <Box as={SliderBox} />
                        </RangeSliderThumb>
                    </RangeSlider>
                    <div className="justify-between flex text-xs font-semibold text-slate-400 mt-1">
                        <div>
                            <p>ต่ำสุด</p>
                            <p>฿ {price.min}</p>
                        </div>
                        <div>
                            <p>สูงสุด</p>
                            <p>฿ {price.max}</p>
                        </div>
                    </div>
                </div>
            </Collapse>
        </div>
    );
};
export default Price;
