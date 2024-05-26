import TripCard from './TripCard';
import shanghai from '../../../assets/images/shanghai.png';
import sydney from '../../../assets/images/sydney.png';
import kyoto from '../../../assets/images/kyoto.png';

const TripSection = () => {
    return (
        <>
            <div className="flex flex-col gap-7">
                <div className="flex items-center justify-between">
                    <div className="text-royal-blue-500 text-2xl px-10 font-bold">จุดหมายที่น่าสนใจ</div>
                </div>
                <div className="flex gap-16 flex-wrap items-start justify-center ">
                    <TripCard
                        image={shanghai}
                        title="The Bund, "
                        name="Shanghai"
                        price="$598"
                        des=" China’s most international city"
                    />
                    <TripCard
                        image={sydney}
                        title="Sydney Opera House, "
                        name="Sydney"
                        price="$981"
                        des=" Take a stroll along the famous harbor"
                    />
                    <TripCard
                        image={kyoto}
                        title="Kōdaiji Temple,"
                        name="Kyoto"
                        price="$633"
                        des=" Step back in time in the Gion district"
                    />
                    <TripCard
                        image={shanghai}
                        title="The Bund, "
                        name="Shanghai"
                        price="$598"
                        des=" China’s most international city"
                    />
                    <TripCard
                        image={sydney}
                        title="Sydney Opera House, "
                        name="Sydney"
                        price="$981"
                        des=" Take a stroll along the famous harbor"
                    />
                    <TripCard
                        image={kyoto}
                        title="Kōdaiji Temple,"
                        name="Kyoto"
                        price="$633"
                        des=" Step back in time in the Gion district"
                    />
                </div>
            </div>
        </>
    );
};

export default TripSection;
