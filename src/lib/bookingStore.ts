// Booking data store using localStorage

export interface Booking {
  id: string;
  roomId: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  totalPrice: number;
  deposit: number;
  guestName: string;
  email: string;
  phone: string;
  specialRequests: string;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: string;
}

const STORAGE_KEY = "hello_sunshine_bookings";

export function getBookings(): Booking[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function addBooking(booking: Omit<Booking, "id" | "createdAt">): Booking {
  const bookings = getBookings();
  const newBooking: Booking = {
    ...booking,
    id: `HSB-${Date.now()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`,
    createdAt: new Date().toISOString(),
  };
  bookings.push(newBooking);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
  return newBooking;
}

export function updateBookingStatus(id: string, status: Booking["status"]): void {
  const bookings = getBookings();
  const index = bookings.findIndex((b) => b.id === id);
  if (index !== -1) {
    bookings[index].status = status;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
  }
}

export function deleteBooking(id: string): void {
  const bookings = getBookings();
  const filtered = bookings.filter((b) => b.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

export function getBookingsByDateRange(start: Date, end: Date): Booking[] {
  const bookings = getBookings();
  return bookings.filter((booking) => {
    const checkIn = new Date(booking.checkIn);
    const checkOut = new Date(booking.checkOut);
    return (
      (checkIn >= start && checkIn <= end) ||
      (checkOut >= start && checkOut <= end) ||
      (checkIn <= start && checkOut >= end)
    );
  });
}

export function getRoomAvailability(
  roomId: string,
  checkIn: Date,
  checkOut: Date
): number {
  const roomCapacity: Record<string, number> = {
    oceanBreezeA: 1,
    oceanBreezeB: 1,
    oceanBreezeC: 1,
    oceanBreezeD: 1,
    surferRoomA: 1,
    surferRoomB: 1,
    surferRoomC: 1,
    family: 1,
  };

  const bookings = getBookings().filter(
    (b) =>
      b.roomId === roomId &&
      b.status === "confirmed" &&
      new Date(b.checkIn) < checkOut &&
      new Date(b.checkOut) > checkIn
  );

  return roomCapacity[roomId] - bookings.length;
}

