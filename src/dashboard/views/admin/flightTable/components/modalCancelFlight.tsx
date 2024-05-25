import {
    Button,
    Checkbox,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
    Stack,
} from '@chakra-ui/react';

const ModalCancelFlight = ({ isCancelFlight, onCloseCancelFlight }) => {
    return (
        <>
            <Modal isOpen={isCancelFlight} onClose={onCloseCancelFlight}>
                <ModalOverlay />
                <ModalContent minWidth={'40vw'} className="px-6">
                    <h1 className="text-xl mt-6 mb-2">ยกเลิกเที่ยวบิน</h1>
                    <div className="flex flex-col gap-y-2 border-b pb-4">
                        <div>
                            <p className="text-slate-500">รายละเอียดเที่ยวบิน</p>
                            <div className="grid grid-cols-2 gap-2">
                                <Select placeholder="เลือก Flight No ที่ต้องการ">
                                    <option value="option1">Option 1</option>
                                    <option value="option2">Option 2</option>
                                    <option value="option3">Option 3</option>
                                </Select>
                                <Select placeholder="เลือกเวลาของเที่ยวบินที่ต้องการยกเลิก">
                                    <option value="option1">Option 1</option>
                                    <option value="option2">Option 2</option>
                                    <option value="option3">Option 3</option>
                                </Select>
                                <Input
                                    className="col-span-full placeholder:text-slate-500"
                                    placeholder="เหตุผลที่ต้องการยกเลิก"
                                    size="md"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 flex flex-col gap-y-2 border-b pb-4">
                        <div>
                            <p className="text-slate-500">มาตรการรองรับ</p>
                            {/* <div className="grid grid-cols-2 gap-2">
                                <Select placeholder="เลือกวิธีที่คุณต้องการ">
                                    <option value="option1">Option 1</option>
                                    <option value="option2">Option 2</option>
                                    <option value="option3">Option 3</option>
                                </Select>
                                <Select placeholder="เลือกเวลาของเที่ยวบินที่ต้องการยกเลิก">
                                    <option value="option1">Option 1</option>
                                    <option value="option2">Option 2</option>
                                    <option value="option3">Option 3</option>
                                </Select>
                            </div> */}
                            <Stack spacing={5} direction="row" className="mt-1">
                                <Checkbox colorScheme="blue" defaultChecked>
                                    เปลี่ยนเที่ยวบิน
                                </Checkbox>
                                <Checkbox colorScheme="blue" defaultChecked>
                                    คืนเงินค่าตั๋ว
                                </Checkbox>
                            </Stack>
                        </div>
                    </div>

                    <ModalCloseButton />
                    <ModalBody></ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onCloseCancelFlight}>
                            Close
                        </Button>
                        <Button variant="ghost">Secondary Action</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};
export default ModalCancelFlight;
