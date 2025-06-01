import Details from "@/components/menu/details";
import { db } from "@/lib/prisma";

export async function generateMetadata({ id }: { id: string }) {
  return {
    title: `Menu Item ${id}`,
  };
}

export default async function Page({ id }: { id: string }) {
  const product = await db.product.findUnique({
    where: { id: id },
    include: { sizes: true, extras: true },
  });

  if (!product) return <div>Product not found</div>;

  return (
    <div className="container">
      <Details item={product} />
    </div>
  );
}
