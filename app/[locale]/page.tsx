"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { RoomsSection } from "@/components/RoomsSection";
import { HostStorySection } from "@/components/HostStorySection";
import { BookingSection } from "@/components/BookingSection";
import { ContactSection } from "@/components/ContactSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <RoomsSection />
      <HostStorySection />
      <BookingSection />
      <ContactSection />
    </>
  );
}
