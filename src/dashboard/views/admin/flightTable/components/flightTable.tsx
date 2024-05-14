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
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'

// Icons
import {
  EditIcon
}
  from '@chakra-ui/icons'

export interface FlightInfo {
  flightNumber: string;
  airline: string;
  origin: string;
  destination: string;
  departureDate: string; // ISO 8601 date-time format
  arrivalDate: string; // ISO 8601 date-time format
}

const FlightTable: React.FC = () => {
  const [flightData, setFlightData] = useState<FlightInfo[]>([
    {
      flightNumber: 'AA123',
      airline: 'American Airlines',
      origin: 'JFK',
      destination: 'LAX',
      departureDate: '2024-05-12T10:00:00Z',
      arrivalDate: '2024-05-12T13:30:00Z',
    },
    {
      flightNumber: 'UA456',
      airline: 'United Airlines',
      origin: 'ORD',
      destination: 'SFO',
      departureDate: '2024-05-12T11:30:00Z',
      arrivalDate: '2024-05-12T14:15:00Z',
    },
    {
      flightNumber: 'DL789',
      airline: 'Delta Air Lines',
      origin: 'ATL',
      destination: 'SEA',
      departureDate: '2024-05-12T09:00:00Z',
      arrivalDate: '2024-05-12T11:45:00Z',
    },
  ]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editingFlight, setEditingFlight] = useState<FlightInfo | null>(null);

  const handleEdit = (flight: FlightInfo) => {
    setEditingFlight(flight);
    onOpen();
  };

  const handleSave = () => {
    // Implement logic to save the edited flight data
    onClose();
  };

  return (
    <>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>Current Flight Operations</TableCaption>
          <Thead>
            <Tr>
              <Th>Flight Number</Th>
              <Th>Airline</Th>
              <Th>Origin</Th>
              <Th>Destination</Th>
              <Th>Departure</Th>
              <Th>Arrival</Th>
              <Th >Option</Th>
            </Tr>
          </Thead>
          <Tbody>
            {flightData.map((flight, index) => (
              <Tr key={index}>
                <Td>{flight.flightNumber}</Td>
                <Td>{flight.airline}</Td>
                <Td>{flight.origin}</Td>
                <Td>{flight.destination}</Td>
                <Td>{new Date(flight.departureDate).toLocaleString()}</Td>
                <Td>{new Date(flight.arrivalDate).toLocaleString()}</Td>
                <Td  >
                  <Flex justifyContent="center">
                    <EditIcon cursor="pointer" onClick={() => handleEdit(flight)} />
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Modal isOpen={isOpen} onClose={onClose} isCentered motionPreset="slideInBottom">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Flight Information</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {editingFlight && (
              <form>
                <FormControl mb={4}>
                  <FormLabel>Flight Number</FormLabel>
                  <Input
                    value={editingFlight.flightNumber}
                    onChange={(e) =>
                      setEditingFlight({
                        ...editingFlight,
                        flightNumber: e.target.value,
                      })
                    }
                  />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>Airline</FormLabel>
                  <Input
                    value={editingFlight.airline}
                    onChange={(e) =>
                      setEditingFlight({ ...editingFlight, airline: e.target.value })
                    }
                  />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>Origin</FormLabel>
                  <Input
                    value={editingFlight.origin}
                    onChange={(e) =>
                      setEditingFlight({ ...editingFlight, origin: e.target.value })
                    }
                  />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>Destination</FormLabel>
                  <Input
                    value={editingFlight.destination}
                    onChange={(e) =>
                      setEditingFlight({ ...editingFlight, destination: e.target.value })
                    }
                  />
                </FormControl>
                <Flex direction={'row'} gap={2}>
                <FormControl mb={4}>
                  <FormLabel>Departure Date</FormLabel>
                  <Input
                    type="date"
                    value={new Date(editingFlight.departureDate).toISOString().slice(0, 10)}
                    onChange={(e) =>
                      setEditingFlight({
                        ...editingFlight,
                        departureDate: `${e.target.value}T${new Date(editingFlight.departureDate).toISOString().slice(11, 16)}:00Z`,
                      })
                    }
                  />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>Departure Time</FormLabel>
                  <Input
                    type="time"
                    value={new Date(editingFlight.departureDate).toISOString().slice(11, 16)}
                    onChange={(e) =>
                      setEditingFlight({
                        ...editingFlight,
                        departureDate: `${new Date(editingFlight.departureDate).toISOString().slice(0, 11)}${e.target.value}:00Z`,
                      })
                    }
                  />
                </FormControl>
                </Flex>
                <Flex direction={'row'} gap={2}>

                <FormControl mb={4}>
                  <FormLabel>Arrival Date</FormLabel>
                  <Input
                    type="date"
                    value={new Date(editingFlight.arrivalDate).toISOString().slice(0, 10)}
                    onChange={(e) =>
                      setEditingFlight({
                        ...editingFlight,
                        arrivalDate: `${e.target.value}T${new Date(editingFlight.arrivalDate).toISOString().slice(11, 16)}:00Z`,
                      })
                    }
                  />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>Arrival Time</FormLabel>
                  <Input
                    type="time"
                    value={new Date(editingFlight.arrivalDate).toISOString().slice(11, 16)}
                    onChange={(e) =>
                      setEditingFlight({
                        ...editingFlight,
                        arrivalDate: `${new Date(editingFlight.arrivalDate).toISOString().slice(0, 11)}${e.target.value}:00Z`,
                      })
                    }
                  />
                </FormControl>
                </Flex>
              </form>
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
    </>
  );
};

export default FlightTable;