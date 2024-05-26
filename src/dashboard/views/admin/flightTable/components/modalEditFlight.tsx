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
import { FormControl, FormLabel, FormErrorMessage, FormHelperText } from '@chakra-ui/react';

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react';
const ModalEditFlight = ({ isOpen, onClose, editingFlight, setEditingFlight, handleSave }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered motionPreset="slideInBottom">
            <ModalOverlay />
            <ModalContent backgroundColor={'white'} gridColumn={2} minWidth={'50vw'}>
                <ModalHeader>Edit Flight Information</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {editingFlight && (
                        <div className="grid grid-cols-2 gap-x-4">
                            <form>
                                <FormControl mb={4}>
                                    <FormLabel>Flight Number</FormLabel>
                                    <Input
                                        value={editingFlight.flightNo}
                                        onChange={(e) =>
                                            setEditingFlight({
                                                ...editingFlight,
                                                flightNo: e.target.value,
                                            })
                                        }
                                    />
                                </FormControl>
                                <FormControl mb={4}>
                                    <FormLabel>Airline</FormLabel>
                                    <Input
                                        value={editingFlight.airlineName}
                                        onChange={(e) =>
                                            setEditingFlight({ ...editingFlight, airlineName: e.target.value })
                                        }
                                    />
                                </FormControl>
                                <FormControl mb={4}>
                                    <FormLabel>Aircraft</FormLabel>
                                    <Input
                                        value={editingFlight.aircraft}
                                        onChange={(e) =>
                                            setEditingFlight({ ...editingFlight, aircraft: e.target.value })
                                        }
                                    />
                                </FormControl>
                                <FormControl mb={4}>
                                    <FormLabel>Origin</FormLabel>
                                    <Input
                                        value={editingFlight.arrivalIATACode}
                                        onChange={(e) =>
                                            setEditingFlight({ ...editingFlight, arrivalIATACode: e.target.value })
                                        }
                                    />
                                </FormControl>
                                <FormControl mb={4}>
                                    <FormLabel>Destination</FormLabel>
                                    <Input
                                        value={editingFlight.departureIATACode}
                                        onChange={(e) =>
                                            setEditingFlight({ ...editingFlight, departureIATACode: e.target.value })
                                        }
                                    />
                                </FormControl>
                            </form>
                            <div>
                                <Flex direction={'row'} gap={2}>
                                    <FormControl mb={4}>
                                        <FormLabel>Arrival Date</FormLabel>
                                        <Input
                                            type="date"
                                            value={new Date(editingFlight.arrivalDateTime).toISOString().slice(0, 10)}
                                            onChange={(e) =>
                                                setEditingFlight({
                                                    ...editingFlight,
                                                    arrivalDateTime: `${e.target.value}T${new Date(editingFlight.arrivalDateTime).toISOString().slice(11, 16)}:00Z`,
                                                })
                                            }
                                        />
                                    </FormControl>
                                    <FormControl mb={4}>
                                        <FormLabel>Arrival Time</FormLabel>
                                        <Input
                                            type="time"
                                            value={new Date(editingFlight.arrivalDateTime).toISOString().slice(11, 16)}
                                            onChange={(e) =>
                                                setEditingFlight({
                                                    ...editingFlight,
                                                    arrivalDateTime: `${new Date(editingFlight.arrivalDateTime).toISOString().slice(0, 11)}${e.target.value}:00Z`,
                                                })
                                            }
                                        />
                                    </FormControl>
                                </Flex>
                                <Flex direction={'row'} gap={2}>
                                    <FormControl mb={4}>
                                        <FormLabel>Departure Date</FormLabel>
                                        <Input
                                            type="date"
                                            value={new Date(editingFlight.departureDateTime).toISOString().slice(0, 10)}
                                            onChange={(e) =>
                                                setEditingFlight({
                                                    ...editingFlight,
                                                    departureDateTime: `${e.target.value}T${new Date(editingFlight.departureDateTime).toISOString().slice(11, 16)}:00Z`,
                                                })
                                            }
                                        />
                                    </FormControl>
                                    <FormControl mb={4}>
                                        <FormLabel>Departure Time</FormLabel>
                                        <Input
                                            type="time"
                                            value={new Date(editingFlight.departureDateTime)
                                                .toISOString()
                                                .slice(11, 16)}
                                            onChange={(e) =>
                                                setEditingFlight({
                                                    ...editingFlight,
                                                    departureDateTime: `${new Date(editingFlight.departureDateTime).toISOString().slice(0, 11)}${e.target.value}:00Z`,
                                                })
                                            }
                                        />
                                    </FormControl>
                                </Flex>
                                <FormControl mb={4}>
                                    <FormLabel>Current Capacity</FormLabel>
                                    <Input
                                        value={editingFlight.currentCapacity}
                                        onChange={(e) =>
                                            setEditingFlight({
                                                ...editingFlight,
                                                currentCapacity: e.target.value,
                                            })
                                        }
                                    />
                                </FormControl>
                                <FormControl mb={4}>
                                    <FormLabel>Base Fare</FormLabel>
                                    <Input
                                        value={editingFlight.baseFare}
                                        onChange={(e) =>
                                            setEditingFlight({
                                                ...editingFlight,
                                                baseFare: e.target.value,
                                            })
                                        }
                                    />
                                </FormControl>
                                <FormControl mb={4}>
                                    <FormLabel>Status</FormLabel>
                                    <Input
                                        value={editingFlight.status}
                                        onChange={(e) =>
                                            setEditingFlight({
                                                ...editingFlight,
                                                status: e.target.value,
                                            })
                                        }
                                    />
                                </FormControl>
                            </div>
                        </div>
                    )}
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
