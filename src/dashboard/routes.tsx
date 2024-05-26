// Admin Imports
import MainDashboard from './views/admin/default';
import NFTMarketplace from './views/admin/marketplace';
import Profile from './views/admin/profile';
import DataTables from './views/admin/tables';
import RTLDefault from './views/rtl/default';
import FlightTable from './views/admin/flightTable';

import BookingTable from './views/admin/bookingTable';
import AircraftTable from './views/admin/aircraftTable';
import ExternalReport from './views/admin/externalTable';
import UserTable from './views/admin/userTable';

import EmployeeReport from './views/admin/employeeTable';

// Auth Imports
import SignIn from './views/auth/SignIn';

// Icon Imports
import { MdHome, MdOutlineShoppingCart, MdBarChart, MdPerson, MdLock } from 'react-icons/md';
import ServiceTable from './views/admin/serviceTable';

const routes = [
    {
        name: 'Overview',
        layout: 'admin',
        path: 'default',
        base: 'dashboard',
        icon: <MdHome className="h-6 w-6" />,
        component: <MainDashboard />,
    },
    {
        name: 'Data Tables',
        layout: 'admin',
        icon: <MdBarChart className="h-6 w-6" />,
        path: 'data-tables',
        base: 'dashboard',
        component: <DataTables />,
    },
    {
        name: 'Profile',
        layout: 'admin',
        path: 'profile',
        base: 'dashboard',
        icon: <MdPerson className="h-6 w-6" />,
        component: <Profile />,
    },
    {
        name: 'Flight Table',
        layout: 'admin',
        path: 'flight-table',
        base: 'dashboard',
        icon: <MdOutlineShoppingCart className="h-6 w-6" />,
        component: <FlightTable />,
        secondary: true,
    },
    {
        name: 'User Table',
        layout: 'admin',
        path: 'user-table',
        base: 'dashboard',
        icon: <MdOutlineShoppingCart className="h-6 w-6" />,
        component: <UserTable />,
    },
    {
        name: 'Employee Table',
        layout: 'admin',
        path: 'employee-table',
        base: 'dashboard',
        icon: <MdOutlineShoppingCart className="h-6 w-6" />,
        component: <EmployeeReport />,
        secondary: true,
    },
    {
        name: 'Aircraft Table',
        layout: 'admin',
        path: 'aircraft-table',
        base: 'dashboard',
        icon: <MdOutlineShoppingCart className="h-6 w-6" />,
        component: <AircraftTable />,
        secondary: true,
    },
    {
        name: 'Booking Table',
        layout: 'admin',
        path: 'booking-table',
        base: 'dashboard',
        icon: <MdOutlineShoppingCart className="h-6 w-6" />,
        component: <BookingTable />,
        secondary: true,
    },
    {
        name: 'External Table',
        layout: 'admin',
        path: 'external-table',
        base: 'dashboard',
        icon: <MdOutlineShoppingCart className="h-6 w-6" />,
        component: <ExternalReport />,
        secondary: true,
    },
    {
        name: 'Service Table',
        layout: 'admin',
        path: 'service-table',
        base: 'dashboard',
        icon: <MdOutlineShoppingCart className="h-6 w-6" />,
        component: <ServiceTable />,
    },
    {
        name: 'Sign In',
        layout: 'auth',
        path: 'sign-in',
        base: 'dashboard',
        icon: <MdLock className="h-6 w-6" />,
        component: <SignIn />,
    },
];
export default routes;
