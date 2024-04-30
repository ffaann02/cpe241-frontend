import React from 'react';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa6';

interface ToggleDropdownProps {
    isOpen: boolean;
}

const ToggleDropdown: React.FC<ToggleDropdownProps> = ({ isOpen }: ToggleDropdownProps) => {
    return (
        <div>
            <div className={` transition-all duration-200 ease-linear transform ${isOpen? "rotate-180":"rotate-0"}`}>
                <FaAngleUp className="text-slate-500 text-sm" />
            </div>
        </div>
    );
};
export default ToggleDropdown;
