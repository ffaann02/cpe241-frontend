import React from 'react';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa6';

interface ToggleDropdownProps {
    isOpen: boolean;
}

const ToggleDropdown: React.FC<ToggleDropdownProps> = ({ isOpen }: ToggleDropdownProps) => {
    return (
        <div>
            <label className={`swap swap-rotate ${isOpen ? 'swap-active' : 'swap-off'}`}>
                <div className="swap-on">
                    <FaAngleUp className="text-slate-500 text-sm" />
                </div>
                <div className="swap-off">
                    <FaAngleDown className="text-slate-500 text-sm" />
                </div>
            </label>
        </div>
    );
};
export default ToggleDropdown;
