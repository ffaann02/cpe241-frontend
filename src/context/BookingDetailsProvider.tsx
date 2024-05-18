import { createContext, useEffect, useState } from 'react';

interface BookingDetailsContext {
    step: number;
    setStep: React.Dispatch<React.SetStateAction<number>>;
    passengerData: PassengerData[];
    servicePackageData: ServicePackage[];
    travelInsuranceData: TravelInsurance[];
    setPassengerData: React.Dispatch<React.SetStateAction<PassengerData[]>>;
    setServicePackageData: React.Dispatch<React.SetStateAction<ServicePackage[]>>;
    setTravelInsuranceData: React.Dispatch<React.SetStateAction<TravelInsurance[]>>;
    emergencyContactData: EmergencyContactData;
    setEmergencyContactData: React.Dispatch<React.SetStateAction<EmergencyContactData>>;
    selectedFlight: any;
    setSelectedFlight: React.Dispatch<React.SetStateAction<any>>;
    paymentInfo: PaymentInfoData;
    setPaymentInfo: React.Dispatch<React.SetStateAction<PaymentInfoData>>;
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

export interface ServicePackage {
    name: string;
    price: number;
}

export interface TravelInsurance {
    isIncluded: string;
    price: number;
}

export interface EmergencyContactData {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
}

interface PaymentInfoData {
    holderName: string;
    cardNumber: string;
    expiryDate: string;
    ccv: string;
}

export const BookingDetailsContext = createContext<BookingDetailsContext | undefined>(undefined);

const BookingDetailsProvider = ({ children }) => {
    const [step, setStep] = useState<number>(0);
    const [passengerData, setPassengerData] = useState<PassengerData[]>([]);
    const [servicePackageData, setServicePackageData] = useState<ServicePackage[]>([]);
    const [travelInsuranceData, setTravelInsuranceData] = useState<TravelInsurance[]>([]);
    const [emergencyContactData, setEmergencyContactData] = useState<EmergencyContactData>({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
    });
    const [selectedFlight, setSelectedFlight] = useState(null);
    const [selectedBagCount, setSelectedBagCount] = useState<string | null>(null);
    const [paymentInfo, setPaymentInfo] = useState<PaymentInfoData>({
        holderName: '',
        cardNumber: '',
        expiryDate: '',
        ccv: '',
    });

    const handleScrollToTop = () => {
        window.scrollTo(0, 0);
    };

    useEffect(() => {
        handleScrollToTop();
    }, []);

    return (
        <BookingDetailsContext.Provider
            value={{
                step,
                setStep,
                passengerData,
                servicePackageData,
                travelInsuranceData,
                setPassengerData,
                setServicePackageData,
                setTravelInsuranceData,
                emergencyContactData,
                setEmergencyContactData,
                selectedFlight,
                setSelectedFlight,
                paymentInfo,
                setPaymentInfo,
                selectedBagCount,
                setSelectedBagCount,
            }}
        >
            {children}
        </BookingDetailsContext.Provider>
    );
};

export default BookingDetailsProvider;
