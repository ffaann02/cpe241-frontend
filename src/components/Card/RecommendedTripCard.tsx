import React, { useState } from 'react';
import recomTripdata from '../../data/recomTripData.json';

const RecommendedTripCard: React.FC = () => {
  const [countryName, setcountryName] = useState<string>(''); // State to store the country name input

  // Filter card data based on the country name
  const filteredCardData = recomTripdata.filter(card => card.country.toLowerCase() === countryName.toLowerCase());

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <input 
          id="countryInput" 
          type="text" 
          value={countryName} 
          onChange={(e) => setcountryName(e.target.value)} 
          className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500 block w-full"
        />
      </div>
      
      {/* Render cards for the filtered country */}
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
