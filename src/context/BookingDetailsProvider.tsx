import { createContext, useEffect, useState } from 'react';

interface BookingDetailsContext{
    step: number;
    setStep: React.Dispatch<React.SetStateAction<number>>;
}

export const BookingDetailsContext = createContext<BookingDetailsContext | undefined>(undefined);

const BookingDetailsProvider = ({ children }) => {
  // Initialize state
  const [step, setStep] = useState<number>(0);
  return (
    <BookingDetailsContext.Provider value={{ step, setStep }}>
      {children}
    </BookingDetailsContext.Provider>
  );
};

export default BookingDetailsProvider;