import React, { useState } from 'react';
import {
    Table,
    Thead,
    Tbody,
    TableCaption,
    TableContainer,
    Tr,
    Th,
    Td,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    useDisclosure,
} from '@chakra-ui/react';

export interface BookingInfo {
    bookingId: string;
    passengerId: string;
    flightId: string;
    userId: string;
    ticketNo: string;
    price: number;
    seatNumber: string;
    class: string;
    amount: number;
    bookingDateTime: string;
    paymentDateTime: string;
    paymentMethod: string;
}

const BookingTable: React.FC = () => {
    const [bookingData, setBookingData] = useState<BookingInfo[]>([
        {
            bookingId: 'BKG123456',
            passengerId: 'PAX001',
            flightId: 'AA123',
            userId: 'USR001',
            ticketNo: 'TCK123456',
            price: 350,
            seatNumber: '12A',
            class: 'Economy',
            amount: 1,
            bookingDateTime: '2024-05-10T14:00:00Z',
            paymentDateTime: '2024-05-10T14:05:00Z',
            paymentMethod: 'Credit Card',
        },
        {
            bookingId: 'BKG123457',
            passengerId: 'PAX002',
            flightId: 'UA456',
            userId: 'USR002',
            ticketNo: 'TCK123457',
            price: 450,
            seatNumber: '15B',
            class: 'Economy',
            amount: 1,
            bookingDateTime: '2024-05-10T15:00:00Z',
            paymentDateTime: '2024-05-10T15:10:00Z',
            paymentMethod: 'Debit Card',
        },
        {
            bookingId: 'BKG123458',
            passengerId: 'PAX003',
            flightId: 'DL789',
            userId: 'USR003',
            ticketNo: 'TCK123458',
            price: 500,
            seatNumber: '10C',
            class: 'Business',
            amount: 1,
            bookingDateTime: '2024-05-10T16:00:00Z',
            paymentDateTime: '2024-05-10T16:15:00Z',
            paymentMethod: 'PayPal',
        },
    ]);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [newTicketNo, setNewTicketNo] = useState('');
    const [newSeatNumber, setNewSeatNumber] = useState('');
    const [newPrice, setNewPrice] = useState('');

    const handleAddBooking = () => {
        const newBooking: BookingInfo = {
            bookingId: `BKG${Math.floor(Math.random() * 1000000)
                .toString()
                .padStart(6, '0')}`,
            passengerId: `PAX${Math.floor(Math.random() * 1000)
                .toString()
                .padStart(3, '0')}`,
            flightId: 'NEW123',
            userId: `USR${Math.floor(Math.random() * 1000)
                .toString()
                .padStart(3, '0')}`,
            ticketNo: newTicketNo,
            price: Number(newPrice),
            seatNumber: newSeatNumber,
            class: 'Economy',
            amount: 1,
            bookingDateTime: new Date().toISOString(),
            paymentDateTime: new Date().toISOString(),
            paymentMethod: 'Credit Card',
        };
        setBookingData([...bookingData, newBooking]);
        onClose();
    };

    return (
        <TableContainer>
            <Table variant="simple">
                <TableCaption>Booking Information</TableCaption>
                <Thead>
                    <Tr>
                        <Th>Booking ID</Th>
                        <Th>Passenger ID</Th>
                        <Th>Flight ID</Th>
                        <Th>User ID</Th>
                        <Th>Ticket No</Th>
                        <Th>Price</Th>
                        <Th>Seat Number</Th>
                        <Th>Class</Th>
                        <Th>Amount</Th>
                        <Th>Booking Date Time</Th>
                        <Th>Payment Date Time</Th>
                        <Th>Payment Method</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {bookingData.map((booking, index) => (
                        <Tr key={index}>
                            <Td>{booking.bookingId}</Td>
                            <Td>{booking.passengerId}</Td>
                            <Td>{booking.flightId}</Td>
                            <Td>{booking.userId}</Td>
                            <Td>{booking.ticketNo}</Td>
                            <Td>{booking.price}</Td>
                            <Td>{booking.seatNumber}</Td>
                            <Td>{booking.class}</Td>
                            <Td>{booking.amount}</Td>
                            <Td>{new Date(booking.bookingDateTime).toLocaleString()}</Td>
                            <Td>{new Date(booking.paymentDateTime).toLocaleString()}</Td>
                            <Td>{booking.paymentMethod}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
            <Button onClick={onOpen} colorScheme="teal" mt={4}>
                Add Booking
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add New Booking</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Ticket No</FormLabel>
                            <Input
                                value={newTicketNo}
                                onChange={(e) => setNewTicketNo(e.target.value)}
                                placeholder="Enter ticket number"
                            />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Seat Number</FormLabel>
                            <Input
                                value={newSeatNumber}
                                onChange={(e) => setNewSeatNumber(e.target.value)}
                                placeholder="Enter seat number"
                            />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Ticket Price</FormLabel>
                            <Input
                                value={newPrice}
                                onChange={(e) => setNewPrice(e.target.value)}
                                placeholder="Enter ticket price"
                                type="number"
                            />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleAddBooking}>
                            Save
                        </Button>
                        <Button variant="ghost" onClick={onClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </TableContainer>
    );
};

export default BookingTable;
