import { cache } from "@/lib/cache";
import { db } from "@/lib/prisma";


export const getProductByCategory = cache(
    () => {
        const categories = db.category.findMany(
            {
                include: {
                    products: {
                        include: {
                            sizes: true,
                            extras: true,
                        }
                    }
                }
            }
        )
        return categories
    },
    ['product'],
    { revalidate: 3600 }
)

export const getBestSellers = cache(
    (limit?: number) => {
        const product = db.product.findMany({
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
        return product;
    }, ['best-seller'], { revalidate: 3600 }
)




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

