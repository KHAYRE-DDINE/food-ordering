import Details from "@/components/menu/details";
import { db } from "@/lib/prisma";

interface PageProps {
  params: Promise<{
    id: string;
    locale: string;
  }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const awaitedParams = await params;
  return {
    title: `Menu Item ${awaitedParams.id}`,
  };
}

export default async function MenuItemPage({ params }: PageProps) {
  const awaitedParams = await params;
  const { id } = awaitedParams;
  
  try {
    const product = await db.product.findUnique({
      where: { id },
      include: { 
        sizes: true, 
        extras: true 
      },
    });

    if (!product) {
      return <div className="container py-8">Product not found</div>;
    }

    return (
      <div className="container py-8">
        <Details item={product} />
      </div>
    );
  } catch (error) {
    console.error('Error fetching product:', error);
    return <div className="container py-8">Error loading product. Please try again later.</div>;
  }
}