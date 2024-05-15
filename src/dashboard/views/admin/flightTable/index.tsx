import {
    Box,
    Flex
} from "@chakra-ui/react"

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
} from '@chakra-ui/react'

import FlightBoard from './components/flightBoard'
import { useEffect, useState } from "react";
import axiosPrivate from "../../../../api/axios";

const FlightReport = () => {
    const [flightData, setFlightData] = useState([]);
    const [searchFlightNumber, setSearchFlightNumber] = useState('');

    useEffect(()=>{
        const fetchFlights = async () => {
            const response = await axiosPrivate('/api/flight/')
            setFlightData(response.data);
        }
        fetchFlights()
    },[])

    return (
        <Flex mt={'3'} w={'100%'} className="">
            {flightData.length > 0 ? <FlightBoard flightData={flightData} 
            searchFlightNumber={searchFlightNumber}
            setSearchFlightNumber={setSearchFlightNumber}
            setFlightData={setFlightData}
            /> : <Box>Loading...</Box>}
        </Flex>
    );
};

export default FlightReport;
