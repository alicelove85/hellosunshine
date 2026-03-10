"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { DayPicker, DateRange } from "react-day-picker";
import { differenceInDays, format, startOfDay } from "date-fns";
import {
  Check,
  Loader2,
  Mail,
  MessageCircle,
  Phone,
  User,
  Waves,
  Bike,
  Plane,
} from "lucide-react";
import "react-day-picker/dist/style.css";
import {
  addBooking,
  getBookings,
  getRoomAvailabilityFromBookings,
  type Booking,
} from "@/lib/bookingStore";
import { supabase } from "@/lib/supabaseClient";
import { getRoomSettings } from "@/lib/roomSettings";

type RoomOption = {
  id: string;
  name: string;
  priceLabel: string;
  priceValue: number;
};

const parsePriceToNumber = (price: string) => {
  const match = price.match(/(\d+)\s*K/i);
  if (match) return Number(match[1]) * 1000;
  const digits = price.replace(/[^\d]/g, "");
  return digits ? Number(digits) : 0;
};

export function BookingSection() {
  const t = useTranslations("booking");
  const tCommon = useTranslations("common");
  const tRooms = useTranslations("rooms");
  const serviceIcons = ["surf", "board", "bike", "airport"] as const;

  const [roomOptions, setRoomOptions] = useState<RoomOption[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<string>("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    requests: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const loadBookings = async () => {
    const data = await getBookings();
    setBookings(data);
  };

  useEffect(() => {
    const settings = getRoomSettings();
    const options: RoomOption[] = [
      { id: "oceanBreezeA", name: tRooms("oceanBreezeA.name"), priceLabel: settings.oceanBreezeA.price, priceValue: parsePriceToNumber(settings.oceanBreezeA.price) },
      { id: "oceanBreezeB", name: tRooms("oceanBreezeB.name"), priceLabel: settings.oceanBreezeB.price, priceValue: parsePriceToNumber(settings.oceanBreezeB.price) },
      { id: "oceanBreezeC", name: tRooms("oceanBreezeC.name"), priceLabel: settings.oceanBreezeC.price, priceValue: parsePriceToNumber(settings.oceanBreezeC.price) },
      { id: "oceanBreezeD", name: tRooms("oceanBreezeD.name"), priceLabel: settings.oceanBreezeD.price, priceValue: parsePriceToNumber(settings.oceanBreezeD.price) },
      { id: "family", name: tRooms("family.name"), priceLabel: settings.family.price, priceValue: parsePriceToNumber(settings.family.price) },
      { id: "surferRoomA", name: tRooms("surferRoomA.name"), priceLabel: settings.surferRoomA.price, priceValue: parsePriceToNumber(settings.surferRoomA.price) },
      { id: "surferRoomB", name: tRooms("surferRoomB.name"), priceLabel: settings.surferRoomB.price, priceValue: parsePriceToNumber(settings.surferRoomB.price) },
      { id: "surferRoomC", name: tRooms("surferRoomC.name"), priceLabel: settings.surferRoomC.price, priceValue: parsePriceToNumber(settings.surferRoomC.price) },
    ];
    setRoomOptions(options);
    loadBookings();
    if (!supabase) return;
    const channel = supabase
      .channel("bookings-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "bookings" },
        () => {
          loadBookings();
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [tRooms]);

  const selectedRoomData = roomOptions.find((r) => r.id === selectedRoom);

  const nights = useMemo(() => {
    if (dateRange?.from && dateRange?.to) {
      return differenceInDays(dateRange.to, dateRange.from);
    }
    return 0;
  }, [dateRange]);

  const totalPrice = useMemo(() => {
    if (selectedRoomData && nights > 0) {
      return selectedRoomData.priceValue * nights;
    }
    return 0;
  }, [selectedRoomData, nights]);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);

  const getAvailability = (roomId: string) => {
    if (!dateRange?.from || !dateRange?.to) return null;
    return getRoomAvailabilityFromBookings(
      bookings,
      roomId,
      dateRange.from,
      dateRange.to
    );
  };

  const isDateBooked = (date: Date) => {
    if (!selectedRoom) return false;
    const target = startOfDay(date).getTime();
    return bookings.some((booking) => {
      if (booking.status !== "confirmed") return false;
      if (booking.roomId !== selectedRoom) return false;
      const checkIn = startOfDay(new Date(booking.checkIn)).getTime();
      const checkOut = startOfDay(new Date(booking.checkOut)).getTime();
      return target >= checkIn && target < checkOut;
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedRoom || !dateRange?.from || !dateRange?.to || !selectedRoomData) return;
    const availability = getRoomAvailabilityFromBookings(
      bookings,
      selectedRoom,
      dateRange.from,
      dateRange.to
    );
    if (availability <= 0) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    await addBooking({
      roomId: selectedRoom,
      roomName: selectedRoomData.name,
      checkIn: dateRange.from.toISOString(),
      checkOut: dateRange.to.toISOString(),
      nights,
      totalPrice,
      deposit: 0,
      guestName: formData.name,
      email: formData.email,
      phone: formData.phone,
      specialRequests: formData.requests,
      status: "pending",
    });
    await loadBookings();

    setIsSubmitting(false);
    setSubmitSuccess(true);
    setTimeout(() => setSubmitSuccess(false), 2500);
  };

  const isFormValid =
    selectedRoom &&
    dateRange?.from &&
    dateRange?.to &&
    formData.name &&
    formData.email &&
    formData.phone;

  return (
    <section id="booking" className="py-24 bg-sand-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-ocean-600 font-medium tracking-widest uppercase text-sm">
            {t("eyebrow")}
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mt-2">
            {t("title")}
          </h2>
          <p className="text-gray-600 mt-4 text-lg">{t("subtitle")}</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-semibold text-lg text-gray-900 mb-4">
                {t("selectRoom")}
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {roomOptions.map((room) => {
                  const availability = getAvailability(room.id);
                  const isUnavailable = availability !== null && availability <= 0;
                  return (
                    <button
                      key={room.id}
                      type="button"
                      onClick={() => setSelectedRoom(room.id)}
                      disabled={isUnavailable}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        selectedRoom === room.id
                          ? "border-ocean-500 bg-ocean-50"
                          : "border-gray-200 hover:border-ocean-300"
                      } ${isUnavailable ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="font-medium text-gray-900">{room.name}</div>
                        {availability !== null && (
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              availability > 0
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {availability > 0 ? t("available") : t("unavailable")}
                          </span>
                        )}
                      </div>
                      <div className="text-ocean-600 font-semibold mt-2">
                        {room.priceLabel}
                        <span className="text-gray-400 font-normal text-sm">
                          {tCommon("perNight")}
                        </span>
                      </div>
                      {selectedRoom === room.id && (
                        <Check className="w-5 h-5 text-ocean-500 mt-2" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-semibold text-lg text-gray-900 mb-4">
                {t("selectDates")}
              </h3>
              <div className="flex justify-center">
                <DayPicker
                  mode="range"
                  selected={dateRange}
                  onSelect={setDateRange}
                  numberOfMonths={2}
                  disabled={(date) =>
                    date < startOfDay(new Date()) ||
                    (selectedRoom ? isDateBooked(date) : false)
                  }
                  className="!font-sans"
                />
              </div>
              {dateRange?.from && dateRange?.to && (
                <div className="mt-4 flex flex-wrap justify-center gap-6 text-sm">
                  <div>
                    <span className="text-gray-500">{tCommon("checkIn")}:</span>{" "}
                    <span className="font-medium">
                      {format(dateRange.from, "MMM dd, yyyy")}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">{tCommon("checkOut")}:</span>{" "}
                    <span className="font-medium">
                      {format(dateRange.to, "MMM dd, yyyy")}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-ocean-600">
                      {nights} {t("nights")}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-semibold text-lg text-gray-900 mb-4">
                {t("contact")}
              </h3>
              <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder={t("name")}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-ocean-500 focus:ring-2 focus:ring-ocean-500/20 outline-none"
                    required
                  />
                </div>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    placeholder={t("email")}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-ocean-500 focus:ring-2 focus:ring-ocean-500/20 outline-none"
                    required
                  />
                </div>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    placeholder={t("phone")}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-ocean-500 focus:ring-2 focus:ring-ocean-500/20 outline-none"
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <textarea
                    placeholder={t("specialRequests")}
                    value={formData.requests}
                    onChange={(e) => setFormData({ ...formData, requests: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-ocean-500 focus:ring-2 focus:ring-ocean-500/20 outline-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
                  className={`sm:col-span-2 py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                    isFormValid && !isSubmitting
                      ? "bg-sunset-500 hover:bg-sunset-600 text-white"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      {t("processing")}
                    </>
                  ) : (
                    t("submit")
                  )}
                </button>
              </form>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-24">
              <h3 className="font-semibold text-lg text-gray-900 mb-4">
                {t("summary")}
              </h3>
              {selectedRoomData ? (
                <>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{selectedRoomData.name}</span>
                    <span>{selectedRoomData.priceLabel}</span>
                  </div>
                  {nights > 0 && (
                    <div className="mt-4 border-t border-gray-100 pt-4">
                      <div className="flex justify-between text-sm">
                        <span>
                          {nights} {t("nights")}
                        </span>
                        <span className="font-semibold text-ocean-600">
                          {formatPrice(totalPrice)}
                        </span>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <p className="text-gray-500 text-sm">{t("selectRoom")}</p>
              )}

              <AnimatePresence>
                {submitSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Check className="w-5 h-5" />
                      {t("success")}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <p className="text-sm text-gray-600">{t("whatsappNote")}</p>
                <a
                  href="https://wa.me/6281236557548"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 mt-3 w-full px-4 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-all"
                >
                  <MessageCircle className="w-5 h-5" />
                  {t("whatsappCta")}
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Extra Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mt-10 bg-white rounded-2xl p-8 shadow-lg border border-sand-200 text-center"
        >
          <h3 className="font-display text-2xl font-bold text-gray-900">
            {tRooms("servicesTitle")}
          </h3>
          <p className="text-gray-600 mt-2">{tRooms("servicesSubtitle")}</p>
          <div className="grid grid-cols-2 gap-4 mt-6">
            {(tRooms.raw("servicesItems") as string[]).map((item: string, index: number) => {
              const iconType = serviceIcons[index] ?? "surf";
              return (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-sand-50 text-gray-800 font-medium whitespace-pre-line"
                >
                  <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-white flex items-center justify-center shadow-sm">
                    {iconType === "board" && (
                      <svg
                        viewBox="0 0 24 24"
                        className="w-5 h-5 text-sunset-600"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M12 2c2.2 0 4 3.6 4 8s-1.8 12-4 12-4-7.6-4-12 1.8-8 4-8z" />
                        <path d="M9 12h6" />
                      </svg>
                    )}
                    {iconType === "surf" && <Waves className="w-5 h-5 text-sunset-600" />}
                    {iconType === "bike" && <Bike className="w-5 h-5 text-sunset-600" />}
                    {iconType === "airport" && <Plane className="w-5 h-5 text-sunset-600" />}
                  </div>
                  {item}
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

