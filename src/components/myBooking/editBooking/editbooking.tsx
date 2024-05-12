import { useState, useContext } from 'react';
import { Accordion, Box, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Input } from '@chakra-ui/react';
import PassengerFormLock from './PassengerFormLock';
import PassengerFormInEdit from './PassengerFormInEdit';
import EmergencyContactForm from '../../bookingPage/EmergencyContactForm';
import ServiceUpdate from './ServiceUpdate';
import AddLuggage from '../../bookingPage/AddLuggage';
import { BookingDetailsContext } from '../../../context/BookingDetailsProvider';
import {
    handleChangePassenger,
    handleDateOfBirthChange,
    handleDeletePassenger,
    handleAddPassenger,
    handleChangeCheckbox,
    handleChangeEmergencyContact,
    increment,
    decrement,
    handleSaveAndClose,
    handleSelectSeat,
} from '../../bookingPage/bookingFunctions';
import { PassengerData } from '../../../context/BookingDetailsProvider';
import { ExternalService } from '../../../pages/Mybooking-Edit';
import { initPassenger } from '../../../pages/Booking';
interface EditBookingProps {
    passengerDataProp: PassengerData[];
    externalService: ExternalService;
    setExternalService: React.Dispatch<React.SetStateAction<ExternalService>>
}
export interface EmergencyContactData {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
}

const Editbooking: React.FC<EditBookingProps> = ({ passengerDataProp, externalService, setExternalService }) => {
    const [passengerData, setPassengerData] = useState<PassengerData[]>([
        {
            firstName: '',
            middleName: '',
            lastName: '',
            nationality: '',
            dateOfBirth: '',
            email: '',
            phoneNumber: '',
            count: 1,
            seat: null,
        },
    ])
    const [OldpassengerData, setOldPassengerData] = useState<PassengerData[]>([
        ...passengerDataProp,
    ]);
    const [emergencyContactData, setEmergencyContactData] = useState<EmergencyContactData>(
        {
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
        }
    );
    const handleSaveEdit = () => {
        console.log(passengerData,emergencyContactData,externalService,setExternalService)
    }
    const [usePassengerDataForEmergencyContact, setUsePassengerDataForEmergencyContact] = useState<boolean>(false);
    const [passengerEmailError, setPassengerEmailError] = useState<string[]>([]);
    const [passengerPhoneNumberError, setPassengerPhoneNumberError] = useState<string[]>([]);
    return (
        <div>
            <Accordion defaultIndex={[0]} allowMultiple className=' overflow-visible'>
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box as='span' flex='1' textAlign='left' className="text-xl font-medium">
                                ข้อมูลผู้โดยสาร
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <div>
                            <h2 className="text-royal-blue-500 text-lg font-medium mt-4 mb-4 border-y-2 border-y-slate-300 p-2">ข้อมูลผู้โดยสารเดิม</h2>
                            {OldpassengerData.map((passenger, index) => (
                                <PassengerFormLock
                                    index={index}
                                    passenger={passenger}
                                    handleDateOfBirthChange={handleDateOfBirthChange(setOldPassengerData, OldpassengerData)}
                                    passengerData={OldpassengerData}
                                />
                            ))}
                            <h2 className="text-royal-blue-500 text-lg font-medium mt-4 mb-4 border-y-2 border-y-slate-300 p-2">ป้อนข้อมูลผู้โดยสารใหม่</h2>
                            {passengerData.map((passenger, index) => (
                                <PassengerFormInEdit
                                    index={index}
                                    passenger={passenger}
                                    handleChangePassenger={handleChangePassenger(setPassengerData, passengerData)}
                                    handleDateOfBirthChange={handleDateOfBirthChange(setPassengerData, passengerData)}
                                    passengerData={passengerData}
                                    handleDeletePassenger={handleDeletePassenger(setPassengerData, passengerData)}
                                    handleAddPassenger={handleAddPassenger(setPassengerData, passengerData)}
                                    passengerEmailError={passengerEmailError}
                                    passengerPhoneNumberError={passengerPhoneNumberError}
                                    setPassengerEmailError={setPassengerEmailError}
                                    setPassengerPhoneNumberError={setPassengerPhoneNumberError}
                                />
                            ))}
                            <EmergencyContactForm
                                emergencyContactData={emergencyContactData}
                                usePassengerDataForEmergencyContact={usePassengerDataForEmergencyContact}
                                handleChangeCheckbox={handleChangeCheckbox(
                                    setUsePassengerDataForEmergencyContact,
                                    setEmergencyContactData,
                                    passengerData
                                )}
                                handleChangeEmergencyContact={handleChangeEmergencyContact(setEmergencyContactData)}
                            />
                            <div>
                                <h1 className="text-royal-blue-500 text-lg font-medium mb-4">ข้อมูลกระเป๋าเดินทาง</h1>
                                <p className="mb-8 text-slate-500 text-base font-normal">Each passenger is allowed one free carry-on bag and one personal item. First checked bag for each passenger is also free. Second bag check fees are waived for loyalty program members.
                                    <span className="text-royal-blue-500 hover:underline cursor-pointer">
                                        {' '}
                                        the full bag policy.
                                    </span>
                                </p>
                            </div>
                            {passengerData.map((passenger, index) => (
                                <AddLuggage
                                    passenger={passenger}
                                    index={index}
                                    increment={increment(setPassengerData)}
                                    decrement={decrement(setPassengerData)}
                                />
                            ))}
                        </div>
                    </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box as='span' flex='1' textAlign='left' className="text-xl font-medium">
                                บริการเสริม
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <ServiceUpdate serviceCheck={externalService.ServiceCheck} insurance={externalService.Insurance} />
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
            <button
                className="cursor-pointer px-4 py-2 border-[1px] border-royal-blue-500 text-royal-blue-500 
                            rounded hover:bg-royal-blue-500 hover:text-white transition-all duration-200"
                onClick = {() => {
                    handleSaveEdit()
                }}
            >
                บันทีกและถัดไป
            </button>
        </div>
    );
};
export default Editbooking