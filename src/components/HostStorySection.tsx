"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Sun } from "lucide-react";

export function HostStorySection() {
  const t = useTranslations("story");

  return (
    <section id="story" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3]"
          >
            <img
              src="/images/story/host-story.png"
              alt="Host story"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <div className="flex items-center gap-2 text-sm uppercase tracking-widest text-sand-100">
                <Sun className="w-4 h-4" />
                {t("eyebrow")}
              </div>
              <div className="font-display text-2xl font-semibold mt-2">{t("title")}</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
              {t("description")}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
