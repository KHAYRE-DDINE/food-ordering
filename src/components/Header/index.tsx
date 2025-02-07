import React from 'react'
import Navbar from './Navbar'
import Link from 'next/link';
import { getCurrentLocale } from '@/lib/getCurrentLocale';
import getTrans from '@/lib/translation';
import SwitchLanguage from './SwitchLanguage';
import Cart from './Cart';

const Header = async () => {
    const locale = await getCurrentLocale()
    const translation = await getTrans(locale)


    return (
        <div className='header'>
            <div className="container flex justify-between items-center py-5 gap-2">
                <Link href={`/${locale}`} className="logo text-primary font-bold text-2xl">
                    🍕 {translation.logo}
                </Link>
                <Navbar translation={translation} />
                <SwitchLanguage />
                <Cart />
            </div>
        </div>
    )
}

export default Header;
