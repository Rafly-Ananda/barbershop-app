export interface Booking {
  invoice_id: string;
  barber_id: string;
  service_id: string;
  rating: string;
  date: string;
  time: string;
  price: string;
  payment: string;
  feedback: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone_number: number;
  current_booking: string;
  booking_history: Array<Booking>;
  booking_cart: Booking;
}

export interface Barbers {
  id: string;
  name: string;
  rating: number;
}
