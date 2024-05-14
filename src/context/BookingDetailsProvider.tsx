import { createContext, useEffect, useState } from 'react';

interface BookingDetailsContext {
    step: number;
    setStep: React.Dispatch<React.SetStateAction<number>>;
    passengerData: PassengerData[];
    setPassengerData: React.Dispatch<React.SetStateAction<PassengerData[]>>;
    emergencyContactData: EmergencyContactData;
    setEmergencyContactData: React.Dispatch<React.SetStateAction<EmergencyContactData>>;
    selectedFlight: any;
    setSelectedFlight: React.Dispatch<React.SetStateAction<any>>;
    paymentInfo: PaymentInfoData;
    setPaymentInfo: React.Dispatch<React.SetStateAction<PaymentInfoData>>;
    selectedPackage: string;
    setSelectedPackage: React.Dispatch<React.SetStateAction<string>>;
    travelInsurance: string;
    setTravelInsurance: React.Dispatch<React.SetStateAction<string>>;
    selectedBagCount: string;
    setSelectedBagCount: React.Dispatch<React.SetStateAction<string>>;
}

export interface PassengerData {
    firstName: string;
    middleName: string;
    lastName: string;
    nationality: string;
    dateOfBirth: string;
    email: string;
    phoneNumber: string;
    bagCount: string;
    seat: string | null;
}

export interface EmergencyContactData {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
}

interface PaymentInfoData {
    name: string;
    number: string;
    date: string;
    ccv: string;
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
    const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
    const [travelInsurance, setTravelInsurance] = useState<string | null>(null);
    const [selectedBagCount, setSelectedBagCount] = useState<string | null>(null);

    const [paymentInfo, setPaymentInfo] = useState<PaymentInfoData>({
        name: '',
        number: '',
        date: '',
        ccv: '',
    });
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [window.location.pathname])

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
                paymentInfo,
                setPaymentInfo,
                selectedPackage,
                setSelectedPackage,
                travelInsurance,
                setTravelInsurance,
                selectedBagCount,
                setSelectedBagCount
            }}
        >
            {children}
        </BookingDetailsContext.Provider>
    );
};

export default BookingDetailsProvider;