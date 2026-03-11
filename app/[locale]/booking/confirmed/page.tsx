import { Suspense } from "react";
import BookingConfirmedClient from "./BookingConfirmedClient";

export const dynamic = "force-dynamic";

export default function BookingConfirmedPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex items-center justify-center text-gray-500">
          Loading...
        </div>
      }
    >
      <BookingConfirmedClient />
    </Suspense>
  );
}
