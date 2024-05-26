const TripSection = ({ image, title, name, price, des }) => {
    return (
        <>
            <div className="flex flex-col justify-start gap-2 bg-white -z-10 drop-shadow-md rounded-lg">
                <div className="w-full">
                    <img src={image} alt="images" className="w-full h-full object-cover rounded-t" />
                </div>
                <div className="w-full h-full flex flex-col justify-center items-start gap-1 px-4">
                    <div className="flex flex-row items-center justify-between w-full">
                        <h1 className="text-[#6E7491] text-base font-medium capitalize">
                            {title} <span className="text-[#605DEC]">{name}</span>
                        </h1>
                        <p className="text-[#6E7491] text-base font-medium">{price}</p>
                    </div>
                    <p className="text-[#7C8DB0] text-sm font-normal">{des}</p>
                </div>
            </div>
        </>
    );
};

export default TripSection;
