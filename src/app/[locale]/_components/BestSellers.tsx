import MainHead from '@/components/main-heading';
import React from 'react';
import Menu from '../../../components/menu';
import getTrans from '@/lib/translation';
import { getBestSellers } from '@/server/db/products';
import { ProductWithRelations } from '@/types/product';
import { localizeProduct } from '@/lib/menu-localization';
import { Locale } from '@/i18n.config';

const BestSellers = async ({ locale }: { locale: Locale }) => {
    const [bestSellers, translation] = await Promise.all([
        getBestSellers(3) as Promise<ProductWithRelations[]>,
        getTrans(locale),
    ])
    const { home, menu } = translation
    const { bestSeller } = home

    return (
        <section id="best-sellers" className="py-12 scroll-mt-28">
            <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className='text-center mb-8'>
                    <MainHead title={bestSeller.checkOut} subTitle={bestSeller.OurBestSellers} />
                </div>
                <Menu
                    items={bestSellers.map((product) => localizeProduct(product, locale))}
                    locale={locale}
                    translation={menu}
                />
            </div>
        </section>
    )
}

export default BestSellers;
