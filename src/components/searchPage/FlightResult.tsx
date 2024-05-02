import { FlightCard } from './flightResult/FlightCard';
import fakeFlightData from '../../data/fakeFlightData.json';
import React from 'react';
import { Box, SkeletonCircle, SkeletonText } from '@chakra-ui/react';

export interface FlightData {
    airlineIcon: string;
    airline: string;
    flightNumber: string;
    FlightTime: string;
    departureTime: string;
    arrivalTime: string;
    duration: string;
    destination: string;
    subtotal: number;
}

const FlightResult = ({
    isFetching,
}: {
    isFetching: boolean;
    setIsFetching?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    return (
        <div className="col-span-9 flex flex-col gap-y-3">
            {isFetching &&
                Array(7)
                    .fill(null)
                    .map((_, index) => (
                        <Box key={index} padding="5" bg="white" className="border border-neutral-300 rounded-md">
                            <SkeletonCircle size="10" isLoaded={!isFetching} />
                            <SkeletonText isLoaded={!isFetching} mt="4" noOfLines={2} spacing="3" skeletonHeight="2" />
                        </Box>
                    ))}
            {fakeFlightData.map((flight, index) => (
                <div key={index}>
                    <FlightCard flight={flight} />
                </div>
            ))}
        </div>
    );
};
export default FlightResult;
