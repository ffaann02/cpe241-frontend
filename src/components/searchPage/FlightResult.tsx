import { FlightCard } from './flightResult/FlightCard';
import { useEffect, useState, useCallback } from 'react';
import { Box, Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react';
import HeaderSortCard from './flightResult/HeaderSortCard';
import { Flight } from '../../pages/Search';
const FlightResult = ({
    isFetching,
    flightResult,
    passengerAmount,
}: {
    isFetching: boolean;
    flightResult: Flight[];
    passengerAmount: number;
}) => {
    const [sortType, setSortType] = useState<string>('price'); // 1: recommend, 2: price, 3: fastest
    const [sortBy, setSortBy] = useState(1);
    const [filteredFlightResult, setFilteredFlightResult] = useState<Flight[]>([]);

    // const isTimeInRange = (time: string, startTime: string, endTime: string) => {
    //     const [startHour, startMinute] = startTime.split(':').map(Number);
    //     const [endHour, endMinute] = endTime.split(':').map(Number);
    //     const [flightHour, flightMinute] = time.split(':').map(Number);
    //     const startTotalMinutes = startHour * 60 + startMinute;
    //     const endTotalMinutes = endHour * 60 + endMinute;
    //     const flightTotalMinutes = flightHour * 60 + flightMinute;
    //     return startTotalMinutes <= flightTotalMinutes && flightTotalMinutes < endTotalMinutes;
    // };

    // const filterCallback = useCallback(
    //     (flight) => {
    //         if (!selectedTime.q1 && !selectedTime.q2 && !selectedTime.q3 && !selectedTime.q4) {
    //             return true;
    //         }
    //         if (
    //             (selectedTime.q1 && isTimeInRange(flight.departureTime, '00:00', '06:00')) ||
    //             (selectedTime.q2 && isTimeInRange(flight.departureTime, '06:00', '12:00')) ||
    //             (selectedTime.q3 && isTimeInRange(flight.departureTime, '12:00', '18:00')) ||
    //             (selectedTime.q4 && isTimeInRange(flight.departureTime, '18:00', '24:00'))) {
    //             return true;
    //         }
    //         return false;
    //     },
    //     [selectedTime, isTimeInRange]
    // );
    // useEffect(() => {
    //     const newFilteredFlightResult = flightResult.filter(filterCallback);
    //     setFilteredFlightResult(newFilteredFlightResult);
    // }, [selectedTime, filterCallback]);
    const selectSortType = (type: string) => {
        setSortType(type);
    };
    return (
        <div className="col-span-9 flex flex-col gap-y-3">
            {!isFetching ? (
                <HeaderSortCard
                    sortType={sortType}
                    selectSortType={selectSortType}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                />
            ) : (
                <div className="w-full h-16 grid grid-cols-4 gap-x-2">
                    {Array(4)
                        .fill(null)
                        .map((_) => (
                            <Skeleton borderRadius={4} />
                        ))}
                </div>
            )}
            {isFetching &&
                Array(7)
                    .fill(null)
                    .map((_, index) => (
                        <Box key={index} padding="5" bg="white" className="border border-neutral-300 rounded-md">
                            <SkeletonCircle size="10" isLoaded={!isFetching} />
                            <SkeletonText isLoaded={!isFetching} mt="4" noOfLines={2} spacing="3" skeletonHeight="2" />
                        </Box>
                    ))}
            {flightResult.map((flight, index) => (
                <div key={index}>
                    <FlightCard flight={flight} index={index} passengerAmount={passengerAmount} />
                </div>
            ))}
        </div>
    );
};
export default FlightResult;
