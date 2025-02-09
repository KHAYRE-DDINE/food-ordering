import React from 'react'
import MenuItem from './MenuItem'
import { ProductWithRelations } from '@/types/product'
import { getCurrentLocale } from '@/lib/getCurrentLocale'
import getTrans from '@/lib/translation'

const Menu = async ({ items }: { items: ProductWithRelations[] }) => {
    const locale = await getCurrentLocale()
    const { noProductsFound } = await getTrans(locale)

    return (
        items.length > 0 ? (
            <div className="container">
                <ul className='grid grid-cols-1 sm:grid-cols-3 gap-5 text-center'>
                    {items.map((item) => (
                        <MenuItem key={item.id} item={item} />
                    ))}
                </ul>
            </div>
        ) : (
            <p className='text-accent text-center mb-4'>{noProductsFound}</p>
        )
    )
}

export default Menu