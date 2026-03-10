"use client";

import { useState, useEffect, useMemo } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Check, Sun, Waves, Users, Bike, Plane } from "lucide-react";
import {
  ROOM_ORDER,
  defaultRoomSettings,
  getRoomSettings,
  type RoomKey,
  type RoomSettingsMap,
} from "@/lib/roomSettings";

interface Room {
  id: string;
  key: RoomKey;
  price: string;
  image: string;
  icon: typeof Sun;
  gallery?: string[];
  nameOverride?: string;
  descriptionOverride?: string;
  featuresOverride?: string[];
}

export function RoomsSection() {
  const t = useTranslations("rooms");
  const tCommon = useTranslations("common");
  const [activeRoomKey, setActiveRoomKey] = useState<RoomKey>("oceanBreezeA");
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const serviceIcons = ["surf", "board", "bike", "airport"] as const;
  const [roomSettings, setRoomSettings] = useState<RoomSettingsMap>(defaultRoomSettings);

  useEffect(() => {
    setRoomSettings(getRoomSettings());
  }, []);

  const getRoomName = (room: Room) =>
    room.nameOverride ?? t(`${room.key}.name`);
  const getRoomDescription = (room: Room) =>
    room.descriptionOverride ?? t(`${room.key}.description`);
  const getRoomFeatures = (room: Room) =>
    room.featuresOverride ?? (t.raw(`${room.key}.features`) as string[]);

  const rooms = useMemo<Room[]>(() => {
    return ROOM_ORDER.map((key) => {
      const data = roomSettings[key] ?? defaultRoomSettings[key];
      const icon = key === "family" ? Users : key.includes("surfer") ? Waves : Sun;
      return {
        id: key,
        key,
        price: data.price,
        image: data.image,
        gallery: data.gallery,
        nameOverride: data.nameOverride,
        descriptionOverride: data.descriptionOverride,
        featuresOverride: data.featuresOverride,
        icon,
      };
    });
  }, [roomSettings]);

  const activeRoom = rooms.find((room) => room.key === activeRoomKey) ?? rooms[0];
  const getRoomTypeImages = (room: Room) => {
    const base = room.gallery?.length ? room.gallery : [room.image];
    const result = [...base];
    while (result.length < 4) {
      result.push(base[base.length - 1]);
    }
    return result.slice(0, 4);
  };

  return (
    <section id="rooms" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
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

        {/* Room Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {rooms.map((room, index) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-sand-200"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={room.image}
                  alt={getRoomName(room)}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <room.icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-white">
                      {room.price}
                    </span>
                    <span className="text-white/80 text-sm">
                      {tCommon("perNight")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-display text-xl font-semibold text-gray-900 mb-2">
                  {getRoomName(room)}
                </h3>
                {room.key === "family" && (
                  <span className="inline-block px-2 py-1 bg-sunset-100 text-sunset-700 text-xs font-medium rounded-full mb-2">
                    {t("family.badge")}
                  </span>
                )}
                <p className="text-gray-600 text-sm mb-4">
                  {getRoomDescription(room)}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {getRoomFeatures(room).map((feature: string, i: number) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-ocean-500" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                {room.gallery && (
                  <div
                    className={`grid gap-2 mb-6 ${
                      room.key === "oceanBreezeB" ? "grid-cols-2" : "grid-cols-3"
                    }`}
                  >
                    {room.gallery.slice(0, 6).map((src, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setLightboxSrc(src)}
                        className="block"
                      >
                        <img
                          src={src}
                          alt={`${t(`${room.key}.name`)} ${i + 1}`}
                          className="w-full h-20 object-cover rounded-lg border border-sand-200 hover:opacity-90 transition"
                        />
                      </button>
                    ))}
                  </div>
                )}

                {/* Book Button */}
                <a
                  href="#booking"
                  className="block w-full py-3 text-center bg-ocean-500 hover:bg-ocean-600 text-white font-medium rounded-xl transition-colors"
                >
                  {tCommon("bookNow")}
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Room Types */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="text-center mb-10">
            <span className="text-sunset-600 font-medium tracking-widest uppercase text-sm">
              {t("typesEyebrow")}
            </span>
            <h3 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              {t("typesTitle")}
            </h3>
            <p className="text-gray-600 mt-3">{t("typesSubtitle")}</p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {rooms.map((room) => (
              <button
                key={room.key}
                onClick={() => setActiveRoomKey(room.key)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  activeRoomKey === room.key
                    ? "bg-ocean-600 text-white shadow-md"
                    : "bg-white text-gray-700 border border-gray-200 hover:border-ocean-300"
                }`}
              >
                {getRoomName(room)}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-sand-200 p-8">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-1/2">
                <div className="grid grid-cols-2 gap-3">
                  {getRoomTypeImages(activeRoom).map((src, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setLightboxSrc(src)}
                        className="block"
                      >
                        <img
                          src={src}
                          alt={`${t(`${activeRoom.key}.name`)} ${i + 1}`}
                          className="w-full h-40 object-cover rounded-xl border border-sand-200 hover:opacity-90 transition"
                          loading="lazy"
                        />
                      </button>
                    ))}
                </div>
              </div>
              <div className="lg:w-1/2 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-display text-2xl font-semibold text-gray-900">
                    {getRoomName(activeRoom)}
                  </h4>
                  <div className="text-ocean-600 font-bold text-lg">
                    {activeRoom.price}
                    <span className="text-gray-400 font-normal text-sm">
                      {tCommon("perNight")}
                    </span>
                  </div>
                </div>
                <p className="text-gray-600">{getRoomDescription(activeRoom)}</p>
                <ul className="grid sm:grid-cols-2 gap-2">
                  {getRoomFeatures(activeRoom).map((feature: string, i: number) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-ocean-500" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {lightboxSrc && (
          <div
            className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
            onClick={() => setLightboxSrc(null)}
          >
            <div
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightboxSrc}
                alt="Room preview"
                className="w-full max-h-[80vh] object-contain rounded-2xl bg-black"
              />
              <button
                type="button"
                onClick={() => setLightboxSrc(null)}
                className="absolute top-4 right-4 px-4 py-2 rounded-full bg-white/90 text-gray-900 text-sm font-medium shadow hover:bg-white"
              >
                {tCommon("close")}
              </button>
            </div>
          </div>
        )}

        {/* WhatsApp Inquiry */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="bg-sand-50 rounded-2xl p-8 text-center border border-sand-200">
            <h3 className="font-display text-2xl font-bold text-gray-900">
              {t("whatsappTitle")}
            </h3>
            <p className="text-gray-600 mt-2">{t("whatsappDescription")}</p>
            <a
              href="https://wa.me/6281236557548"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center mt-6 px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full transition-all hover:-translate-y-1 shadow-lg"
            >
              {t("whatsappCta")}
            </a>
          </div>
        </motion.div>

        {/* Additional Services */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10"
        >
          <div className="bg-white rounded-2xl p-8 text-center border border-sand-200 shadow-sm">
            <h3 className="font-display text-2xl font-bold text-gray-900">
              {t("servicesTitle")}
            </h3>
            <p className="text-gray-600 mt-2">{t("servicesSubtitle")}</p>
          <div className="grid grid-cols-2 gap-4 mt-6">
            {(t.raw("servicesItems") as string[]).map((item: string, index: number) => {
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
          </div>
        </motion.div>

      </div>
    </section>
  );
}


