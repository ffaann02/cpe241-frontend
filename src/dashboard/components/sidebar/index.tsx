import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SIDENAV_ITEMS } from './constants';

const Sidebar = ({ open }) => {
    const [openSubMenus, setOpenSubMenus] = useState([]);

    const handleToggleSubMenu = (index) => {
        if (openSubMenus.includes(index)) {
            setOpenSubMenus(openSubMenus.filter((i) => i !== index));
        } else {
            setOpenSubMenus([...openSubMenus, index]);
        }
    };

    const renderSidebarItem = (item, index) => {
        const isSubmenuOpen = openSubMenus.includes(index);

        if (item.submenu) {
            return (
                <li key={index}>
                    <button
                        type="button"
                        className="flex items-center w-full p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                        onClick={() => handleToggleSubMenu(index)}
                    >
                        {item.icon}
                        <span className="ms-3">{item.title}</span>
                        <svg
                            className={`w-3 h-3 ms-auto transition-transform ${isSubmenuOpen ? 'rotate-180' : ''}`}
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 10 6"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 4 4 4-4"
                            />
                        </svg>
                    </button>
                    <ul
                        className={`py-2 space-y-2 transition-all ${isSubmenuOpen ? 'max-h-screen' : 'max-h-0 hidden'}`}
                    >
                        {item.subMenuItems.map((subItem, subIndex) => (
                            <li key={subIndex}>
                                <Link
                                    to={subItem.path}
                                    className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                >
                                    {subItem.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </li>
            );
        } else {
            return (
                <li key={index}>
                    <Link
                        to={item.path}
                        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                    >
                        {item.icon}
                        <span className="ms-3">{item.title}</span>
                    </Link>
                </li>
            );
        }
    };

    return (
        <aside
            id="sidebar-multi-level-sidebar"
            className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${open ? 'translate-x-0 z-50' : '-translate-x-full'}`}
            aria-label="Sidebar"
        >
            <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                <ul className="space-y-2 font-medium">
                    {SIDENAV_ITEMS.map((item, index) => renderSidebarItem(item, index))}
                </ul>
            </div>
        </aside>
    );
};

export default Sidebar;