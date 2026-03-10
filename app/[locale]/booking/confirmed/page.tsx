"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { CheckCircle } from "lucide-react";
import { format } from "date-fns";
import { getBookings, type Booking } from "@/lib/bookingStore";

export default function BookingConfirmedPage() {
  const t = useTranslations("bookingConfirm");
  const params = useSearchParams();
  const routeParams = useParams<{ locale: string }>();
  const basePath = routeParams?.locale ? `/${routeParams.locale}` : "/";
  const bookingId = params.get("id");
  const [booking, setBooking] = useState<Booking | null>(null);

  useEffect(() => {
    if (!bookingId) return;
    const load = async () => {
      const data = await getBookings();
      const found = data.find((b) => b.id === bookingId) ?? null;
      setBooking(found);
    };
    load();
  }, [bookingId]);

  const stayDates = useMemo(() => {
    if (!booking) return "";
    return `${format(new Date(booking.checkIn), "MMM dd, yyyy")} - ${format(
      new Date(booking.checkOut),
      "MMM dd, yyyy"
    )}`;
  }, [booking]);

  return (
    <div className="min-h-[70vh] bg-sand-50 flex items-center justify-center px-4 py-16">
      <div className="bg-white rounded-2xl shadow-lg border border-sand-200 max-w-xl w-full p-8 text-center">
        <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mt-4">
          {t("title")}
        </h1>
        <p className="text-gray-600 mt-2">{t("subtitle")}</p>

        <div className="mt-6 text-left bg-sand-50 rounded-xl p-4 text-sm text-gray-700">
          <div className="flex justify-between">
            <span className="text-gray-500">{t("bookingId")}</span>
            <span className="font-medium">{booking?.id ?? "-"}</span>
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-gray-500">{t("guest")}</span>
            <span className="font-medium">{booking?.guestName ?? "-"}</span>
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-gray-500">{t("room")}</span>
            <span className="font-medium">{booking?.roomName ?? "-"}</span>
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-gray-500">{t("dates")}</span>
            <span className="font-medium">{stayDates || "-"}</span>
          </div>
        </div>

        <a
          href={basePath}
          className="inline-flex items-center justify-center mt-6 px-6 py-3 rounded-full bg-ocean-600 hover:bg-ocean-700 text-white font-semibold transition-colors"
        >
          {t("backHome")}
        </a>
      </div>
    </div>
  );
}
