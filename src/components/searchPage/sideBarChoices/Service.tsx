import React from 'react';
import { LiaSuitcaseSolid } from 'react-icons/lia';
import { IoFastFoodOutline } from 'react-icons/io5';
import { GrPlug } from 'react-icons/gr';

import { Checkbox, Box, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from '@chakra-ui/react';
import { ServiceType } from '../FilterSideBar';
interface ServiceProps {
    title: string;
    selectedServices: ServiceType;
    setSelectedServices: React.Dispatch<React.SetStateAction<ServiceType>>;
}

const services = [
    {
        title: 'สัมภาระเพิ่มเติม',
        value: 'extraStorage',
        icon: <LiaSuitcaseSolid />,
    },
    {
        title: 'อาหาร, เครื่องดื่ม',
        value: 'food',
        icon: <IoFastFoodOutline />,
    },
    {
        title: 'ปลั๊กไฟ / ช่อง USB',
        value: 'plug',
        icon: <GrPlug />,
    },
];

const Icon = ({ icon, isChecked }: { icon: React.ReactElement; isChecked: boolean }) => {
    return (
        <div className={`absolute top-0 right-0 text-lg ${isChecked ? 'text-royal-blue-600' : 'text-slate-400'}`}>
            {icon}
        </div>
    );
};

const Service: React.FC<ServiceProps> = ({ title, selectedServices, setSelectedServices }: ServiceProps) => {
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
                    <div className="flex flex-col gap-y-3">
                        {services.map((service) => (
                            <Checkbox
                                id={service.title}
                                key={service.title}
                                name={service.title}
                                size="md"
                                colorScheme="purple"
                                isChecked={selectedServices[service.value as keyof ServiceType]}
                                onChange={(e) => {
                                    setSelectedServices((prev) => ({
                                        ...prev,
                                        [service.value]: e.target.checked,
                                    }));
                                }}
                            >
                                <p className="text-sm text-slate-600 justify-self-end">{service.title}</p>
                                <Icon
                                    icon={service.icon}
                                    isChecked={selectedServices[service.value as keyof ServiceType]}
                                />
                            </Checkbox>
                        ))}
                    </div>
                </div>
            </AccordionPanel>
        </AccordionItem>
    );
};
export default Service;
