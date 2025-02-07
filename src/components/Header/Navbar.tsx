'use client'
import './Header.css'
import { Pages, Routes } from '@/constants/enums'
import Link from 'next/link'
import React, { useState } from 'react'
import { Button, buttonVariants } from '@/components/ui/button'
import { Menu, XIcon } from 'lucide-react';
import { useParams, usePathname } from 'next/navigation'
import { Translations } from '@/types/translations'

const Navbar = ({ translation }: { translation: Translations }) => {
    const { locale } = useParams(); // Valid only inside components
    const pathname = usePathname();
    const [openMenu, setOpenMenu] = useState(false);
    const { navbar } = translation

    const Links = [
        { id: crypto.randomUUID(), href: Routes.MENU, title: navbar.menu },
        { id: crypto.randomUUID(), href: Routes.ABOUT, title: navbar.about },
        { id: crypto.randomUUID(), href: Routes.CONTACT, title: navbar.contact },
        { id: crypto.randomUUID(), href: `${Routes.AUTH}/${Pages.LOGIN}`, title: navbar.login },
    ]

    return (
        <nav className='flex-1 justify-start lg:justify-end flex '>
            <Button variant={'secondary'} size='sm' className='lg:hidden' onClick={() => setOpenMenu(!openMenu)}>
                <Menu className='!w-6 !h-6 ' />
            </Button>
            <ul className={`${openMenu ? 'left-0 z-50' : '-left-full'} navbar w-full h-full left-0 top-0 px-10 py-20 lg:p-0 flex flex-col lg:flex-row justify-start lg:justify-end items-start lg:items-center gap-10 fixed lg:static  bg-background`}>
                <Button variant={'secondary'} size='sm' className='lg:hidden absolute top-10 right-10 ' onClick={() => setOpenMenu(!openMenu)}>
                    <XIcon className='!w-6 !h-6' />
                </Button>
                {Links.map((link) => (
                    <Link href={`/${locale}/${link.href}`} key={link.id}
                        className={`${link.href === `${Routes.AUTH}/${Pages.LOGIN}` ? `
                            ${buttonVariants({ size: 'lg' })} !px-8 !rounded-full capitalize`
                            : 'text-accent hover:text-primary capitalize duration-200 '}
                            font-semibold ${pathname.startsWith(`/${locale}/${link.href}`) ? 'text-primary ' : 'text-accent'}`}
                    >
                        <span></span>
                        <span></span>
                        {link.title}
                    </Link>
                ))}
            </ul>
        </nav>
    )
}

export default Navbar
