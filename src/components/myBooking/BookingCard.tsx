import React from 'react'

// layout
import {
  Box,
  Center,
  Text,
  Flex,
  Button,
} from '@chakra-ui/react'

// Accordion 
import {
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react'

// components
import { BookingCardProps } from './types/FlightType';
import  BookingCardDetail  from './BookingCardDetail';

const BookingCard: React.FC<BookingCardProps> = ({ booking }) => {
  const flights = booking.flightDetails;

  return (
    <AccordionItem>
      <AccordionButton>
        <Flex flexDirection="row" w={{ base: 'full' }} gap={2} align="center" justify="space-between">
          <Center flex={1}>
            <Text>{booking.flightDetails[0].airline}</Text>
          </Center>
          <Flex flex={1} flexDirection="column">
            <Text>9:10 - 21:00</Text>
            <Text>{`${flights[0].origin}, ${flights[flights.length - 1].destination}`}</Text>
          </Flex>
          <Flex flex={1} flexDirection="column">
            <Text>{booking.bookingId}</Text>
            <Text>{booking.cabinClass}</Text>
          </Flex>
          <Box flex={1} justifyContent="right">
            <Button size="sm" fontWeight="normal" borderRadius="md" variant="outline">
              Details
              <AccordionIcon />
            </Button>
          </Box>
        </Flex>
      </AccordionButton>

      {/* <Center>
        <Divider />
      </Center> */}

      <AccordionPanel pb={4}>
        <BookingCardDetail booking={booking} />
      </AccordionPanel>
    </AccordionItem>
  );
};

export default BookingCard;