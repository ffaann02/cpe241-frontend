import {
    RangeSlider,
    RangeSliderTrack,
    RangeSliderFilledTrack,
    RangeSliderThumb,
    Box,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
} from '@chakra-ui/react';
import { FaCircle } from 'react-icons/fa';
import { PriceRange } from '../FilterSideBar';
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

    return (
        <AccordionItem className="py-2 border-b border-b-slate-300" borderTop={0}>
            <AccordionButton paddingX={0} paddingY={1} _hover={{ bgColor: 'transparent' }}>
                <Box as="span" flex="1" textAlign="left">
                    <h2 className="text-slate-500 font-semibold">{title}</h2>
                </Box>
                <AccordionIcon textColor={"gray"}/>
            </AccordionButton>
            <AccordionPanel paddingBottom={2} paddingX={1}>
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
            </AccordionPanel>
        </AccordionItem>
    );
};
export default Price;
