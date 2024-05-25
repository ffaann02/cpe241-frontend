import {
    Box,
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
    Stack,
    Text,
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
    Input,
} from '@chakra-ui/react';

import { useEffect, useState } from 'react';
import axiosPrivate from '../../../../../api/axios';

interface aircraftCreateForm {
    airlineName: string; // Changed from airLineName
    aircraftCallSign: string;
    manufacturer: string;
    model: string;
    maxCapacity: number;
    status: number;
}

const ModalAddAircraft = ({
    isAddAircraft,
    onCloseAddAircraft,
    setAircraftData,
}) => {
    const [newAircraft, setNewAircraft] = useState<aircraftCreateForm>({
        airlineName: '',
        aircraftCallSign: '',
        manufacturer: '',
        model: '',
        maxCapacity: 0,
        status: 1, // Set a default status value
    });

    const handleCreateAircraft = async () => {
        try {
            const { airlineName, aircraftCallSign, manufacturer, model, maxCapacity, status } = newAircraft;
            const body = {
                airlineName,
                aircraftCallSign,
                manufacturer,
                model,
                maxCapacity,
                status,
            };
            console.log(body);
            const response = await axiosPrivate.post('/api/aircraft/create', body);
            const updatedAircraft = await response.data;
            setAircraftData((prev) => [...prev, updatedAircraft]);
            onCloseAddAircraft();
        } catch (error) {
            console.log(error);
        }
    };

    const [airlineList, setAirlineList] = useState<any[]>([]);

    useEffect(() => {
        const getAirlines = async () => {
            const response = await axiosPrivate.get('/api/search/airlines');
            setAirlineList(response.data);
        };

        getAirlines();
    }, []);



    return (
        <Modal isOpen={isAddAircraft} onClose={onCloseAddAircraft}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Add New Aircraft</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Stack spacing={4}>
                        <FormControl id="airlineName" isRequired>
                            <FormLabel>Airline Name</FormLabel>
                            <Select
                                placeholder="Select airline"
                                value={newAircraft.airlineName}
                                onChange={(e) => setNewAircraft((prev) => ({ ...prev, airlineName: e.target.value }))}
                            >
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
                                value={newAircraft.aircraftCallSign}
                                onChange={(e) => setNewAircraft((prev) => ({ ...prev, aircraftCallSign: e.target.value }))}
                            />
                        </FormControl>
                        <FormControl id="manufacturer" isRequired>
                            <FormLabel>Manufacturer</FormLabel>
                            <Input
                                type="text"
                                value={newAircraft.manufacturer}
                                onChange={(e) => setNewAircraft((prev) => ({ ...prev, manufacturer: e.target.value }))}
                            />
                        </FormControl>
                        <FormControl id="model" isRequired>
                            <FormLabel>Model</FormLabel>
                            <Input
                                type="text"
                                value={newAircraft.model}
                                onChange={(e) => setNewAircraft((prev) => ({ ...prev, model: e.target.value }))}
                            />
                        </FormControl>
                        <FormControl id="maxCapacity" isRequired>
                            <FormLabel>Max Capacity</FormLabel>
                            <NumberInput
                                min={0}
                                max={1000}
                                value={newAircraft.maxCapacity}
                                onChange={(valueString) =>
                                    setNewAircraft((prev) => ({
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
                                value={newAircraft.status}
                                onChange={(e) =>
                                    setNewAircraft((prev) => ({
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
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={handleCreateAircraft}>
                        Save
                    </Button>
                    <Button variant="ghost" onClick={onCloseAddAircraft}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ModalAddAircraft;
