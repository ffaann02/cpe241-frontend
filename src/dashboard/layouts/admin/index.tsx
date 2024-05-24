import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from '../../components/navbar';
import Sidebar from '../../components/sidebar';
import Footer from '../../components/footer/Footer';
import routes from '../../routes';
import { useState, useEffect } from 'react';
import {
    Flex,
    Box
} from '@chakra-ui/react';
export default function Admin(props: { [x: string]: any }) {
    const { ...rest } = props;
    const location = useLocation();
    const [open, setOpen] = useState(true);
    const [currentRoute, setCurrentRoute] = useState('Main Dashboard');

    useEffect(() => {
        window.addEventListener('resize', () => (window.innerWidth < 1200 ? setOpen(false) : setOpen(true)));
    }, []);
    useEffect(() => {
        getActiveRoute(routes);
    }, [location.pathname]);

    const getActiveRoute = (routes: RoutesType[]): string | boolean => {
        const activeRoute = 'Main Dashboard';
        for (let i = 0; i < routes.length; i++) {
            if (window.location.href.indexOf(routes[i].layout + '/' + routes[i].path) !== -1) {
                setCurrentRoute(routes[i].name);
            }
        }
        return activeRoute;
    };
    const getActiveNavbar = (routes: RoutesType[]): string | boolean => {
        const activeNavbar = false;
        for (let i = 0; i < routes.length; i++) {
            if (window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1) {
                return routes[i].secondary;
            }
        }
        return activeNavbar;
    };
    const getRoutes = (routes: RoutesType[]): any => {
        return routes.map((prop, key) => {
            if (prop.layout === 'admin') {
                return <Route path={`${prop.path}`} element={prop.component} key={key} />;
            } else {
                return null;
            }
        });
    };


    document.documentElement.dir = 'ltr';
    return (
        // <div className="h-full w-full grid grid-cols-12 relative bg-slate-100">
        //     {/* Navbar & Main Content */}

        //     <div className={`col-span-full lg:col-span-2 w-max bg-gray-50 dark:bg-gray-800  `}>
        //         <Sidebar open={open} />
        //     </div>

        //     <div className={`h-full dark:!bg-navy-900 col-span-full lg:col-span-10 overflow-hidden`}>
        //         {/* Main Content */}
        //         <main className={`h-full flex-none transition-all`}>
        //             {/* Routes */}
        //             <div className="h-full w-full overflow-auto">
        //                 <Navbar
        //                     onOpenSidenav={() => setOpen(!open)}
        //                     brandText={currentRoute}
        //                     secondary={getActiveNavbar(routes)}
        //                     {...rest}
        //                 />

        //                 <div className="pt-2 mb-auto h-full min-h-[84vh] p-6">
        //                     <Routes>
        //                         {getRoutes(routes)}
        //                         <Route path="/" element={<Navigate to="default" replace />} />
        //                     </Routes>
        //                 </div>

        //                 <div className="p-3">
        //                     <Footer />
        //                 </div>
        //             </div>
        //         </main>
        //     </div>
        // </div>
        <Flex className="h-full w-full  bg-slate-100">
            {/* Navbar & Main Content */}

            <Box w={ {lg:'20%'}} maxW={'300px'} className={` bg-gray-50 dark:bg-gray-800  `}>
                <Sidebar open={open} />
            </Box>

            <Box className={`h-full dark:!bg-navy-900  overflow-hidden`}>
                {/* Main Content */}
                <main className={`h-full flex-none transition-all`}>
                    {/* Routes */}
                    <Box className="h-full w-full overflow-auto">
                        <Navbar
                            onOpenSidenav={() => setOpen(!open)}
                            brandText={currentRoute}
                            secondary={getActiveNavbar(routes)}
                            {...rest}
                        />

                        <Box className="pt-2 mb-auto h-full min-h-[84vh] p-6">
                            <Routes>
                                {getRoutes(routes)}
                                <Route path="/" element={<Navigate to="default" replace />} />
                            </Routes>
                        </Box>

                        <Box className="p-3">
                            <Footer />
                        </Box>
                    </Box>
                </main>
            </Box>
        </Flex>
    );
}
