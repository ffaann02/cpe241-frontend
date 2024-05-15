import React, { useState } from 'react';
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Flex,
    Button,
    useDisclosure,
    Input,
} from '@chakra-ui/react';

// Icons
import { EditIcon } from '@chakra-ui/icons';
import { FaArrowLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import axiosPrivate from '../../../../../api/axios';
import ModalEditFlight from './modalEditFlight';
import { LoadingSpinner } from '../../../../../components/LoadingGroup';
import { FlightInfo } from './flightBoard';

const FlightTable = ({ flightData, searchFlightNumber, flightsForCurrentPage }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [editingFlight, setEditingFlight] = useState<FlightInfo | null>(null);

    const handleEdit = (flight: FlightInfo) => {
        setEditingFlight(flight);
        onOpen();
    };

    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        try {
            setLoading(true);
            const response = await axiosPrivate.post('/api/flight/edit', editingFlight);
            console.log(response.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
        // onClose();
    };

    return (
        <>
            <LoadingSpinner loading={loading} />
            <TableContainer className="px-6 pt-6 pb-4 bg-white border rounded-lg relative">
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th></Th>
                            <Th></Th>
                            <Th>Flight Number</Th>
                            <Th>Airline</Th>
                            <Th>Origin</Th>
                            <Th>Destination</Th>
                            <Th>Departure</Th>
                            <Th>Arrival</Th>
                        </Tr>
                    </Thead>
                    {flightsForCurrentPage.length > 0 ? (
                        <Tbody>
                            {flightsForCurrentPage.map((flight, index) => (
                                <Tr key={index}>
                                    <Td>
                                        <p className="text-sm">{index + 1}.</p>
                                    </Td>
                                    <Td>
                                        <Flex justifyContent="center">
                                            <EditIcon cursor="pointer" onClick={() => handleEdit(flight)} />
                                        </Flex>
                                    </Td>
                                    <Td>{flight.flightNo}</Td>
                                    <Td>{flight.airlineName}</Td>
                                    <Td>
                                        {flight.arrivalCity} ({flight.arrivalIATACode})
                                    </Td>
                                    <Td>
                                        {flight.departureCity} ({flight.departureIATACode})
                                    </Td>
                                    <Td>{new Date(flight.departureDateTime).toLocaleString()}</Td>
                                    <Td>{new Date(flight.arrivalDateTime).toLocaleString()}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    ) : (
                        <Tbody>
                            <Tr>
                                <Td colSpan={8} className="text-center">
                                    <p className="text-center">ไม่พบเที่ยวบินที่คุณค้นหา</p>
                                </Td>
                            </Tr>
                        </Tbody>
                    )}
                </Table>
            </TableContainer>
            <ModalEditFlight
                isOpen={isOpen}
                onClose={onClose}
                editingFlight={editingFlight}
                setEditingFlight={setEditingFlight}
                handleSave={handleSave}
            />
        </>
    );
};

export default FlightTable;
