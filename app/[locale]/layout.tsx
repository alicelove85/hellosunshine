import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales } from "@/i18n";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: LocaleLayoutProps) {
  if (!locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </NextIntlClientProvider>
  );
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
