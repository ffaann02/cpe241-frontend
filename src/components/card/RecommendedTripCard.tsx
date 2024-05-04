import React, { useState } from 'react';
import recomTripdata from '../../data/recomTripData.json';
import { Input } from '@chakra-ui/react';
const RecommendedTripCard: React.FC = () => {
  const [countryName, setcountryName] = useState<string>(''); // State to store the country name input
  const filteredCardData = recomTripdata.filter(card => card.country.toLowerCase() === countryName.toLowerCase());
  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <Input
          id="countryInput" 
          type="text" 
          focusBorderColor="purple.200"
          value={countryName} 
          onChange={(e) => setcountryName(e.target.value)} 
          className="placeholder:text-sm text-slate-500 pt-0.5 col-span-2"
        />
      </div>
      {filteredCardData.map((card, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden mt-5">
          <img src={card.imageUrl} alt="Card Image" className="w-full" />
          <div className="p-4">
            <p className="text-gray-700">{card.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecommendedTripCard;
