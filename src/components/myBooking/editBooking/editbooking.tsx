import { useState } from 'react';
import { Accordion, Box, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Input } from '@chakra-ui/react';
import PassengerFormLock from './PassengerFormLock';
import PassengerForm from '../../bookingPage/PassengerForm';
import EmergencyContactForm from '../../bookingPage/EmergencyContactForm';
import AddLuggage from '../../bookingPage/AddLuggage';
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
interface EditBookingProps {
    passengerDataProp: PassengerData[];
}
export interface PassengerData {
    firstName: string;
    middleName: string;
    lastName: string;
    suffix: string;
    dateOfBirth: string;
    email: string;
    phoneNumber: string;
    count: number;
}
export interface EmergencyContactData {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
}
const Editbooking: React.FC<EditBookingProps> = ({ passengerDataProp }) => {
    const [passengerData, setPassengerData] = useState<PassengerData[]>([
        ...passengerDataProp,
    ]);
    const [newpassengerData, setNewPassengerData] = useState<PassengerData[]>([
        {
            firstName: '',
            middleName: '',
            lastName: '',
            suffix: '',
            dateOfBirth: '',
            email: '',
            phoneNumber: '',
            count: 1,
        },
    ]);
    const [emergencyContactData, setEmergencyContactData] = useState<EmergencyContactData>({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
    });
    const [usePassengerDataForEmergencyContact, setUsePassengerDataForEmergencyContact] = useState<boolean>(false);
    const [passengerEmailError, setPassengerEmailError] = useState<string[]>([]);
    const [passengerPhoneNumberError, setPassengerPhoneNumberError] = useState<string[]>([]);
    return (
        <Accordion allowToggle>
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
                        {passengerData.map((passenger, index) => (
                            <PassengerFormLock
                                index={index}
                                passenger={passenger}
                                handleDateOfBirthChange={handleDateOfBirthChange(setPassengerData, passengerData)}
                                passengerData={passengerData}
                            />
                        ))}
                        <h2 className="text-royal-blue-500 text-lg font-medium mt-4 mb-4 border-y-2 border-y-slate-300 p-2">ป้อนข้อมูลผู้โดยสารใหม่</h2>
                        {newpassengerData.map((passenger, index) => (
                            <PassengerForm
                                index={index}
                                passenger={passenger}
                                handleChangePassenger={handleChangePassenger(setNewPassengerData, newpassengerData)}
                                handleDateOfBirthChange={handleDateOfBirthChange(setNewPassengerData, newpassengerData)}
                                passengerData={newpassengerData}
                                handleDeletePassenger={handleDeletePassenger(setNewPassengerData, newpassengerData)}
                                handleAddPassenger={handleAddPassenger(setNewPassengerData, newpassengerData)}
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
                                newpassengerData
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
                        {newpassengerData.map((passenger, index) => (
                            <AddLuggage
                                passenger={passenger}
                                index={index}
                                increment={increment(setNewPassengerData)}
                                decrement={decrement(setNewPassengerData)}
                            />
                        ))}
                    </div>
                </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
                <h2>
                    <AccordionButton>
                        <Box as='span' flex='1' textAlign='left'>
                            Section 2 title
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                    veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                    commodo consequat.
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    );
};
export default Editbooking