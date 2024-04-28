import HereBlock from '../components/homePage/heroBlock/HereBlock';
import TripSection from '../components/homePage/Trip/TripSection';
import ReviewSection from '../components/homePage/Review/ReviewSection';

export default function Home() {
    return (
        <div className="w-full h-full">
            <HereBlock />
            <div className="my-28 lg:mx-52">
                <TripSection />
                <ReviewSection />
            </div>
        </div>
    );
}
