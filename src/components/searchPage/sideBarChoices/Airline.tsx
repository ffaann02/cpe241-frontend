import fakeAirlineData from '../../../data/fakeFlightData.json';
import { Checkbox, Box, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from '@chakra-ui/react';

interface AirlineProps {
    title: string;
    selectedAirline: string[];
    setSelectedAirline: React.Dispatch<React.SetStateAction<string[]>>;
}

const Airline: React.FC<AirlineProps> = ({ title, selectedAirline, setSelectedAirline }: AirlineProps) => {
    const handleCheckboxChange = (airline: string, isChecked: boolean) => {
        if (isChecked) {
            setSelectedAirline((prev) => [...prev, airline]);
        } else {
            setSelectedAirline((prev) => prev.filter((a) => a !== airline));
        }
    };

    return (
        <AccordionItem className="py-2 border-b border-b-slate-300" borderTop={0}>
            <AccordionButton paddingX={0} paddingY={1} _hover={{ bgColor: 'transparent' }}>
                <Box as="span" flex="1" textAlign="left">
                    <h2 className="text-slate-500 font-semibold">{title}</h2>
                </Box>
                <AccordionIcon textColor={'gray'} />
            </AccordionButton>
            <AccordionPanel paddingBottom={2} paddingX={1}>
                <div className="flex flex-col gap-y-4 mt-2">
                    {fakeAirlineData.map((airline, index) => (
                        <Checkbox
                            checked={selectedAirline.includes(airline.airline) ? true : false}
                            size="md"
                            colorScheme="purple"
                            onChange={(e) => handleCheckboxChange(airline.airline, e.target.checked)}
                            className="flex"
                            key={'airline' + index}
                        >
                            <div className="flex ml-2">
                                <img src={airline.airlineIcon} className="w-8 h-8 my-auto" />
                                <p
                                    className={`text-sm my-auto ml-3 ${selectedAirline.includes(airline.airline) ? ' text-royal-blue-600 font-semibold' : 'text-slate-600'}`}
                                >
                                    {airline.airline}
                                </p>
                            </div>
                        </Checkbox>
                    ))}
                </div>
            </AccordionPanel>
        </AccordionItem>
    );
};
export default Airline;
