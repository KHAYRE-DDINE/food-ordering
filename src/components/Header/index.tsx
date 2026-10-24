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
        <div
            className='header fixed w-full h-[85px] bg-white z-[4356432] flex justify-center items-center' style={{
                boxShadow: "-1px 5px 20px #ccc"
            }}>
            <div className={`container fixed top-0 h-[85px] z-[98765678] flex justify-between items-center py-2 px-5 ${locale == 'en' ? "pr-6" : "pl-6"} gap-3`}>
                <Link href={`/${locale}`} className="logo text-primary font-bold text-2xl shrink-0">
                    <span className='animate-bounce'>🍕</span> {translation.logo}
                </Link>
                <Navbar translation={translation} />
                <div className="flex items-center gap-4">
                    <FavoritesIcon />
                    <Cart />
                    <SwitchLanguage />
                </div>
            </div>
        </div>
    )
}

export default Header;
