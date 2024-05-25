export interface FlightDetail {
    flightNumber: string;
    airline: string;
    origin: string;
    destination: string;
    departureDate: string; // ISO 8601 date-time format
    arrivalDate: string; // ISO 8601 date-time format
}

export interface BookingInfo {
    bookingId: string;
    passengerName: string;
    flightDetails: FlightDetail[];
    bookingDate: string; // ISO 8601 date-time format
    seatNumber: string;
    cabinClass: string;
    totalCost: number;
}

export interface BookingCardProps {
    booking: BookingInfo;
}
