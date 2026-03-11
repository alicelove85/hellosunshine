// Booking data store using localStorage

import { supabase } from "./supabaseClient";

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

type BookingRow = {
  id: string;
  room_id: string;
  room_name: string;
  check_in: string;
  check_out: string;
  nights: number;
  total_price: number;
  deposit: number;
  guest_name: string;
  email: string;
  phone: string;
  special_requests: string;
  status: Booking["status"];
  created_at: string;
};

const normalizeStatus = (status: string): Booking["status"] => {
  const normalized = status.toLowerCase().trim();
  if (normalized === "confirmed") return "confirmed";
  if (normalized === "cancelled") return "cancelled";
  return "pending";
};

const toBooking = (row: BookingRow): Booking => ({
  id: row.id,
  roomId: row.room_id,
  roomName: row.room_name,
  checkIn: row.check_in,
  checkOut: row.check_out,
  nights: row.nights,
  totalPrice: row.total_price,
  deposit: row.deposit,
  guestName: row.guest_name,
  email: row.email,
  phone: row.phone,
  specialRequests: row.special_requests,
  status: normalizeStatus(row.status),
  createdAt: row.created_at,
});

const toBookingRow = (booking: Booking): BookingRow => ({
  id: booking.id,
  room_id: booking.roomId,
  room_name: booking.roomName,
  check_in: booking.checkIn,
  check_out: booking.checkOut,
  nights: booking.nights,
  total_price: booking.totalPrice,
  deposit: booking.deposit,
  guest_name: booking.guestName,
  email: booking.email,
  phone: booking.phone,
  special_requests: booking.specialRequests,
  status: booking.status,
  created_at: booking.createdAt,
});

export async function getBookings(): Promise<Booking[]> {
  if (supabase) {
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      console.error("Supabase getBookings error:", error.message);
      return [];
    }
    return (data as BookingRow[]).map(toBooking);
  }
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export async function addBooking(
  booking: Omit<Booking, "id" | "createdAt">
): Promise<Booking> {
  const newBooking: Booking = {
    ...booking,
    id: `HSB-${Date.now()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`,
    createdAt: new Date().toISOString(),
  };

  if (supabase) {
    const { data, error } = await supabase
      .from("bookings")
      .insert([toBookingRow(newBooking)])
      .select()
      .single();
    if (error) {
      console.error("Supabase addBooking error:", error.message);
      return newBooking;
    }
    return toBooking(data as BookingRow);
  }

  const bookings = await getBookings();
  bookings.push(newBooking);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
  return newBooking;
}

export async function updateBookingStatus(
  id: string,
  status: Booking["status"]
): Promise<void> {
  if (supabase) {
    const { error } = await supabase
      .from("bookings")
      .update({ status })
      .eq("id", id);
    if (error) {
      console.error("Supabase updateBookingStatus error:", error.message);
    }
    return;
  }

  const bookings = await getBookings();
  const index = bookings.findIndex((b) => b.id === id);
  if (index !== -1) {
    bookings[index].status = status;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
  }
}

export async function deleteBooking(id: string): Promise<void> {
  if (supabase) {
    const { error } = await supabase.from("bookings").delete().eq("id", id);
    if (error) {
      console.error("Supabase deleteBooking error:", error.message);
    }
    return;
  }

  const bookings = await getBookings();
  const filtered = bookings.filter((b) => b.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

export async function getBookingsByDateRange(
  start: Date,
  end: Date
): Promise<Booking[]> {
  const bookings = await getBookings();
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

export function getRoomAvailabilityFromBookings(
  bookings: Booking[],
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

  const activeBookings = bookings.filter(
    (b) =>
      b.roomId === roomId &&
      b.status === "confirmed" &&
      new Date(b.checkIn) < checkOut &&
      new Date(b.checkOut) > checkIn
  );

  return roomCapacity[roomId] - activeBookings.length;
}

export async function getRoomAvailability(
  roomId: string,
  checkIn: Date,
  checkOut: Date
): Promise<number> {
  const bookings = await getBookings();
  return getRoomAvailabilityFromBookings(bookings, roomId, checkIn, checkOut);
}

