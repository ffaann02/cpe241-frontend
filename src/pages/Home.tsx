import HereBlock from '../components/homePage/heroBlock/HereBlock';
import TripSection from '../components/homePage/Trip/TripSection';
import ReviewSection from '../components/homePage/Review/ReviewSection';
import { useEffect, useState } from 'react';
import { City } from '../components/homePage/heroBlock/Form/FlightInputForm';
import { axiosPrivate } from '../api/axios';

export default function Home() {
    const [recommendAirports, setRecommendAirports] = useState<City[]>([]);

    useEffect(()=> {
        const getAirports = async (): Promise<void> => {
            try {
                    const response = await axiosPrivate.get(`/api/search/airports/recommend?number=8`);
                    if (response.status === 200) {
                        setRecommendAirports(response.data);
                    } else {
                        alert("Failed to fetch airport data");
                    }
            } catch (error) {
                console.error('An error occurred while trying to fetch airport data:', error);
            }
        }
        getAirports();
},[]);

    return (
        <div className="w-full h-full">
            <HereBlock recommendAirports={recommendAirports}/>
            <div className="my-28 lg:mx-52">
                <TripSection />
                <ReviewSection />
            </div>
        </div>
    );
}
