import MainHead from '@/components/main-heading'
import React from 'react'
import Menu from '../../../components/menu'
import { getCurrentLocale } from '@/lib/getCurrentLocale'
import getTrans from '@/lib/translation'
import { getBestSellers } from '@/server/db/products'

const BestSellers = async () => {
    const bestSellers = await getBestSellers()
    const locale = await getCurrentLocale()
    const { home } = await getTrans(locale)
    const { bestSeller } = home
console.log(bestSellers)

    return (
        <section>
            <div className="container">
                <div className='text-center mb-4'>
                    <MainHead title={bestSeller.checkOut} subTitle={bestSeller.OurBestSellers} />
                </div>
                <Menu items={bestSellers} />
            </div>
        </section>
    )
}

export default BestSellers
