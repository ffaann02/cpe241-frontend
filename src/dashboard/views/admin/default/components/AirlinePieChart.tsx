import { useEffect, useState } from 'react';
import Card from '../../../../components/card';
import Chart from 'react-apexcharts';
import axiosPrivate from '../../../../../api/axios';

/* 
[
    {
        "name": "Finnair",
        "data": 6,
        "color": "#87a062"
    },
    {
        "name": "Etihad",
        "data": 6,
        "color": "#d15652"
    },
]
*/

const AirlinePieChart = () => {
    const [chartData, setChartData] = useState([]);
    const [chartLabels, setChartLabels] = useState([]);
    const [chartColors, setChartColors] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axiosPrivate.get('/api/dashboard/overview/airlinepercentage');
                // Extract the data field from each item in the response
                const pieChartData = result.data.map((item) => item.data);
                // Extract the name field from each item in the response
                const pieChartLabels = result.data.map((item) => item.name);
                const pieChartColors = result.data.map((item) => item.color);
                setChartData(pieChartData);
                setChartLabels(pieChartLabels);
                setChartColors(pieChartColors);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, []);

    const pieChartOptions = {
        labels: chartLabels,
        colors: chartColors,
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
                expandOnClick: false,
                donut: {
                    labels: {
                        show: false,
                    },
                },
            },
        },
        fill: {
            colors: chartColors,
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
                    <h4 className="text-lg font-bold text-navy-700 dark:text-white">Airline Market Share</h4>
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
        </Card>
    );
};

export default AirlinePieChart;
