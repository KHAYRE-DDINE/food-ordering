
import { Directions, Languages } from "@/constants/enums";
import type { Metadata } from "next";
import { Cairo, Roboto } from "next/font/google";
import { Locale } from "@/i18n.config";
import "./globals.css";
import ReduxProvider from "@/provider/ReduxProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ToastProvider } from "@/components/ToastProvider";

export async function generateStaticParams() {
  return [{ locale: Languages.ARABIC }, { locale: Languages.ENGLISH }];
}

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  preload: true,
});

const cairo = Cairo({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  preload: true,
});

export const metadata: Metadata = {
  title: "Food Ordering",
  description: "Food Ordering App",
  keywords: ["Food Ordering", "Food", "Ordering", "Food Ordering App"],
};

export default async function RootLayout({
  params,
  children,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}>) {

  const locale = (await params).locale;

  return (
    <html
      lang={locale}
      dir={locale === Languages.ARABIC ? Directions.RTL : Directions.LTR}
    >
      <body
        className={
          `${locale === Languages.ARABIC ? cairo.className : roboto.className} min-h-[100vh]`
        }
      >
        <ReduxProvider>
          <Header />
          <div className="pt-[80px]" style={{ minHeight: 'calc(100vh - 95px)' }}>
            {children}
          </div>
          {/* <ChatAi /> */}
          <Footer />
          <ToastProvider />
        </ReduxProvider>
      </body>
    </html>

  );
}