import Search from './search';
import AircraftTable from './aircraftTable';
import { Flex } from '@chakra-ui/react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import ModalAddAircraft from './modalAddAircraft';


export interface AircraftInfo {
    aircraftID: number;
    airlineID: number;
    airlineName: string;
    aircraftCallSign: string;
    manufacturer: string;
    model: string;
    maxCapacity: number;
    status: string;
}

export default function AircraftBoard({ aircraftData, searchAircraftCallSign, setSearchAircraftCallSign, setAircraftData }) {
    const [currentPage, setCurrentPage] = useState(0);
    const handlePageChange = (direction: number) => {
        const newPage = currentPage + direction;
        if (newPage < 0) {
            return;
        }
        const totalPages = Math.ceil(filteredAircrafts.length / aircraftsPerPage);
        if (newPage >= totalPages) {
            return;
        }
        setCurrentPage(newPage);
    };
    const aircraftsPerPage = 10;
    const filteredAircrafts = aircraftData.filter((Aircraft: AircraftInfo) =>
        Aircraft.aircraftCallSign.toUpperCase().includes(searchAircraftCallSign.toUpperCase())
    );

    const startIndex = currentPage * aircraftsPerPage;
    const endIndex = startIndex + aircraftsPerPage;
    const aircraftsForCurrentPage = filteredAircrafts.slice(startIndex, endIndex);
    const [isAddAircraft, setIsAddAircraft] = useState(false);
    const onOpenAddAircraft = () => {
        setIsAddAircraft(true);
    }
    const onCloseAddAircraft = () => setIsAddAircraft(false);

   
  
    return (
        <Flex direction={'column'} mt={'3'} gap={1} w={'full'} borderRadius={'5'}>
            <Search searchAircraftCallSign={searchAircraftCallSign} setSearchAircraftCallSign={setSearchAircraftCallSign} />
            <div className="w-full mt-2 mb-0.5 flex justify-between">
                <div>
                    <button
                        className="px-4 py-2 border border-royal-blue-500 text-royal-blue-500 
                rounded-md hover:text-white hover:bg-royal-blue-500 duration-200"
                        onClick={onOpenAddAircraft}>
                        เพิ่มเครื่องบิน
                    </button>
                </div>
                <div className="flex my-auto gap-x-4">
                    <button
                        onClick={() => handlePageChange(-1)}
                        className="rounded-full bg-royalblue-600 w-6 h-6 bg-royal-blue-100 bg-roy flex"
                    >
                        <FaChevronLeft className="m-auto p-0.5" />
                    </button>
                    <h1 className="">
                        {currentPage + 1} / {Math.ceil(filteredAircrafts.length / aircraftsPerPage)}
                    </h1>
                    <button
                        onClick={() => handlePageChange(+1)}
                        className="rounded-full bg-royalblue-600 w-6 h-6 bg-royal-blue-100"
                    >
                        <FaChevronRight className="m-auto p-0.5" />
                    </button>
                </div>
            </div>
            <ModalAddAircraft
                isAddAircraft={isAddAircraft}
                onCloseAddAircraft={onCloseAddAircraft}
                setAircraftData={setAircraftData}
            />
            <AircraftTable
                aircraftData={aircraftData}
                searchAircraftCallSign={searchAircraftCallSign}
                aircraftsForCurrentPage={aircraftsForCurrentPage}
            />
        </Flex>
    );
}
