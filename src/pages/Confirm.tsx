import { useState } from 'react';
import FlightCartData from '../components/card/FlightCartConfirm';
import fakeFlightData from '../data/fakeFlightData.json';
import RecommendedTripCard from '../components/card/RecommendedTripCard';
import { Input} from '@chakra-ui/react';
export default function Confirm() {
  const [emailInputs, setEmailInputs] = useState<{ id: number; value: string }[]>([{ id: Date.now(), value: '' },]);
  const [flightTypeTrip, setFlightTypeTrip] = useState(false);
  const handleAddEmail = () => {
    setEmailInputs([...emailInputs, { id: Date.now(), value: '' }]);
  };
  const handleEmailChange = (id: number, value: string) => {
    setEmailInputs(
      emailInputs.map((input) => (input.id === id ? { ...input, value } : input))
    );
  };
  const handleSubmitEmail = () => {
    // Handle form submission logic here
    console.log('Submitted emails:', emailInputs.map((input) => input.value));
  };
  const departingFlightCost = 251.50;
  const arrivalTimeCost = 251.50;
  const baggageFeesCost = 251.50;
  const seatUpgradeCost = 251.50;
  const taxes = 1.094;
  const subtotal = departingFlightCost + arrivalTimeCost + baggageFeesCost + seatUpgradeCost;
  const totalAmountPaid = (subtotal * taxes);
  return (
    <>
      <section className="p-8 grid grid-cols-10 mx-20 gap-x-10">
        <section className="mx-4 col-span-7 pr-20">
          <h1 className="flex justify-between p-4 rounded-xl bg-royal-blue-100 text-royal-blue-600 border-2 border-royal-blue-600">
            Your flight has been booked successfully! Your confirmation number is #381029404387</h1>
          <p className="mt-8 mb-4 text-2xl font-semibold text-royal-blue-600">Bon voyage!</p>
          <h2 className="text-gray-600 text-lg font-medium mb-4">Confirmation number : #381029404387</h2>
          <h2 className="text-gray-400 text-lg font-medium">Thank you for booking your travel with Tripma! Below is a summary of your trip to Narita airport in Tokyo, Japan.
            We've sent a copy of your booking confirmation to your email address.</h2>
          <div className="flex items-center">
            <h2 className="text-gray-400 text-lg font-medium mb-4"> You can also find this page again in</h2>
            <button className="text-royal-blue-600 text-lg font-medium ml-3 mb-4">My trips</button>
          </div>
          <p className="text-gray-500 text-2xl font-medium mt-9 mb-4">Flight summary</p>
          <button onClick = {() => setFlightTypeTrip(!flightTypeTrip)} className="text-royal-blue-600 text-lg font-medium ml-3 mb-4">Round-Trip</button>
          {!flightTypeTrip && <FlightCartData flight={fakeFlightData[0]} />}
          {!flightTypeTrip && <FlightCartData flight={fakeFlightData[0]} />}
          {flightTypeTrip && <FlightCartData flight={fakeFlightData[0]} />}
          <div className="divide-y divide-black divide-opacity-50">
            <div className="text-gray-500 text-2xl font-medium mb-7 grid grid-cols-2">
              <div>
                <h2 className="text-gray-500 text-lg font-normal mt-2">Departing Flight</h2>
                <h2 className="text-gray-500 text-lg font-normal mt-2">Arrival Time</h2>
                <h2 className="text-gray-500 text-lg font-normal mt-2">Baggage fees</h2>
                <h2 className="text-gray-500 text-lg font-normal mt-2">Seat upgrade (business)</h2>
                <h2 className="text-gray-500 text-lg font-normal mt-2">Subtotal</h2>
                <h2 className="text-gray-500 text-lg font-normal mt-2">Taxes(9.4%)</h2>
              </div>
              <div>
                <h2 className="text-gray-500 text-lg font-normal mt-2">${departingFlightCost}</h2>
                <h2 className="text-gray-500 text-lg font-normal mt-2">${arrivalTimeCost}</h2>
                <h2 className="text-gray-500 text-lg font-normal mt-2">${baggageFeesCost}</h2>
                <h2 className="text-gray-500 text-lg font-normal mt-2">${seatUpgradeCost}</h2>
                <h2 className="text-gray-500 text-lg font-normal mt-2">${subtotal}</h2>
                <h2 className="text-gray-500 text-lg font-normal mt-2">${subtotal * 0.094}</h2>
              </div>
            </div>
            <div className="grid grid-cols-2">
              <h2 className="text-black text-lg font-normal mt-2">Amount paid</h2>
              <h2 className="text-gray-500 text-lg font-normal mt-2">${totalAmountPaid}</h2>
            </div>
            <div className="text-gray-500 text-lg font-normal mt-2">
            </div>
          </div>
          <div className="text-gray-500 text-2xl font-medium mt-9 mb-4">Payment method</div>
          <div className="grid grid-cols-4">
            <div className='bg-royal-blue-300 rounded-xl'>
              <img src="https://cdn.freebiesupply.com/logos/large/2x/visa-logo-png-transparent.png" alt="Card Image" className="w-full" />
            </div>
          </div>
          <div className="mb-4">
            <h1 className="text-gray-500 text-2xl font-medium mt-10 mb-4">Share your travel itinerar</h1>
            <h2 className="text-gray-500 text-lg font-normal mb-4">You can email your itinerary to anyone by entering their email address here.</h2>
            <div>
              {emailInputs.map((input) => (
                <div key={input.id} className="mb-2 grid grid-cols-6">
                  <Input
                    size="lg"
                    focusBorderColor="purple.200"
                    className="placeholder:text-sm text-slate-500 pt-0.5 col-span-2"
                    type="email"
                    value={input.value}
                    onChange={(e) => handleEmailChange(input.id, e.target.value)}
                    placeholder="Email address"
                  />
                </div>
              ))}
            </div>
            <button onClick={handleSubmitEmail} className="btn rounded bg-white text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white hover:border-hidden   col-start-14">
              Email itinerary
            </button>
            <button onClick={handleAddEmail} className="text-royal-blue-600 text-lg font-medium ml-3 mb-4">Add another</button>
          </div>
        </section>
        <section className="col-span-3">
          <p className="mt-8 mb-4 text-royal-blue-600 text-2xl font-bold">Shop Hotel</p>
          <p className="text-black text-opacity-40">Tripma partners with thousands of hotels to get you the best deal. Save up to 30% when you add a hotel to your trip.</p>
          <RecommendedTripCard />
        </section>
      </section>
    </>
  );
}

