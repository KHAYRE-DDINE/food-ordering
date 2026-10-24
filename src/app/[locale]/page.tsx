import { LazyChatAi } from "@/components/Chat/LazyChatAi";
import BestSellers from "./_components/BestSellers";
import Hero from "./_components/Hero";

import { Offers } from "./_components/Offers";
import Specials from "./_components/Specials";
import { Locale } from "@/i18n.config";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  return (
    <div>
      <Offers locale={locale} />
      <Hero locale={locale} />
      <BestSellers locale={locale} />
      <Specials locale={locale} />
      <LazyChatAi/>
    </div>
  );
}
