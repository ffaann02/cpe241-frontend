import { Box, Flex } from '@chakra-ui/react';

import BookingBoard from './components/bookingBoard';

const BookingTable = () => {
    return (
        <Flex mt={'3'}>
            <div className="w-full">
                <BookingBoard />
            </div>
        </Flex>
    );
};

export default BookingTable;
