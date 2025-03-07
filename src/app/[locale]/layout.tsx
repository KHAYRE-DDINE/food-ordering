
import { Directions, Languages } from "@/constants/enums";
import type { Metadata } from "next";
import { Cairo, Roboto } from "next/font/google";
import { Locale } from "@/i18n.config";
import "./globals.css";
import ReduxProvider from "@/provider/ReduxProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ChatAi } from "@/components/Chat/ChatAi";

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
  title: "Create Next App",
  description: "Generated by create next app",
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
          <Footer />
          <ChatAi />
          {/* <div className="w-full h-3 shadow-[0_5px_15px_rgba(0,0,255,0.5)]"></div> */}
        </ReduxProvider>
      </body>
    </html>

  );
}