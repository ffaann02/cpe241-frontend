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
    Stack,
} from '@chakra-ui/react';

// table components
import {
    FormControl,
    FormLabel,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    FormHelperText,
    Input,
    Select,
} from '@chakra-ui/react';

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react';

import { useEffect, useState } from 'react';
import axiosPrivate from '../../../../../api/axios';


const ModalEditFlight = ({ isOpen, onClose, editingAircraft, setEditingAircraft, handleSave }) => {

    const [airlineList, setAirlineList] = useState([]);

    useEffect(() => {
        const getAirlines = async () => {
            const response = await axiosPrivate.get('/api/search/airlines');
            setAirlineList(response.data);
        };

        getAirlines();
    }, []);

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered motionPreset="slideInBottom">
            <ModalOverlay />
            <ModalContent backgroundColor={'white'} minWidth={'50vw'}>
                <ModalHeader>Edit Aircraft Information</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {editingAircraft && (
                        <Stack spacing={4}>
                            <FormControl id="airlineName" isRequired>
                                <FormLabel>Airline Name</FormLabel>
                                <Select
                                    placeholder="Select airline"
                                    value={editingAircraft.airlineName}
                                    onChange={(e) => setEditingAircraft((prev) => ({ ...prev, airlineName: e.target.value }))}
                                    name="airlineName"
                                >
                                    {/* Add airline options here */}
                                    {airlineList.map((airline, index) => (
                                        <option key={index} value={airline.airlineName}>
                                            {airline.airlineName}
                                        </option>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl id="aircraftCallSign" isRequired>
                                <FormLabel>Aircraft Call Sign</FormLabel>
                                <Input
                                    type="text"
                                    value={editingAircraft.aircraftCallSign}
                                    onChange={(e) => setEditingAircraft((prev) => ({ ...prev, aircraftCallSign: e.target.value }))}
                                    name="aircraftCallSign"
                                />
                            </FormControl>
                            <FormControl id="manufacturer" isRequired>
                                <FormLabel>Manufacturer</FormLabel>
                                <Input
                                    type="text"
                                    value={editingAircraft.manufacturer}
                                    onChange={(e) => setEditingAircraft((prev) => ({ ...prev, manufacturer: e.target.value }))}
                                />
                            </FormControl>
                            <FormControl id="model" isRequired>
                                <FormLabel>Model</FormLabel>
                                <Input
                                    type="text"
                                    value={editingAircraft.model}
                                    onChange={(e) => setEditingAircraft((prev) => ({ ...prev, model: e.target.value }))}
                                />
                            </FormControl>
                            <FormControl id="maxCapacity" isRequired>
                                <FormLabel>Max Capacity</FormLabel>
                                <NumberInput
                                    min={0}
                                    max={1000}
                                    value={editingAircraft.maxCapacity}
                                    onChange={(valueString) =>
                                        setEditingAircraft((prev) => ({
                                            ...prev,
                                            maxCapacity: parseInt(valueString) || 0,
                                        }))
                                    }
                                >
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </FormControl>
                            <FormControl id="status" isRequired>
                                <FormLabel>Status</FormLabel>
                                <Select
                                    placeholder="Select status"
                                    value={editingAircraft.status}
                                    onChange={(e) =>
                                        setEditingAircraft((prev) => ({
                                            ...prev,
                                            status: parseInt(e.target.value, 10),
                                        }))
                                    }
                                >
                                    <option value={1}>Active</option>
                                    <option value={2}>Maintenance</option>
                                    <option value={0}>Inactive</option>
                                </Select>
                            </FormControl>
                        </Stack>
                    )
                    }
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={handleSave}>
                        Save
                    </Button>
                    <Button variant="ghost" onClick={onClose}>
                        Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
export default ModalEditFlight;
