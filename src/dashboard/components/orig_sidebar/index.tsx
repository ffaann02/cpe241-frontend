/* eslint-disable */

import { HiX } from 'react-icons/hi';
import Links from './components/Links';

import SidebarCard from './componentsrtl/SidebarCard';
import routes from '../../routes';

const Sidebar = (props: { open: boolean; onClose: React.MouseEventHandler<HTMLSpanElement> }) => {
    const { open, onClose } = props;
    return (
        <div
            className={`sm:none duration-175 linear fixed w-[16.67%] top-0 !z-50 flex min-h-full flex-col bg-white pb-10 shadow-2xl
       shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${
           open ? 'translate-x-0' : '-translate-x-96'
       }`}
        >
            <span className="absolute top-4 right-4 block cursor-pointer xl:hidden" onClick={onClose}>
                <HiX />
            </span>

            <div className={` p-10 text-center w-full flex justify-center`}>
                <h1 className="text-2xl text-center font-bold">AGADO Dashboard</h1>
            </div>
            <div className="mb-7 h-px bg-gray-300 dark:bg-white/30" />
            {/* Nav item */}

            <ul className="mb-auto pt-1">
                <Links routes={routes} />
            </ul>
        </div>
    );
};

export default Sidebar;
