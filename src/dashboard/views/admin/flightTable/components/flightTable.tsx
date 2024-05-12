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
} from '@chakra-ui/react';

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

  return (
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
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default FlightTable;