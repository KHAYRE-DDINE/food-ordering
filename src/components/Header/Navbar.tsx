'use client'
import './Header.css'
import { Pages, Routes } from '@/constants/enums'
import Link from 'next/link'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, XIcon } from 'lucide-react';
import { useParams, usePathname } from 'next/navigation'
import { Translations } from '@/types/translations'

const Navbar = ({ translation }: { translation: Translations }) => {
    const { locale } = useParams(); // Valid only inside components
    const pathname = usePathname();
    const [openMenu, setOpenMenu] = useState(false);
    const { navbar } = translation

    const Links = [
        { id: 'menu', href: Routes.MENU, title: navbar.menu },
        { id: 'about', href: Routes.ABOUT, title: navbar.about },
        { id: 'contact', href: Routes.CONTACT, title: navbar.contact },
        { id: 'admin', href: Routes.ADMIN, title: navbar.admin },
        { id: 'login', href: `${Routes.AUTH}/${Pages.LOGIN}`, title: navbar.login },
    ]

    return (
        <nav className='flex-1 justify-start md:justify-end flex '>
            <Button variant={'secondary'} size='sm' className='md:hidden absolute top-6 left-1/2' onClick={() => setOpenMenu(!openMenu)}>
                <Menu className='!w-6 !h-6 ' />
            </Button>
            <ul className={`${openMenu ? 'left-0 z-[1000]' : '!-left-full'} navbar w-full h-full left-0 top-0 px-10 py-20 md:py-0 md:px-3 flex flex-col md:flex-row justify-start md:justify-end items-start md:items-center gap-4 lg:gap-6 fixed md:static bg-background md:bg-transparent rounded-none md:rounded-full`}>
                <Button variant={'secondary'} size='sm' className='md:hidden absolute top-10 right-10 ' onClick={() => setOpenMenu(!openMenu)}>
                    <XIcon className='!w-6 !h-6' />
                </Button>
                {Links.map((link) => (
                    <Link href={`/${locale}/${link.href}`} key={link.id}
                        className={`nav-link ${link.href === `${Routes.AUTH}/${Pages.LOGIN}` ? 'nav-link-cta' : ''}
                            ${pathname.startsWith(`/${locale}/${link.href}`) ? 'nav-link-active' : ''}`}
                        onClick={() => setOpenMenu(false)}
                    >
                        {link.title}
                    </Link>
                ))}
            </ul>
        </nav>
    )
}

export default Navbar
