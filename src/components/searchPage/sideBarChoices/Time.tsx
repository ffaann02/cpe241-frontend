import { Checkbox, Box, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from '@chakra-ui/react';
import { TimeRange } from '../FilterSideBar';
interface TimeProps {
    title: string;
    selectedTime: TimeRange;
    setSelectedTime: React.Dispatch<React.SetStateAction<TimeRange>>;
}

const quaters = [
    {
        label: 'Q1',
        text: 'กลางคืนถึงเช้า',
        time_range: '00:00 - 06:00',
    },
    {
        label: 'Q2',
        text: 'เช้าถึงเที่ยง',
        time_range: '06:00 - 12:00',
    },
    {
        label: 'Q3',
        text: 'เที่ยงถึงเย็น',
        time_range: '12:00 - 18:00',
    },
    {
        label: 'Q4',
        text: 'เย็นถึงกลางคืน',
        time_range: '18:00 - 00:00',
    },
];

const Time: React.FC<TimeProps> = ({ title, selectedTime, setSelectedTime }: TimeProps) => {
    return (
        <AccordionItem className="py-2 border-b border-b-slate-300" borderTop={0}>
            <AccordionButton paddingX={0} paddingY={1} _hover={{ bgColor: 'transparent' }}>
                <Box as="span" flex="1" textAlign="left">
                    <h2 className="text-slate-500 font-semibold">{title}</h2>
                </Box>
                <AccordionIcon textColor={'gray'} />
            </AccordionButton>
            <AccordionPanel paddingBottom={2} paddingX={1}>
                <div className="mt-2">
                    <div className="flex flex-col gap-y-2">
                        {quaters.map((q) => (
                            <Checkbox
                                id={q.label}
                                key={q.label}
                                name={q.label}
                                size="md"
                                colorScheme="purple"
                                isChecked={selectedTime[q.label.toLowerCase() as keyof TimeRange]}
                                onChange={(e) => {
                                    setSelectedTime((prev) => ({
                                        ...prev,
                                        [q.label.toLowerCase()]: e.target.checked,
                                    }));
                                }}
                            >
                                <div className="ml-1">
                                    <p className="text-sm text-slate-600">{q.text}</p>
                                    <p className="text-xs text-slate-500 tracking-wide">({q.time_range})</p>
                                </div>
                            </Checkbox>
                        ))}
                    </div>
                </div>
            </AccordionPanel>
        </AccordionItem>
    );
};
export default Time;
