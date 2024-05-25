import { Box, Flex } from '@chakra-ui/react';

import AircraftBoard from './components/aircraftBoard';
import { useEffect, useState } from 'react';
import axiosPrivate from '../../../../api/axios';

const AircraftTable = () => {
    const [aircraftData, setAircraftData] = useState([]);
    const [searchAircraftCallSign, setSearchAircraftCallSign] = useState('');

    useEffect(() => {
        const fetchAircrafts = async () => {
            const response = await axiosPrivate.get('/api/aircraft');
            setAircraftData(response.data);
        };
        fetchAircrafts();
    }, [aircraftData]);

    return (
        <Flex mt={'3'} w={'100%'} className="">
            {aircraftData.length > 0 ? (
                <AircraftBoard
                    aircraftData={aircraftData}
                    searchAircraftCallSign={searchAircraftCallSign}
                    setSearchAircraftCallSign={setSearchAircraftCallSign}
                    setAircraftData={setAircraftData}
                />
            ) : (
                <Box>Loading...</Box>
            )}
        </Flex>
    );
};

export default AircraftTable;
