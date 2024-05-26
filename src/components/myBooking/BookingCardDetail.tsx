// Layouts and components
import { Box } from '@chakra-ui/react';

// Stepper
import {
    Step,
    StepDescription,
    StepIcon,
    StepIndicator,
    StepNumber,
    StepSeparator,
    StepStatus,
    StepTitle,
    Stepper,
    useSteps,
} from '@chakra-ui/react';

import { BookingCardProps, FlightDetail } from './types/FlightType';

const BookingCardDetail: React.FC<BookingCardProps> = ({ booking }) => {
    const { activeStep } = useSteps({
        index: -1, // Initial index should be 0, not -1
        count: booking.flightDetails.length + 1,
    });

    const flights: FlightDetail[] = booking.flightDetails;

    return (
        <Stepper index={activeStep} orientation="vertical" height="auto" gap="0">
            {flights.map((flight, index) => (
                <Step key={index}>
                    <StepIndicator>
                        <StepStatus complete={<StepIcon />} incomplete={<StepNumber />} active={<StepNumber />} />
                    </StepIndicator>
                    <Box flexShrink="0">
                        <StepTitle>{flight.airline}</StepTitle>
                        <StepDescription>
                            {flight.origin} - {flight.destination}
                        </StepDescription>
                    </Box>
                    <StepSeparator />
                </Step>
            ))}
        </Stepper>
    );
};

export default BookingCardDetail;
