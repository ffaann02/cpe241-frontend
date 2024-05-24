import React, { useEffect, useState } from 'react';
import Editbooking from "../components/myBooking/editBooking/editbooking"
import FlightCartData from '../components/card/FlightCartCard';
import fakeFlightData from '../data/fakeFlightData.json';
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
        
    },[])

    const [ExternalService, setExternalService] = useState<ExternalService>({ServiceCheck:1,Insurance:2});
    return (
        <div>
            <section className="py-8 grid grid-cols-10 gap-x-10 max-w-6xl mx-auto">
                <section className="mx-4 col-span-6 pr-20">
                    <h1 className="text-royal-blue-500 text-3xl mb-4">แก้ไขข้อมูลการจอง</h1>
                    <p className="mb-8 text-slate-500 text-base font-normal">
                        หมายเลขการจอง : 1234567890
                    </p>
                    <Editbooking passengerDataProp={passengerData} externalService={ExternalService} setExternalService={setExternalService}/>
                </section>
                <section className="mx-4 col-span-4">
                    <FlightCartData flight={fakeFlightData[2]}/>
                </section>
            </section>
        </div>
    );
};