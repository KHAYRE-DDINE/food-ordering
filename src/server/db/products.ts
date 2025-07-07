import { cache } from "@/lib/cache";
import { db } from "@/lib/prisma";
import { ProductWithRelations } from "@/types/product";
import { ProductSizes, ExtraIngredients } from "@prisma/client";

interface ProductSize {
    id: string;
    name: ProductSizes;
    price: number;
    productId: string;
}

interface ProductExtra {
    id: string;
    name: ExtraIngredients;
    price: number;
    productId: string;
}

interface Product {
    id: string;
    name: string;
    description: string;
    image: string;
    order: number;
    basePrice: number;
    categoryId: string;
    createdAt: Date;
    updatedAt: Date;
    sizes: ProductSize[];
    extras: ProductExtra[];
}

interface Category {
    id: string;
    name: string;
    products: Product[];
}

export const getProductByCategory = cache(
    async (): Promise<Category[]> => {
        // First, get all categories with their products
        const categories = await db.category.findMany({
            include: {
                products: {
                    include: {
                        sizes: true,
                        extras: true,
                    },
                    orderBy: {
                        order: 'asc'
                    }
                }
            },
            orderBy: {
                order: 'asc'
            }
        });

        return categories;
    },
    ['product'],
    { revalidate: 3600 }
);

export const getBestSellers = cache(
    async (limit?: number): Promise<ProductWithRelations[]> => {
        const product = await db.product.findMany({
            where: {
                orders: {
                    some: {}, // Matches any related order
                },
            },
            orderBy: {
                createdAt: 'desc', 
            },
            include: {
                sizes: true,
                extras: true,
            },
            take: limit,
        });
        return product as unknown as ProductWithRelations[];
    }, ['best-seller'], { revalidate: 3600 }
)

export const getCategories = cache(
    async (): Promise<{ id: string; name: string }[]> => {
        const categories = await db.category.findMany({
            select: {
                id: true,
                name: true,
            },
            orderBy: {
                order: 'asc'
            }
        });
        return categories;
    },
    ['categories'],
    { revalidate: 3600 }
);




// export const getBestSellers = cache(
//     (limit?: number) => {
//         const product = db.product.findMany({
//             where: {
//                 orders: {
//                     some: {}, // Matches any related order
//                 },
//             },
//             orderBy: {
//                 orders: {
//                     _count: 'desc'
//                 },
//             },
//             include: {
//                 sizes: true,
//                 extras: true
//             },
//             take: limit
//         }
//         )
//         return product
//     }, ['best-seller'], { revalidate: 3600 })

