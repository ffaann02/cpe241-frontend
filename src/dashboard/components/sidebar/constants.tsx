import { HiOutlineTable, HiOutlineHome, HiOutlineUser, HiOutlineFingerPrint } from "react-icons/hi";
import { SideNavItem } from './types';

export const SIDENAV_ITEMS: SideNavItem[] = [
    {
        title: 'Overview',
        path: '/dashboard/admin/default',
        icon: <HiOutlineHome />,
    },
    {
        title: 'Data Tables',
        path: '/dashboard/admin/data-tables',
        icon: <HiOutlineTable />,
        submenu: true,
        subMenuItems: [
            { title: 'Flight', path: '/dashboard/admin/flight-table' },
            { title: 'Booking', path: '/dashboard/admin/booking-table' },
            { title: 'User', path: '/dashboard/admin/user-table' },
            { title: 'Employee', path: '/dashboard/admin/employee-table' },
            { title: 'Aircraft', path: '/dashboard/admin/aircraft-table' },
        ],
    },
    {
        title: 'Service',
        path: '/dashboard/admin/service-table',
        icon: <HiOutlineTable />,
    },
    {
        title: 'Profile',
        path: '/dashboard/admin/profile',
        icon: <HiOutlineUser />,
    },
    {
        title: 'Sign In',
        path: '/dashboard/auth/sign-in',
        icon: <HiOutlineFingerPrint />,
    },
];