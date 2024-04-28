import React, { useState } from 'react';
import ToggleHeader from './ToggleHeader';
import { LiaSuitcaseSolid } from "react-icons/lia";
import { IoFastFoodOutline } from "react-icons/io5";
import { GrPlug } from "react-icons/gr";

import { Checkbox } from '@chakra-ui/react';
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
        icon: <LiaSuitcaseSolid/>,
    },
    {
        title: 'อาหาร, เครื่องดื่ม',
        value: 'food',
        icon: <IoFastFoodOutline/>,
    },
    {
        title: 'ปลั๊กไฟ / ช่อง USB',
        value: 'plug',
        icon: <GrPlug/>,
    },
];

const Icon = ({ icon,isChecked }: { icon: React.ReactElement, isChecked: boolean }) => {
    return <div className={`absolute top-0 right-0 text-lg ${isChecked ? "text-royal-blue-600":"text-slate-400"}`}>{icon}</div>
};

const Service: React.FC<ServiceProps> = ({ title, selectedServices, setSelectedServices }: ServiceProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    return (
        <div className="py-2 border-b border-b-slate-300">
            <ToggleHeader title={title} isOpen={isOpen} setIsOpen={setIsOpen} />
            {isOpen && (
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
                                <Icon icon={service.icon} isChecked={selectedServices[service.value as keyof ServiceType]}/>
                            </Checkbox>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
export default Service;
