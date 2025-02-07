import Menu from '@/components/menu'
import { getProductByCategory } from '@/server/db/products'
import React from 'react'

const MenuPage = async () => {
    const categories = await getProductByCategory()


    return (
        <div>
            {categories.map((category) => (
                <section key={category.id} className='section-gap'>
                    <h1 className='text-primary text-4xl font-bold italic text-center mb-6'>{category.name}</h1>
                    <Menu items={category.products} />
                </section>
            ))}
        </div>
    )
}

export default MenuPage
