"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Sun, Wind, Waves } from "lucide-react";

export function AboutSection() {
  const t = useTranslations("about");

  const highlights = [
    { icon: Sun, label: t("highlight1") },
    { icon: Wind, label: t("highlight2") },
    { icon: Waves, label: t("highlight3") },
  ];

  return (
    <section className="py-24 bg-sand-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image Grid */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden aspect-[3/4] shadow-xl">
                <img
                  src="/images/rooms/ocean-breeze-a/02.png"
                  alt="Ocean view room"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="rounded-2xl overflow-hidden aspect-square shadow-xl">
                <img
                  src="/images/rooms/room-types/01.png"
                  alt="Ocean view room 2"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            <div className="pt-8 space-y-4">
              <div className="rounded-2xl overflow-hidden aspect-square shadow-xl">
                <img
                  src="/images/rooms/room-types/02.png"
                  alt="Ocean view room 3"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="rounded-2xl overflow-hidden aspect-[3/4] shadow-xl">
                <img
                  src="/images/rooms/ocean-breeze-a/04.png"
                  alt="Ocean view room 4"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <span className="text-sunset-600 font-medium tracking-widest uppercase text-sm">
              {t("eyebrow")}
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900">
              {t("title")}
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              {t("description")}
            </p>

            <div className="grid grid-cols-3 gap-4 pt-6">
              {highlights.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center p-4 rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-sand-100 flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-sunset-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {item.label}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Location Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-sand-200 to-sand-300 text-sand-900"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white/60 flex items-center justify-center flex-shrink-0">
                  <Waves className="w-6 h-6 text-sand-700" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold mb-2">
                    {t("locationTitle")}
                  </h3>
                  <p className="text-sand-800">
                    {t("locationDescription")}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

