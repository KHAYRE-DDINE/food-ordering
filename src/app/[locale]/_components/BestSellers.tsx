import MainHead from '@/components/main-heading';
import React from 'react';
import Menu from '../../../components/menu';
import { getCurrentLocale } from '@/lib/getCurrentLocale';
import getTrans from '@/lib/translation';
import { getBestSellers } from '@/server/db/products';
import { ProductWithRelations } from '@/types/product';

const BestSellers = async () => {
    const bestSellers: ProductWithRelations[] = await getBestSellers(4)
    const locale = await getCurrentLocale()
    const { home } = await getTrans(locale) 
    const { bestSeller } = home

    return (
        <section>
            <div className="">
                <div className='text-center mb-4'>
                    <MainHead title={bestSeller.checkOut} subTitle={bestSeller.OurBestSellers} />
                </div>
                <Menu items={bestSellers} />
            </div>
        </section>
    )
}

export default BestSellers
