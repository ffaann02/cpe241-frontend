// Layouts and components
import { Center, Flex } from '@chakra-ui/react';

// import components
import Header from '../components/myBooking/Header';
import HistoryAndSearch from '../components/myBooking/HistoryAndSearch';
import BookingHistory from '../components/myBooking/BookingHistory';
import { BookingInfo } from '../components/myBooking/types/FlightType';

const bookingData: BookingInfo[] = [
    {
        bookingId: 'BK001',
        passengerName: 'John Doe',
        flightDetails: [
            {
                flightNumber: 'AA123',
                airline: 'American Airlines',
                origin: 'New York (JFK)',
                destination: 'Chicago (ORD)',
                departureDate: '2023-06-15T10:30:00Z',
                arrivalDate: '2023-06-15T12:15:00Z',
            },
            {
                flightNumber: 'AA789',
                airline: 'American Airlines',
                origin: 'Chicago (ORD)',
                destination: 'Los Angeles (LAX)',
                departureDate: '2023-06-15T13:45:00Z',
                arrivalDate: '2023-06-15T15:30:00Z',
            },
        ],
        bookingDate: '2023-05-01T15:22:00Z',
        seatNumber: '24A',
        cabinClass: 'Economy',
        totalCost: 450.99,
    },
    {
        bookingId: 'BK002',
        passengerName: 'Emily Wilson',
        flightDetails: [
            {
                flightNumber: 'UA456',
                airline: 'United Airlines',
                origin: 'Chicago (ORD)',
                destination: 'San Francisco (SFO)',
                departureDate: '2023-07-10T08:00:00Z',
                arrivalDate: '2023-07-10T10:15:00Z',
            },
        ],
        bookingDate: '2023-06-20T09:45:00Z',
        seatNumber: '18B',
        cabinClass: 'Business',
        totalCost: 800.25,
    },
    {
        bookingId: 'BK003',
        passengerName: 'Michael Brown',
        flightDetails: [
            {
                flightNumber: 'DL789',
                airline: 'Delta Air Lines',
                origin: 'Miami (MIA)',
                destination: 'Atlanta (ATL)',
                departureDate: '2023-08-05T13:15:00Z',
                arrivalDate: '2023-08-05T15:00:00Z',
            },
            {
                flightNumber: 'DL567',
                airline: 'Delta Air Lines',
                origin: 'Atlanta (ATL)',
                destination: 'Seattle (SEA)',
                departureDate: '2023-08-05T16:30:00Z',
                arrivalDate: '2023-08-05T19:00:00Z',
            },
        ],
        bookingDate: '2023-07-20T11:10:00Z',
        seatNumber: '32F',
        cabinClass: 'Economy',
        totalCost: 525.99,
    },
];

export default function MyBooking() {
    return (
        <>
            <Center bg="gray-50" w={{ base: '100vw' }} h="auto" p={4} color="gray.900" mt="5">
                <Flex flexDirection={'column'} align={'center'} w="100%" color="gray.900" gap="2">
                    <Flex flexDirection={'column'} w={{ base: '100%', lg: '80%' }} gap="2">
                        {/* Header */}
                        <Header />

                        {/* Content */}
                        {/* History and Search */}
                        <HistoryAndSearch />
                        {/* Booking History */}
                        <BookingHistory bookingData={bookingData} />
                    </Flex>
                </Flex>
            </Center>
        </>
    );
}
