import WeeklyRevenue from './components/WeeklyRevenue';
import TotalSpent from './components/TotalSpent';
import PieChartCard from './components/PieChartCard';
import { FaUserCheck } from 'react-icons/fa6';
import { IoMdHome } from 'react-icons/io';
import { GiCommercialAirplane } from 'react-icons/gi';
import { LuUserCog } from 'react-icons/lu';
import { GiAirplaneArrival } from 'react-icons/gi';
import { MdBarChart, MdDashboard } from 'react-icons/md';
import axiosPrivate from '../../../../api/axios';
import { useState, useEffect } from 'react';

import Widget from '../../../../dashboard/components/widget/Widget';
import ComplexTable from './components/ComplexTable';
import DailyTraffic from './components/DailyTraffic';
import TaskCard from './components/TaskCard';
import tableDataComplex from './variables/tableDataComplex';
import AirlineRevenueTable from './components/AirlineRevenueTable';
import PopularDestinationTable from './components/PopularDestinationTable';
import AirlinePieChart from './components/AirlinePieChart';

const Dashboard = () => {
    const [destinationData, setDestinationData] = useState(null);
    const [revenueData, setRevenueData] = useState(null);
    const [airlineRevenueTableData, setAirlineRevenueTableData] = useState(null);
    const [totalPassenger, setTotalPassenger] = useState(null);
    const [popularDestinationData, setPopularDestinationData] = useState(null);
    const [mostUsedAircraftData, setMostUsedAircraftData] = useState(null);
    const [userCount, setUserCount] = useState(null);
    const [employeeCount, setEmployeeCount] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const destinationResult = await axiosPrivate.get('/api/dashboard/overview/destination');
                setDestinationData(destinationResult.data[0]);

                const revenueResult = await axiosPrivate.get('/api/dashboard/overview/revenue');
                setRevenueData(revenueResult.data[0]);

                const airlineRevenueResult = await axiosPrivate.get('/api/dashboard/overview/airlinerevenue');
                setAirlineRevenueTableData(airlineRevenueResult.data);

                const totalPassengerResult = await axiosPrivate.get('/api/dashboard/overview/totalpassenger');
                setTotalPassenger(totalPassengerResult.data[0]);

                const popularDestinationResult = await axiosPrivate.get('/api/dashboard/overview/flightsDestination');
                setPopularDestinationData(popularDestinationResult.data);

                const mostUsedAircraftResult = await axiosPrivate.get('/api/dashboard/overview/mostUsedAircraft');
                setMostUsedAircraftData(mostUsedAircraftResult.data);

                const userCountResult = await axiosPrivate.get('/api/dashboard/overview/userCount');
                setUserCount(userCountResult.data[0]);

                const employeeCountResult = await axiosPrivate.get('/api/dashboard/overview/employeeCount');
                setEmployeeCount(employeeCountResult.data[0]);

                // console.log('AirlineRevenueTableData', airlineRevenueResult.data);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            {/* Card widget */}

            <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
                <Widget
                    icon={<GiAirplaneArrival className="h-7 w-7" />}
                    title={'Most Destination Airport for the Month'}
                    subtitle={
                        destinationData
                            ? `${destinationData.airportName} : ${destinationData.flights} Flights`
                            : 'Loading...'
                    }
                />
                <Widget
                    icon={<GiCommercialAirplane className="h-6 w-6" />}
                    title={'Most Used Aircraft Model'}
                    subtitle={
                        mostUsedAircraftData
                            ? `${mostUsedAircraftData.manufacturer} ${mostUsedAircraftData.model}`
                            : 'Loading...'
                    }
                />
                <Widget
                    icon={<FaUserCheck className="h-7 w-7" />}
                    title={'Total Users'}
                    subtitle={userCount ? `${userCount.userCount}` : 'Loading...'}
                />
                <Widget
                    icon={<MdDashboard className="h-6 w-6" />}
                    title={'Top Revenue Airline for the Month'}
                    subtitle={revenueData ? `${revenueData.airlineName} : ฿${revenueData.revenue}` : 'Loading...'}
                />
                <Widget
                    icon={<MdBarChart className="h-7 w-7" />}
                    title={'Total Passengers'}
                    subtitle={totalPassenger ? `${totalPassenger.totalPassenger}` : 'Loading...'}
                />
                <Widget
                    icon={<LuUserCog className="h-6 w-6" />}
                    title={'Total Employees'}
                    subtitle={employeeCount ? `${employeeCount.employeeCount}` : 'Loading...'}
                />
            </div>

            {/* Charts */}

            <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                <TotalSpent />
                <WeeklyRevenue />
            </div>

            {/* Tables & Charts */}

            <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
                {/* Check Table */}
                <div className="">
                    {airlineRevenueTableData && <AirlineRevenueTable data={airlineRevenueTableData} />}
                </div>

                {/* Traffic chart & Pie Chart */}

                <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
                    <DailyTraffic />
                    <PieChartCard />
                </div>

                {/* Complex Table , Task & Calendar */}

                <div className=" max-h-80">
                    {popularDestinationData && <PopularDestinationTable data={popularDestinationData} />}
                </div>

                {/* Task chart & Calendar */}

                <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
                    <AirlinePieChart />
                    {/* <div className="grid grid-cols-1 rounded-[20px]">
                        <MiniCalendar />
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
