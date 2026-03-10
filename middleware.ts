import createMiddleware from "next-intl/middleware";
import { locales } from "./src/i18n";

export default createMiddleware({
  locales,
  defaultLocale: "en",
});

export const config = {
  matcher: ["/", "/(en|id|ko)/:path*"],
};
