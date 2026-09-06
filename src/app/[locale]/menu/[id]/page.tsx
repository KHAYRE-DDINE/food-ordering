import Details from "@/components/menu/details";
import { db } from "@/lib/prisma";
import getTrans from "@/lib/translation";
import { Locale } from "@/i18n.config";

export const dynamic = "force-dynamic";

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
  const translation = await getTrans(locale as Locale);
  
  try {
    const product = await db.product.findUnique({
      where: { id },
      include: { 
        sizes: true, 
        extras: true 
      },
    });

    if (!product) {
      return <div className="container py-8">{translation.menu.productNotFound}</div>;
    }

    return (
      <div className="container py-8">
        <Details item={product} labels={translation.menuItem} />
      </div>
    );
  } catch (error) {
    console.error('Error fetching product:', error);
    return <div className="container py-8">{translation.menu.productLoadError}</div>;
  }
}
