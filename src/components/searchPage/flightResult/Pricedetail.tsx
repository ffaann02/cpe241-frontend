import { useState } from 'react';
import { WarningTwoIcon, CalendarIcon, InfoOutlineIcon } from '@chakra-ui/icons'
import { Button } from '@chakra-ui/react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, } from '@chakra-ui/react'
import { Flight } from '../../../pages/Search';
export const Pricedetail = ({ flight }: { flight: Flight; }) => {
    const [showAlert, setShowAlert] = useState(false);
    console.log(showAlert);
    return (
        <>
            <Modal isOpen={showAlert} onClose={() => setShowAlert(false)} >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>ราคาสัมภาระ</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <div className="flex gap-x-2 text-gray-500">
                            <InfoOutlineIcon />
                            <p className='text-sm'>สามารถซื้อสัมภาระได้ในแบบฟอร์มการจอง</p>
                        </div>
                        <div className="flex gap-2 mt-4">
                            <img src={flight.airlineIcon} className="w-6" />
                            <p className="text-slate-600 text-sm">{flight.airline}</p>
                        </div>
                        <div className="flex gap-x text-gray-500 text-xs">
                            <p>{flight.destination}→</p>
                            <p>{flight.destination}</p>
                        </div>
                        <div className='divide-y divide-royal-blue-300 mt-5'>
                            <h1 className='grid grid-cols-2 mt-2'>
                                <p>สัมภาระแบบถือขึ้นเครื่อง 7 กก.</p>
                                <p className='text-right'>ฟรี</p>
                            </h1>
                            <h1 className='grid grid-cols-2 mt-2'>
                                <p>สัมภาระแบบถือขึ้นเครื่อง 7 กก.</p>
                                <p className='text-right'>ฟรี</p>
                            </h1>
                            <h1 className='grid grid-cols-2 mt-2'>
                                <p>สัมภาระแบบถือขึ้นเครื่อง 7 กก.</p>
                                <p className='text-right'>ฟรี</p>
                            </h1>
                            <h1 className='grid grid-cols-2 mt-2'>
                                <p>สัมภาระแบบถือขึ้นเครื่อง 7 กก.</p>
                                <p className='text-right'>ฟรี</p>
                            </h1>

                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={() => setShowAlert(false)}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <div className="grid grid-rows-2">
                <div className='grid grid-cols-2 gap-4'>
                    <div>
                        <h1 className="text-black text-sm font-medium">รายละเอียดราคา</h1>
                        <div className="border transition-all duration-100 ease-linear border-neutral-300 bg-white 
                    hover:drop-shadow-md hover:border-royal-blue-300 pt-3 rounded-[5px] cursor-pointer grid grid-cols-2'">
                            <div className="text-slate-600 text-sm font-medium ml-2 divide-y divide-royal-blue-300">
                                <div>
                                    <p>ค่าโดยสาร(x1)</p>
                                    <p>ค่าบริการ</p>
                                    <p>ภาษี</p>
                                    <p>ราคารวมปกติ</p>
                                    <p>ส่วนลด</p>
                                </div>
                                <div>
                                    <p className="mt-1">ราคารวมที่ต้องจ่าย</p>
                                </div>

                            </div>


                        </div>
                    </div>
                    <div>
                        <h1 className="text-black text-sm font-medium">เงื่อนไข</h1>
                        <div className="border transition-all duration-100 ease-linear border-neutral-300 bg-white 
                    hover:drop-shadow-md hover:border-royal-blue-300 pt-3 rounded-[5px] cursor-pointer grid grid-cols-2'">
                            <div className="text-gray-500 text-sm font-medium ml-2">
                                <div className="flex gap-2">
                                    <img src={flight.airlineIcon} className="w-6" />
                                    <p className="text-slate-600 text-sm">{flight.airline}</p>
                                </div>
                                <div className="flex gap-x text-gray-500">
                                    <p>{flight.destination}→</p>
                                    <p>{flight.destination}</p>
                                </div>
                                <p>ชั้นประหยัด</p>
                                <div className="flex gap-x text-gray-500 gap-2">
                                    <WarningTwoIcon color="red.500" />
                                    <p className="text-red-500">ไม่สามารถขอคืนเงินได้</p>
                                </div>
                                <div className="flex gap-x text-gray-500 gap-2">
                                    <CalendarIcon color="red.500" />
                                    <p className="text-red-500">เปลี่ยนเวลาไม่ได้</p>
                                </div>
                            </div>
                            <div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <h1 className="text-black text-sm font-medium">ราคาสัมภาระ</h1>
                    <h2 className='text-gray-500 text-sm'>กรุณาดูราคาสัมภาระสำหรับเที่ยวบินของคุณ</h2>
                    <div className="border transition-all duration-100 ease-linear border-neutral-300 bg-white 
                    hover:drop-shadow-md hover:border-royal-blue-300 pt-3 rounded-[5px] cursor-pointer grid grid-cols-2'">
                        <div className="text-slate-600 text-sm font-medium ml-2">
                            <div className="flex gap-2">
                                <img src={flight.airlineIcon} className="w-6" />
                                <p className="text-slate-600 text-sm">{flight.airline}</p>
                            </div>
                            <div className="flex gap-2 text-gray-500">
                                <p>{flight.destination} →</p>
                                <p>{flight.destination}</p>
                                <p>:ชั้นประหยัด</p>
                            </div>
                            <Button fontSize={'sm'} fontWeight={500} variant={'link'} color={'slateblue'} onClick={() => setShowAlert(true)}>
                                ดูราคาสัมภาระ
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Pricedetail;