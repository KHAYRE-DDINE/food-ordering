import React from 'react'
import Navbar from './Navbar'
import Link from 'next/link';
import getTrans from '@/lib/translation';
import SwitchLanguage from './SwitchLanguage';
import Cart from './Cart';
import FavoritesIcon from './FavoritesIcon';
import { Locale } from '@/i18n.config';

const Header = async ({ locale }: { locale: Locale }) => {
    const translation = await getTrans(locale)

    return (
        <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
            <div className="container max-w-6xl mx-auto h-20 flex items-center justify-between px-4 sm:px-6 lg:px-8 gap-4">
                <Link href={`/${locale}`} className="logo text-primary font-black text-2xl flex items-center gap-1.5 shrink-0 tracking-tight">
                    <span className="text-2xl">🍕</span>
                    <span>{translation.logo}</span>
                </Link>

                <Navbar translation={translation} />

                <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                    <FavoritesIcon />
                    <Cart />
                    <SwitchLanguage />
                </div>
            </div>
        </header>
    )
}

export default Header;
