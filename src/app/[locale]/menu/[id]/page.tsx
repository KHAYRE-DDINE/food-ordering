import Details from '@/components/menu/details'
import { db } from '@/lib/prisma'
import React from 'react'

interface Params {
    id: string
}

const ItemDetails = async ({ params }: { params: Params }) => {
    const product = await db.product.findUnique({
        where: {
            id: params.id
        },
        include: {
            sizes: true,
            extras: true,
        },

    })
    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div className='container'>
            <Details item={product} />
        </div>
    )
}

export default ItemDetails
