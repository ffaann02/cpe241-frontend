import React, { useEffect, useState } from 'react';
import Editbooking from "../components/myBooking/editBooking/editbooking"
import FlightCartData from '../components/card/FlightCartCard';
import fakeFlightData from '../data/fakeFlightData.json';
import { useParams } from 'react-router-dom';
import axiosPrivate from '../api/axios';
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
export interface ExternalService {
    ServiceCheck:number;
    Insurance:number
}
export default function MybookingEdit() {
    const { bookingId } = useParams();
    const [bookingID, setBookingID] = useState<string>('');
    const [bookingData, setBookingData] = useState<any>([]);
    const [passengerData, setPassengerData] = useState<PassengerData[]>([
        {
            firstName: 'passenger1',
            middleName: '',
            lastName: 'passenger1',
            nationality: 'Thai',
            dateOfBirth: '11/5/2567',
            email: '',
            phoneNumber: '',
            bagCount: "15kg (฿ 456)",
            seat: 'A1',
        },
        {
            firstName: 'passenger2',
            middleName: '',
            lastName: 'passenger2',
            nationality: 'Thai',
            dateOfBirth: '11/5/2567',
            email: '',
            phoneNumber: '',
            bagCount: "15kg (฿ 456)",
            seat: 'A2',
        },
    ]);

    useEffect(()=>{
        setBookingID(bookingId);
        const getBookingData = async () => {
            const response = await axiosPrivate.get(`/api/booking/${bookingId}`);
            setBookingData(response.data);
        };
        getBookingData();
    },[])

    const [ExternalService, setExternalService] = useState<ExternalService>({ServiceCheck:1,Insurance:2});
    return (
        <div>
            {<section className="py-8 gap-x-10 max-w-4xl mx-auto">
                <section className="mx-4 col-span-6">
                    <h1 className="text-royal-blue-500 text-3xl mb-4">แก้ไขข้อมูลการจอง</h1>
                    <p className="mb-8 text-slate-500 text-base font-normal">
                        หมายเลขการจอง: {bookingID}
                    </p>
                    <Editbooking passengerDataProp={passengerData} bookingData={bookingData} externalService={ExternalService} setExternalService={setExternalService}/>
                </section>
                {/* <section className="mx-4 col-span-4">
                    <FlightCartData flight={fakeFlightData[2]}/>
                </section> */}
            </section>}
        </div>
    );
};