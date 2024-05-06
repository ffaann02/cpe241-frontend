// Layouts and components
import {
    Flex,
} from '@chakra-ui/react'


// Accordion 
import {
    Accordion,

} from '@chakra-ui/react'



// components
import BookingCard from './BookingCard'
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

  export default BookingHistory;
  