import { createContext, useState } from 'react';

interface BookingDetailsContext {
    step: number;
    setStep: React.Dispatch<React.SetStateAction<number>>;
    passengerData: PassengerData[];
    setPassengerData: React.Dispatch<React.SetStateAction<PassengerData[]>>;
    emergencyContactData: EmergencyContactData;
    setEmergencyContactData: React.Dispatch<React.SetStateAction<EmergencyContactData>>;
    selectedFlight: any;
    setSelectedFlight: React.Dispatch<React.SetStateAction<any>>;
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

export const BookingDetailsContext = createContext<BookingDetailsContext | undefined>(undefined);

const BookingDetailsProvider = ({ children }) => {
    const [step, setStep] = useState<number>(0);
    const [passengerData, setPassengerData] = useState<PassengerData[]>([]);
    const [emergencyContactData, setEmergencyContactData] = useState<EmergencyContactData>({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
    });
    const [selectedFlight, setSelectedFlight] = useState(null);

    return (
        <BookingDetailsContext.Provider
            value={{
                step,
                setStep,
                passengerData,
                setPassengerData,
                emergencyContactData,
                setEmergencyContactData,
                selectedFlight,
                setSelectedFlight,
            }}
        >
            {children}
        </BookingDetailsContext.Provider>
    );
};

export default BookingDetailsProvider;
