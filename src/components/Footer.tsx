"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { Sun, Instagram, Mail, Phone } from "lucide-react";

export function Footer() {
  const t = useTranslations("footer");
  const tContact = useTranslations("contact");
  const pathname = usePathname();
  const locale = pathname.split("/")[1] ?? "";
  const basePath = locale ? `/${locale}` : "";

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Sun className="w-8 h-8 text-sunset-400" />
            <span className="font-display text-xl font-semibold">
                Hello Sunshine Nias
              </span>
            </div>
            <p className="text-gray-400 text-sm">{t("tagline")}</p>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">{tContact("title")}</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <p>{tContact("address")}</p>
              <a
                href="https://wa.me/6281236557548"
                className="flex items-center gap-2 hover:text-sunset-400 transition-colors"
              >
                <Phone className="w-4 h-4" />
                +62 081236557548
              </a>
              <a
                href="mailto:irawanwau@gmail.com"
                className="flex items-center gap-2 hover:text-sunset-400 transition-colors"
              >
                <Mail className="w-4 h-4" />
                irawanwau@gmail.com
              </a>
            </div>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Follow Us</h3>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/hellosunshine_aparment_nias"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-sunset-500 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com/sigulambe"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-sunset-500 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
          {t("copyright")}
          <div className="mt-4">
            <a
              href={`${basePath}/admin`}
              className="inline-flex items-center justify-center px-4 py-2 rounded-full border border-gray-700 text-gray-300 hover:text-white hover:border-sunset-400 transition-colors"
            >
              {t("adminLink")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

