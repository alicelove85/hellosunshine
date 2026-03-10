"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { CheckCircle2, Coffee, Sparkles } from "lucide-react";

export function ServicesSection() {
  const t = useTranslations("essentials");

  return (
    <section id="essentials" className="py-24 bg-gradient-to-b from-white to-sand-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sunset-600 font-medium tracking-widest uppercase text-sm">
            {t("eyebrow")}
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mt-2">
            {t("title")}
          </h2>
          <p className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Essentials list */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-lg border border-sand-200"
          >
            <h3 className="font-display text-2xl font-semibold text-gray-900 mb-6">
              {t("essentialsTitle")}
            </h3>
            <ul className="space-y-3">
              {(t.raw("essentialsList") as string[]).map((item: string, index: number) => (
                <li key={index} className="flex items-center gap-3 text-gray-700">
                  <CheckCircle2 className="w-5 h-5 text-ocean-500 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Coffee block */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-sunset-500 to-ocean-600 rounded-2xl p-8 text-white shadow-xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <Coffee className="w-6 h-6" />
              </div>
              <h3 className="font-display text-2xl font-semibold">{t("coffeeTitle")}</h3>
            </div>
            <p className="text-white/90 text-lg leading-relaxed">
              {t("coffeeDescription")}
            </p>
            <p className="mt-6 text-white/90 font-semibold">{t("coffeeNote")}</p>
          </motion.div>
        </div>

        {/* Positioning */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-white rounded-2xl p-8 shadow-lg border border-sand-200"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-sunset-100 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-sunset-600" />
            </div>
            <h3 className="font-display text-2xl font-semibold text-gray-900">
              {t("positioningTitle")}
            </h3>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {(t.raw("positioningPoints") as string[]).map((point: string, index: number) => (
              <div key={index} className="p-4 rounded-xl bg-sand-50 text-gray-800 font-medium text-center">
                {point}
              </div>
            ))}
          </div>
          <p className="text-gray-700 mt-6">{t("positioningNote")}</p>
        </motion.div>
      </div>
    </section>
  );
}

