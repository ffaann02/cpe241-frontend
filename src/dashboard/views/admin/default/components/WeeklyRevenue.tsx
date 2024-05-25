import Card from '../../../../components/card';
import { MdBarChart } from 'react-icons/md';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import axiosPrivate from '../../../../../api/axios';

const WeeklyRevenue = () => {
    const [barChartDataWeeklyFlights, setBarChartDataWeeklyFlights] = useState([]);
    const getCurrentWeek = () => {
        const today = new Date();
        const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
        const pastDaysOfYear = (+today - +firstDayOfYear) / 86400000;
        return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axiosPrivate.get('api/dashboard/overview/flightsperweek');
                setBarChartDataWeeklyFlights(result.data);
                console.log('Bar Chart Data: ', result.data);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, []);

    const barChartOptionsWeeklyRevenue = {
        chart: {
            stacked: true,
            toolbar: {
                show: false,
            },
        },
        // colors:['#ff3322','#faf']
        tooltip: {
            style: {
                fontSize: '12px',
                fontFamily: undefined,
                backgroundColor: '#000000',
            },
            theme: 'dark',
            onDatasetHover: {
                style: {
                    fontSize: '12px',
                    fontFamily: undefined,
                },
            },
        },
        xaxis: {
            categories: Array.from({ length: 8 }, (_, i) => `${getCurrentWeek() - 4 + i}`),
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
                show: false,
                style: {
                    colors: '#A3AED0',
                    fontSize: '14px',
                    fontWeight: '500',
                },
            },
        },

        grid: {
            borderColor: 'rgba(163, 174, 208, 0.3)',
            show: true,
            yaxis: {
                lines: {
                    show: false,
                    opacity: 0.5,
                },
            },
            row: {
                opacity: 0.5,
            },
            xaxis: {
                lines: {
                    show: false,
                },
            },
        },
        fill: {
            type: 'solid',
            colors: ['#5E37FF', '#6AD2FF', '#E1E9F8'],
        },
        legend: {
            show: false,
        },
        colors: ['#5E37FF', '#6AD2FF', '#E1E9F8'],
        dataLabels: {
            enabled: false,
        },
        plotOptions: {
            bar: {
                borderRadius: 3,
                columnWidth: '20px',
            },
        },
    };

    return (
        <Card extra="flex flex-col bg-white w-full rounded-3xl py-6 px-2 text-center">
            <div className="mb-auto flex items-center justify-between px-6">
                <h2 className="text-lg font-bold text-navy-700 dark:text-white">Weekly Flights</h2>
                <button className="!linear z-[1] flex items-center justify-center rounded-lg bg-lightPrimary p-2 text-brand-500 !transition !duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10">
                    <MdBarChart className="h-6 w-6" />
                </button>
            </div>

            <div className="md:mt-16 lg:mt-0">
                <div className="h-[250px] w-full xl:h-[350px]">
                    {/* <BarChart chartData={barChartDataWeeklyFlights} chartOptions={barChartOptionsWeeklyRevenue} /> */}
                    <Chart
                        options={barChartOptionsWeeklyRevenue}
                        series={barChartDataWeeklyFlights}
                        type="bar"
                        width="100%"
                        height="100%"
                    />
                </div>
            </div>
        </Card>
    );
};

export default WeeklyRevenue;
