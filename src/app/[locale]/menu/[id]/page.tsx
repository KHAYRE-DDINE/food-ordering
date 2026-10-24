import Details from "@/components/menu/details";
import { db } from "@/lib/prisma";
import getTrans from "@/lib/translation";
import { Locale } from "@/i18n.config";
import { localizeProduct } from "@/lib/menu-localization";

interface PageProps {
  params: Promise<{
    id: string;
    locale: string;
  }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateMetadata({ params }: { params: Promise<{ id: string, locale: string }> }) {
  const awaitedParams = await params;
  return {
    title: `Menu Item ${awaitedParams.id}`,
  };
}

export default async function MenuItemPage({ params }: PageProps) {
  const awaitedParams = await params;
  const { id, locale } = awaitedParams;
  const typedLocale = locale as Locale;
  const { menu } = await getTrans(typedLocale);
  
  try {
    const product = await db.product.findUnique({
      where: { id },
      include: { 
        sizes: true, 
        extras: true 
      },
    });

    if (!product) {
      return <div className="container py-8">{menu.productNotFound}</div>;
    }

    return (
      <div className="container py-8">
        <Details item={localizeProduct(product, typedLocale)} locale={typedLocale} translation={menu} />
      </div>
    );
  } catch (error) {
    console.error('Error fetching product:', error);
    return <div className="container py-8">{menu.errorLoadingProduct}</div>;
  }
}
