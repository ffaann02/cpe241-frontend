import { useEffect, useState } from 'react';
import Card from '../../../../components/card';
import Chart from 'react-apexcharts';
import axiosPrivate from '../../../../../api/axios';

const PieChartCard = () => {
    const [chartData, setChartData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axiosPrivate.get('/api/dashboard/overview/statusPercentage');
                // Sort the array to ensure "Booked" is always first
                const sortedData = result.data.sort((a, b) => (a.status === 'Booked' ? -1 : 1));
                // Map the sorted array to a new array containing only the percentages
                const pieChartData = sortedData.map((item) => item.percentage);
                console.log('Pie Chart Data: ', pieChartData);
                setChartData(pieChartData);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, []);

    const pieChartOptions = {
        labels: ['Booked', 'Cancelled'],
        colors: ['#4318FF', '#6AD2FF'],
        chart: {
            width: '50px',
        },
        states: {
            hover: {
                filter: {
                    type: 'none',
                },
            },
        },
        legend: {
            show: false,
        },
        dataLabels: {
            enabled: false,
        },
        hover: { mode: null },
        plotOptions: {
            pie: {
                donut: {
                    expandOnClick: false,
                    labels: {
                        show: false,
                    },
                },
            },
        },
        fill: {
            colors: ['#4318FF', '#6AD2FF'],
        },
        tooltip: {
            enabled: true,
            theme: 'dark',
            style: {
                fontSize: '12px',
                fontFamily: undefined,
                backgroundColor: '#000000',
            },
        },
    };

    return (
        <Card extra="rounded-[20px] p-3">
            <div className="flex flex-row justify-between px-3 pt-2">
                <div>
                    <h4 className="text-lg font-bold text-navy-700 dark:text-white">Booking Status</h4>
                </div>

                <div className="mb-6 flex items-center justify-center">
                    <select className="mb-3 mr-2 flex items-center justify-center text-sm font-bold text-gray-600 hover:cursor-pointer dark:!bg-navy-800 dark:text-white">
                        <option value="monthly">Monthly</option>
                    </select>
                </div>
            </div>
            <div className="mb-auto flex h-[220px] w-full items-center justify-center">
                <Chart options={pieChartOptions} series={chartData} type="pie" width="100%" height="100%" />
            </div>
            <div className="flex flex-row !justify-between rounded-2xl px-6 py-3 shadow-2xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <div className="flex flex-col items-center justify-center">
                    <div className="flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-brand-500" />
                        <p className="ml-1 text-sm font-normal text-gray-600">Booked</p>
                    </div>
                    <p className="mt-px text-xl font-bold text-navy-700  dark:text-white">{chartData[0]}</p>
                </div>

                <div className="h-11 w-px bg-gray-300 dark:bg-white/10" />

                <div className="flex flex-col items-center justify-center">
                    <div className="flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-[#6AD2FF]" />
                        <p className="ml-1 text-sm font-normal text-gray-600">Cancelled</p>
                    </div>
                    <p className="mt-px text-xl font-bold text-navy-700 dark:text-white">{chartData[1]}</p>
                </div>
            </div>
        </Card>
    );
};

export default PieChartCard;
