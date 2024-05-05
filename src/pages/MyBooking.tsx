import { useState, useEffect } from 'react';


// Layouts and components
import {
  Box,
  Center,
  Text,
  Flex,
  IconButton,
  Button,
  Heading,
  Divider,
  Stack,
  InputGroup,
  InputLeftElement,
  Input,
  Image,
} from '@chakra-ui/react'

// Icons
import {
  SearchIcon,
  BellIcon,
  ChevronDownIcon,
  ExternalLinkIcon,
  HamburgerIcon,
  ArrowForwardIcon,
} from '@chakra-ui/icons'

// Menu 
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react'

// Accordion 
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react'

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
} from '@chakra-ui/react'


const Header = () => {
  return (
    <Flex flexDirection={'column'} align={'center'} p={0} m={0} w='full' h='auto' gap={5}>
      {/* First row */}
      <Flex flexDirection={'row'} justify={'space-between'} w={{ base: '100%' }} h='auto' gap='2'>
        <Box w='auto' h='auto' >
          <Heading color='gray.900'>Flight</Heading>
        </Box>
        <Flex w='auto' h='auto' gap={2} >
          {/* Search Icon */}
          <IconButton isRound={true} aria-label='Search' icon={<SearchIcon />} bg='gray.50' />
          {/* Notification Icon */}
          <IconButton isRound={true} aria-label='Notification' icon={<BellIcon />} bg='gray.50' />
          {/* Drop down Menu */}
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} bg='gray.50' border={5}>
              Username
            </MenuButton>
            <MenuList color={'gray.900'}>
              <MenuItem>Profile</MenuItem>
              <MenuItem>Create a Copy</MenuItem>
              <MenuItem>Mark as Draft</MenuItem>
              <MenuItem>Delete</MenuItem>
              <MenuItem>Attend a Workshop</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
      {/* Second row */}
      <Flex flexDirection={'row'} justify={'space-between'} w={{ base: '100%', }} h='auto' gap='2'>
        {/* Search Result */}
        <Center w='auto' h='auto' >
          <Stack direction='row' spacing={4}>
            <Flex flexDirection={'row'} align={'center'} gap={2}>
              <Text fontSize='md' fontWeight={'normal'} color='gray.900'>Jakarta</Text>
              <ArrowForwardIcon color='gray.500' />
              <Text fontSize='md' fontWeight={'normal'} color='gray.900' >Bali</Text>
            </Flex>
            <Button size='sm' fontWeight={'normal'} borderRadius={'md'} variant={'outline'}>
              Edit Search
            </Button>
          </Stack>
        </Center>
        {/* Filter and Exports */}
        <Box w='auto' h='auto' >
          <Stack direction='row' spacing={2}>

            <Button size='sm' leftIcon={<HamburgerIcon />} fontWeight={'normal'} borderRadius={'md'} variant={'outline'}>
              Filters
            </Button>
            <Button size='sm' leftIcon={<ExternalLinkIcon />} fontWeight={'normal'} borderRadius={'md'} variant={'outline'}>
              Exports
            </Button>
          </Stack>
        </Box>
      </Flex>
      {/* Divider */}
      <Center mb={{ base: '2', lg: '5' }} w={{ base: '100%', lg: '80%' }} >
        <Divider color='gray.50' />
      </Center>
    </Flex>
  )
}
const HistoryAndSearch = () => {
  return (
    <Flex flexDirection={'row'} w={{ base: '100%', lg: '80%' }} h='auto' gap='2' mb={{ base: '2' }}>
      <Box w='100%' h='auto' >
        <Flex flexDirection='row' gap={2} >
          {/* Drop down history */}
          <Box>
            <Menu>
              <MenuButton
                borderRadius='md'
                fontWeight='normal'
                size={{ base: 'xs', md: 'sm' }}
                fontSize={{ base: 'sm', md: 'md' }}
                variant='outline'
                color='gray.500'
                as={Button}
                rightIcon={<ChevronDownIcon />}
              >
                All Times
              </MenuButton>
              <MenuList color='gray.900' fontSize={{ base: 'xs', md: 'sm' }} >
                <MenuItem>Profile</MenuItem>
                <MenuItem>Create a Copy</MenuItem>
                <MenuItem>Mark as Draft</MenuItem>
                <MenuItem>Delete</MenuItem>
                <MenuItem>Attend a Workshop</MenuItem>
              </MenuList>
            </Menu>
          </Box>
          {/* Search bar */}
          <InputGroup
            size={{ base: 'xs', md: 'sm' }}
            fontSize={{ base: 'sm', md: 'md' }}
            w={{ base: 'full', sm: '30%' }}
            maxWidth={{ base: 'unset', sm: '30%' }}
          >
            <InputLeftElement pointerEvents='none'>
              <SearchIcon color='gray.300' />
            </InputLeftElement>
            <Input borderRadius='md' type='text' placeholder='Search airline name' />
          </InputGroup>
        </Flex>
      </Box>
    </Flex>
  )
}
interface FlightDetail {
  flightNumber: string;
  airline: string;
  origin: string;
  destination: string;
  departureDate: string; // ISO 8601 date-time format
  arrivalDate: string; // ISO 8601 date-time format
}

interface BookingInfo {
  bookingId: string;
  passengerName: string;
  flightDetails: FlightDetail[];
  bookingDate: string; // ISO 8601 date-time format
  seatNumber: string;
  cabinClass: string;
  totalCost: number;
}

const bookingData: BookingInfo[] = [
  {
    "bookingId": "BK001",
    "passengerName": "John Doe",
    "flightDetails": [
      {
        "flightNumber": "AA123",
        "airline": "American Airlines",
        "origin": "New York (JFK)",
        "destination": "Chicago (ORD)",
        "departureDate": "2023-06-15T10:30:00Z",
        "arrivalDate": "2023-06-15T12:15:00Z"
      },
      {
        "flightNumber": "AA789",
        "airline": "American Airlines",
        "origin": "Chicago (ORD)",
        "destination": "Los Angeles (LAX)",
        "departureDate": "2023-06-15T13:45:00Z",
        "arrivalDate": "2023-06-15T15:30:00Z"
      }
    ],
    "bookingDate": "2023-05-01T15:22:00Z",
    "seatNumber": "24A",
    "cabinClass": "Economy",
    "totalCost": 450.99
  },
  {
    "bookingId": "BK002",
    "passengerName": "Emily Wilson",
    "flightDetails": [
      {
        "flightNumber": "UA456",
        "airline": "United Airlines",
        "origin": "Chicago (ORD)",
        "destination": "San Francisco (SFO)",
        "departureDate": "2023-07-10T08:00:00Z",
        "arrivalDate": "2023-07-10T10:15:00Z"
      }
    ],
    "bookingDate": "2023-06-20T09:45:00Z",
    "seatNumber": "18B",
    "cabinClass": "Business",
    "totalCost": 800.25
  },
  {
    "bookingId": "BK003",
    "passengerName": "Michael Brown",
    "flightDetails": [
      {
        "flightNumber": "DL789",
        "airline": "Delta Air Lines",
        "origin": "Miami (MIA)",
        "destination": "Atlanta (ATL)",
        "departureDate": "2023-08-05T13:15:00Z",
        "arrivalDate": "2023-08-05T15:00:00Z"
      },
      {
        "flightNumber": "DL567",
        "airline": "Delta Air Lines",
        "origin": "Atlanta (ATL)",
        "destination": "Seattle (SEA)",
        "departureDate": "2023-08-05T16:30:00Z",
        "arrivalDate": "2023-08-05T19:00:00Z"
      }
    ],
    "bookingDate": "2023-07-20T11:10:00Z",
    "seatNumber": "32F",
    "cabinClass": "Economy",
    "totalCost": 525.99
  }
]

interface BookingCardProps {
  booking: BookingInfo;
}

const BookingHistory = ({ bookingData }) => {
  return (
    <Flex flexDirection={'column'} w='full' h='xs' bg='white' >
      <Accordion defaultIndex={[0]} allowMultiple>

        {bookingData.map((booking, index) => (
          <BookingCard key={index} booking={booking} />
        ))}
      </Accordion>

    </Flex>
  );
};



const BookingCardDetail: React.FC<BookingCardProps> = ({ booking }) => {
  const { activeStep } = useSteps({
    index: -1,
    count: booking.flightDetails.length + 1,
  })
  const flights: FlightDetail[] = booking.flightDetails;
  return (
    // <></>
    <Stepper index={activeStep} orientation='vertical' height='auto' gap='0'>
      {flights.map((flight, index) => (
        <Step key={index}>
          <StepIndicator>
            <StepStatus
              complete={<StepIcon />}
              incomplete={<StepNumber />}
              active={<StepNumber />}
            />
          </StepIndicator>

          <Box flexShrink='0'>
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

const BookingCard: React.FC<BookingCardProps> = ({ booking }) => {
  const flights = booking.flightDetails;
  return (
    <AccordionItem>
      <AccordionButton>
        <Flex flexDirection={'row'} w={{ base: 'full' }} gap={2} align={'center'} justify={'space-between'}  >
          <Center flex={1} >
            <Text>{booking.flightDetails[0].airline}</Text>
          </Center>
          <Flex flex={1} flexDirection={'column'}>
            <Text>9:10 - 21:00</Text>
            <Text>{`${flights[0].origin}, ${flights[flights.length - 1].destination}`}</Text>
          </Flex>
          <Flex flex={1} flexDirection={'column'}>
            <Text>{booking.bookingId}</Text>
            <Text>{booking.cabinClass}</Text>
          </Flex>
          <Box flex={1} justifyContent={'right'} >
            <Button size='sm' fontWeight={'normal'} borderRadius={'md'} variant={'outline'}>
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

export default function MyBooking() {
  return (
    <>
      <Center bg='gray-50' w={{ base: '100vw' }} h='auto' p={4} color='gray.900' mt='5'>
        <Flex flexDirection={'column'} align={'center'} w='100%' color='gray.900' gap='2'>

          <Flex flexDirection={'column'} w={{ base: '100%', lg: '80%' }} gap='2'>

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
  )
}
