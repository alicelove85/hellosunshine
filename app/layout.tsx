import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hello Sunshine | Surf Homestay in Nias, Indonesia",
  description:
    "Experience the ultimate surf getaway at Hello Sunshine, a cozy beachfront homestay in Nias Island, Indonesia. Perfect waves, ocean views, and warm hospitality await.",
  keywords: [
    "Nias",
    "surfing",
    "homestay",
    "Indonesia",
    "surf trip",
    "accommodation",
    "beach",
    "waves",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
