import Search from './search';
import FlightTable from './flightTable';
import { Flex } from '@chakra-ui/react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useState } from 'react';
import { ModalAddFlight } from './modalAddFlight';
import ModalCancelFlight from './modalCancelFlight';

export interface FlightInfo {
    flightID: number;
    flightNo: string;
    airlineName: string;
    departureCity: string;
    arrivalCity: string;
    departureIATACode: string;
    arrivalIATACode: string;
    departureDateTime: string; // ISO 8601 date-time format
    arrivalDateTime: string; // ISO 8601 date-time format
    currentCapacity: number;
    status: string;
    baseFare: number;
}

export default function flightBoard({ flightData, searchFlightNumber, setSearchFlightNumber ,setFlightData}) {
    const [currentPage, setCurrentPage] = useState(0);
    const handlePageChange = (direction: number) => {
        const newPage = currentPage + direction;
        if (newPage < 0) {
            return;
        }
        const totalPages = Math.ceil(filteredFlights.length / flightsPerPage);
        if (newPage >= totalPages) {
            return;
        }
        setCurrentPage(newPage);
    };
    const flightsPerPage = 10;
    const filteredFlights = flightData.filter((flight: FlightInfo) =>
        flight.flightNo.toUpperCase().includes(searchFlightNumber.toUpperCase())
    );

    const startIndex = currentPage * flightsPerPage;
    const endIndex = startIndex + flightsPerPage;
    const flightsForCurrentPage = filteredFlights.slice(startIndex, endIndex);
    const [newFlight, setNewFlight] = useState<any | null>(null);
    const [isAddFlight, setIsAddFlight] = useState(false);
    const [isCancelFlight, setIsCancelFlight] = useState(false);
    const onOpenAddFlight = () => {
        setIsAddFlight(true);
        setNewFlight({
            flightID: 0,
            flightNo: '',
            airlineID: '',
            aircraftID: '',
            departureAirportID: '',
            arrivalAirportID: '',
            departureDateTime: '',
            arrivalDateTime: '',
            currentCapacity: 0,
            status: '',
            baseFare: 0,
        })
    }
    const onCloseAddFlight = () => setIsAddFlight(false);
    const onOpenCancelFlight = () => setIsCancelFlight(true);
    const onCloseCancelFlight = () => setIsCancelFlight(false);

    return (
        <Flex direction={'column'} mt={'3'} gap={1} w={'full'} borderRadius={'5'}>
            <Search searchFlightNumber={searchFlightNumber} setSearchFlightNumber={setSearchFlightNumber} />
            <div className="w-full mt-2 mb-0.5 flex justify-between">
                <div className='gap-x-2 flex'>
                    <button
                        className="px-4 py-2 border border-royal-blue-500 text-royal-blue-500 
                rounded-md hover:text-white hover:bg-royal-blue-500 duration-200"
                    onClick={onOpenAddFlight}>
                        เพิ่มเที่ยวบิน
                    </button>
                    <button
                        className="px-4 py-2 border border-red-500 text-red-500 
                rounded-md hover:text-white hover:bg-red-500 duration-200"
                    onClick={onOpenCancelFlight}>
                        ยกเลิกเที่ยวบิน
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
                        {currentPage + 1} / {Math.ceil(filteredFlights.length / flightsPerPage)}
                    </h1>
                    <button
                        onClick={() => handlePageChange(+1)}
                        className="rounded-full bg-royalblue-600 w-6 h-6 bg-royal-blue-100"
                    >
                        <FaChevronRight className="m-auto p-0.5" />
                    </button>
                </div>
            </div>
            <ModalAddFlight
                isAddFlight={isAddFlight}
                onCloseAddFlight={onCloseAddFlight}
                newFlight={newFlight}
                setNewFlight={setNewFlight}
                setFlightData={setFlightData}
            />
            <ModalCancelFlight
                isCancelFlight={isCancelFlight}
                onCloseCancelFlight={onCloseCancelFlight}
            />
            <FlightTable
                flightData={flightData}
                searchFlightNumber={searchFlightNumber}
                flightsForCurrentPage={flightsForCurrentPage}
            />
        </Flex>
    );
}
