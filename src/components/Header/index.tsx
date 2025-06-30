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
        <div
            className='header fixed w-full h-[85px] bg-red z-[4356432] flex justify-center items-center' style={{
                boxShadow: "-1px 5px 20px #ccc"
            }}>
            <div className={`container fixed top-0 h-[85px] z-[98765678] flex justify-between items-center py-2 px-5 ${locale == 'en' ? "pr-6" : "pl-6"} gap-2`}>
                <Link href={`/${locale}`} className="logo text-primary font-bold text-2xl">
                    <span className='animate-bounce'>🍕</span> {translation.logo}
                </Link>
                <Navbar translation={translation} />
                <SwitchLanguage />
                <Cart />
            </div>
        </div>
    )
}

export default Header;
