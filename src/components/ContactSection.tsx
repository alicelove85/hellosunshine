"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Instagram, MessageCircle } from "lucide-react";

export function ContactSection() {
  const t = useTranslations("contact");

  const contactInfo = [
    {
      icon: MapPin,
      label: t("address"),
      value: "Lagundri Beach, Nias Selatan",
      href: "https://maps.app.goo.gl/sA2AnaKVtuoA3Nrq7",
    },
    {
      icon: Phone,
      label: t("whatsapp"),
      value: "+62 081236557548",
      href: "https://wa.me/6281236557548",
    },
    {
      icon: Mail,
      label: t("email"),
      value: "irawanwau@gmail.com",
      href: "mailto:irawanwau@gmail.com",
    },
    {
      icon: Instagram,
      label: t("instagram"),
      value: "@hellosunshine_aparment_nias",
      href: "https://instagram.com/hellosunshine_aparment_nias",
    },
    {
      icon: Instagram,
      label: t("instagram"),
      value: "@sigulambe",
      href: "https://instagram.com/sigulambe",
    },
  ];

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-ocean-600 font-medium tracking-widest uppercase text-sm">
            Get In Touch
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mt-2">
            {t("title")}
          </h2>
          <p className="text-gray-600 mt-4 text-lg">{t("subtitle")}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Map / Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3]"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.8!2d97.7!3d0.55!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMMKwMzMnMDAuMCJOIDk3wrA0MicwMC4wIkU!5e0!3m2!1sen!2sid!4v1620000000000!5m2!1sen!2sid"
              className="absolute inset-0 w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            {/* Click overlay to open actual Google Maps link */}
            <a
              href="https://maps.app.goo.gl/sA2AnaKVtuoA3Nrq7"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 z-10 flex items-end justify-center pb-4 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity"
            >
              <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-lg">
                Open in Google Maps
              </span>
            </a>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6 text-center"
          >
            {contactInfo.map((item, index) => (
              <motion.a
                key={index}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-sand-50 transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-ocean-100 flex items-center justify-center flex-shrink-0 group-hover:bg-ocean-500 transition-colors">
                  <item.icon className="w-5 h-5 text-ocean-600 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">{item.label}</div>
                  <div className="font-medium text-gray-900 group-hover:text-ocean-600 transition-colors">
                    {item.value}
                  </div>
                </div>
              </motion.a>
            ))}

            {/* WhatsApp CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="pt-6 flex justify-center"
            >
              <a
                href="https://wa.me/6281236557548?text=Hi%20Hello%20Sunshine!%20I%27m%20interested%20in%20booking%20a%20stay."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full transition-all hover:-translate-y-1 shadow-lg hover:shadow-green-500/30"
              >
                <MessageCircle className="w-5 h-5" />
                Chat with us on WhatsApp
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

