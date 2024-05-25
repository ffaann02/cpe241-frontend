import React, { useState } from 'react';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Flex,
    useDisclosure,
} from '@chakra-ui/react';

// Icons
import { EditIcon } from '@chakra-ui/icons';
import { FaArrowLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import axiosPrivate from '../../../../../api/axios';
import ModalEditAircraft from './modalEditAircraft';
import { LoadingSpinner } from '../../../../../components/LoadingGroup';
import { AircraftInfo } from './aircraftBoard';

const AircraftTable = ({ aircraftData, searchAircraftCallSign, aircraftsForCurrentPage }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [editingAircraft, setEditingAircraft] = useState<AircraftInfo | null>(null);

    const handleEdit = (aircraft: AircraftInfo) => {
        setEditingAircraft(aircraft);
        onOpen();
    };

    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        try {
            onClose();
            setLoading(true);
            const response = await axiosPrivate.post(`/api/aircraft/${editingAircraft.aircraftID}`, editingAircraft);
            console.log(response.data);
            setLoading(false);
        } catch (error) {
            onClose();
            console.log(error);
            setLoading(false);
        }
    };
    const statusList = ['Inactive','Active', 'Maintenance'] // status array order by status code
    return (
        <>
            <LoadingSpinner loading={loading} />
            <TableContainer className="px-6 pt-6 pb-4 bg-white border rounded-lg relative">
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th></Th>
                            <Th></Th>
                            <Th>Aircraft ID</Th>
                            <Th>Airline Name</Th>
                            <Th>Aircraft Call Sign</Th>
                            <Th>Manufacturer</Th>
                            <Th>Model</Th>
                            <Th>Max Capacity</Th>
                            <Th>Status</Th>
                        </Tr>
                    </Thead>
                    {aircraftsForCurrentPage.length > 0 ? (
                        <Tbody>
                            {aircraftsForCurrentPage.map((aircraft, index) => (
                                <Tr key={index}>
                                    <Td>
                                        <p className="text-sm">{index + 1}.</p>
                                    </Td>
                                    <Td>
                                        <Flex justifyContent="center">
                                            <EditIcon cursor="pointer" onClick={() => handleEdit(aircraft)} />
                                        </Flex>
                                    </Td>
                                    <Td>{aircraft.aircraftID}</Td>
                                    <Td>{aircraft.airlineName}</Td>
                                    <Td>
                                        {aircraft.aircraftCallSign}
                                    </Td>
                                    <Td>
                                        {aircraft.manufacturer} 
                                    </Td>
                                    <Td>{aircraft.model}</Td>
                                    <Td>{aircraft.maxCapacity}</Td>
                                    <Td>{statusList[aircraft.status]}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    ) : (
                        <Tbody>
                            <Tr>
                                <Td colSpan={8} className="text-center">
                                    <p className="text-center">ไม่พบรายการเครื่องบินที่คุณค้นหา</p>
                                </Td>
                            </Tr>
                        </Tbody>
                    )}
                </Table>
            </TableContainer>
            <ModalEditAircraft
                isOpen={isOpen}
                onClose={onClose}
                editingAircraft={editingAircraft}
                setEditingAircraft={setEditingAircraft}
                handleSave={handleSave}
            />
        </>
    );
};

export default AircraftTable;
