"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronDown, Waves } from "lucide-react";

export function HeroSection() {
  const t = useTranslations("hero");
  const pathname = usePathname();
  const locale = pathname.split("/")[1] ?? "";
  const basePath = locale ? `/${locale}` : "";

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/images/rooms/ocean-breeze-a/02.png')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-sand-900/40 via-ocean-900/40 to-gray-900/70" />
        <div className="absolute inset-0 bg-gradient-to-tr from-sunset-500/30 via-transparent to-sunset-200/20" />
      </div>

      {/* Animated Wave Decoration */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg
          viewBox="0 0 1440 120"
          className="w-full h-24 md:h-32 fill-sand-50"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0,64 C288,96 576,32 864,64 C1152,96 1296,48 1440,64 L1440,120 L0,120 Z"
            animate={{
              d: [
                "M0,64 C288,96 576,32 864,64 C1152,96 1296,48 1440,64 L1440,120 L0,120 Z",
                "M0,80 C288,48 576,96 864,48 C1152,32 1296,80 1440,64 L1440,120 L0,120 Z",
                "M0,64 C288,96 576,32 864,64 C1152,96 1296,48 1440,64 L1440,120 L0,120 Z",
              ],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-center gap-2 mb-6"
        >
          <Waves className="w-6 h-6 text-ocean-300 animate-ocean" />
          <span className="text-ocean-200 font-medium tracking-widest uppercase text-sm">
            {t("location")}
          </span>
          <Waves className="w-6 h-6 text-ocean-300 animate-ocean" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 tracking-tight"
        >
          {t("title")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xl md:text-2xl text-sand-100 font-semibold mb-6 tracking-wide"
        >
          {t("tagline")}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {t("description")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href={`${basePath}/booking`}
            className="px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-green-500/30 hover:-translate-y-1"
          >
            {t("ctaPrimary")}
          </a>
          <a
            href="#rooms"
            className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold rounded-full border border-white/30 transition-all duration-300 hover:-translate-y-1"
          >
            {t("ctaSecondary")}
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-32 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-8 h-8 text-white/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}

