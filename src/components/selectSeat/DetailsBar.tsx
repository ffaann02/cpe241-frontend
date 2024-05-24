import { MdFlight } from 'react-icons/md';
import { Flight } from '../../pages/SelectSeat';
import { FaArrowRightLong } from 'react-icons/fa6';
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer } from '@chakra-ui/react';
import { IoCloseCircleSharp } from 'react-icons/io5';
import { useContext } from 'react';
import { BookingDetailsContext } from '../../context/BookingDetailsProvider';
import { useNavigate } from 'react-router-dom';

interface DetailsBarProps {
    flight: any;
    handleChooseSeat: (seat: string) => void;
}

const DetailsBar: React.FC<DetailsBarProps> = ({ flight, handleChooseSeat }: DetailsBarProps) => {
    const { setStep } = useContext(BookingDetailsContext);
    const navigate = useNavigate();
    const { passengerData } = useContext(BookingDetailsContext);
    console.log(flight);
    return (
        <div className="col-span-3 w-full pl-4">
            <h1 className="text-xl font-bold text-slate-600 flex gap-x-2">รายละเอียดเที่ยวบินของคุณ</h1>
            <div className="border px-5 py-5 mt-2 rounded-lg">
                <div className="w-full ounded-md flex gap-x-4 text-xl font-semibold text-slate-500">
                    <MdFlight className="text-2xl text-slate-400" />
                    <div>
                        <div className="flex gap-x-6">
                            <p className="my-auto">
                                {flight.arrivalCity} ({flight.from})
                            </p>
                            <FaArrowRightLong className="my-auto" />
                            <p className="my-auto">
                                {flight.departureCity} ({flight.destination})
                            </p>
                        </div>
                        <div className="">
                            <p className="text-sm text-slate-400">
                                {new Date(flight.departureTimeDate).toLocaleDateString('th-TH', {
                                    weekday: 'long',
                                    day: 'numeric',
                                    month: 'long',
                                })}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex mt-2">
                    <div className="w-8 h-8 rounded-sm">
                        <img src={flight.airlineIcon} />
                    </div>
                    <div className="flex">
                        <div className="my-auto ml-4">
                            <p>
                                {new Date(flight.departureTimeDate).toLocaleTimeString('en-US', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                            </p>
                            <p className="text-xs">{flight.from}</p>
                            <p className="text-xs">GMT +07</p>
                        </div>
                        <div className="px-16 relative border-royal-blue-200 border-t border-dashed h-0.5 my-auto mx-6">
                            <div className="w-2 h-2 rounded-full absolute bg-royal-blue-300 -top-1 left-0"></div>
                            <div className="w-2 h-2 rounded-full absolute bg-royal-blue-300 -top-1 right-0"></div>
                        </div>
                        <div className="my-auto">
                            <p>
                                {new Date(flight.arrivalTimeDate).toLocaleTimeString('en-US', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                            </p>
                            <p className="text-xs">{flight.destination}</p>
                            <p className="text-xs">GMT +07</p>
                        </div>
                    </div>
                </div>
                <div className="mt-6 border-t pt-2 flex flex-col">
                    <h2 className="font-semibold text-slate-600 mt-1">ผู้โดยสาร</h2>
                    <TableContainer className="border-x border-t rounded-md mt-1">
                        <Table>
                            <Thead>
                                <Tr className="font-IBM-Plex">
                                    <Th style={{ width: '5%' }}></Th>
                                    <Th style={{ width: '50%' }}>
                                        <p className="font-IBM-Plex">ชื่อผู้โดยสาร</p>
                                    </Th>
                                    <Th style={{ width: '45%' }}>
                                        <p className="text-right font-IBM-Plex">ที่นั่ง</p>
                                    </Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {passengerData.map((passenger, index) => (
                                    <Tr className="text-sm">
                                        <Td style={{ width: '5%' }}>{index + 1}.</Td>
                                        <Td style={{ width: '50%' }}>
                                            {passenger.firstName} {passenger.lastName}
                                        </Td>
                                        <Td style={{ width: '45%' }}>
                                            <div className="text-right font-IBM-Plex">
                                                {passenger.seat ? (
                                                    <div className="flex justify-end">
                                                        <div className="relative bg-royal-blue-50 px-2 py-1 font-semibold text-royal-blue-500">
                                                            {passenger.seat}
                                                            <IoCloseCircleSharp
                                                                onClick={() => handleChooseSeat(passenger.seat)}
                                                                className="cursor-pointer absolute text-lg text-red-400 
                                                            -right-2 -top-2"
                                                            />
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <p className="bg-white text-slate-400 my-1">ยังไม่เลือก</p>
                                                )}
                                            </div>
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
            <div className="flex gap-x-3 mt-4">
                <button
                    className="cursor-pointer px-4 py-2 border-[1px] bg-slate-50 border-slate-500 
                    text-slate-500 rounded hover:bg-slate-500 hover:text-white transition-all duration-200"
                    onClick={() => {
                        navigate(-1);
                    }}
                >
                    ย้อนกลับ
                </button>
                <button
                    className="cursor-pointer px-4 py-2 border-[1px] border-royal-blue-500 text-royal-blue-500 
                            rounded hover:bg-royal-blue-500 hover:text-white transition-all duration-200"
                    onClick={() => {
                        setStep(2);
                        navigate('/booking/payment');
                    }}
                >
                    บันทีกและถัดไป
                </button>
            </div>
        </div>
    );
};
export default DetailsBar;
