import { MdArrowDropUp } from 'react-icons/md';
import Card from '../../../../components/card';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import axiosPrivate from '../../../../../api/axios';

const DailyTraffic = () => {
    const [barChartDataDailyPassenger, setBarChartDataDailyPassenger] = useState([]);
    const [todayPassenger, setTodayPassenger] = useState(0);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axiosPrivate.get('api/dashboard/overview/dailypassenger');

                const formattedData = {
                    name: 'Daily Passenger',
                    data: result.data.map((item) => item.passengers),
                };

                // Map the date data and only use the day (dd)
                const categories = result.data.map((item) => {
                    const date = new Date(item.date);
                    return date.getDate(); // Returns the day of the month (from 1 to 31)
                });

                setTodayPassenger(result.data[result.data.length - 1].passengers);

                setBarChartDataDailyPassenger([formattedData]);
                setCategories(categories);
                console.log('Daily Passenger: ', formattedData);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, []);

    const barChartOptionsDailyTraffic = {
        chart: {
            toolbar: {
                show: false,
            },
        },
        tooltip: {
            style: {
                fontSize: '12px',
                fontFamily: undefined,
                backgroundColor: '#000000',
            },
            theme: 'dark',
        },
        xaxis: {
            categories: categories,
            show: false,
            labels: {
                show: true,
                style: {
                    colors: '#A3AED0',
                    fontSize: '14px',
                    fontWeight: '500',
                },
            },
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
        },
        yaxis: {
            show: false,
            color: 'black',
            labels: {
                show: true,
                style: {
                    colors: '#CBD5E0',
                    fontSize: '14px',
                },
            },
        },
        grid: {
            show: false,
            strokeDashArray: 5,
            yaxis: {
                lines: {
                    show: true,
                },
            },
            xaxis: {
                lines: {
                    show: false,
                },
            },
        },
        fill: {
            type: 'gradient',
            gradient: {
                type: 'vertical',
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.9,
                colorStops: [
                    [
                        {
                            offset: 0,
                            color: '#4318FF',
                            opacity: 1,
                        },
                        {
                            offset: 100,
                            color: 'rgba(67, 24, 255, 1)',
                            opacity: 0.28,
                        },
                    ],
                ],
            },
        },
        dataLabels: {
            enabled: false,
        },
        plotOptions: {
            bar: {
                borderRadius: 3,
                columnWidth: '40px',
            },
        },
    };

    return (
        <Card extra="pb-7 p-[20px]">
            <div className="flex flex-row justify-between">
                <div className="ml-1 pt-2">
                    <p className="text-sm font-medium leading-4 text-gray-600">Daily Passenger</p>
                    <p className="text-[34px] font-bold text-navy-700 dark:text-white">
                        {todayPassenger} <span className="text-sm font-medium leading-6 text-gray-600">Passengers</span>
                    </p>
                </div>
            </div>

            <div className="h-[300px] w-full pt-10 pb-0">
                <Chart
                    options={barChartOptionsDailyTraffic}
                    series={barChartDataDailyPassenger}
                    type="bar"
                    width="100%"
                    height="100%"
                />
            </div>
        </Card>
    );
};

export default DailyTraffic;
