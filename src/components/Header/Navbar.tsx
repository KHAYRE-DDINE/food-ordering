'use client'
import { Routes } from '@/constants/enums'
import Link from 'next/link'
import React, { useState } from 'react'
import { Button, buttonVariants } from '@/components/ui/button'
import { Menu, X } from 'lucide-react';
import { useParams, usePathname, useRouter } from 'next/navigation'
import { Translations } from '@/types/translations'

const Navbar = ({ translation }: { translation: Translations }) => {
    const { locale } = useParams();
    const localeValue = Array.isArray(locale) ? locale[0] : locale;
    const pathname = usePathname();
    const router = useRouter();
    const [openMenu, setOpenMenu] = useState(false);
    const { navbar } = translation

    const Links = [
        { href: Routes.MENU, title: navbar.menu },
        { href: Routes.OFFERS, title: (navbar as Record<string, string>).offers || 'Offers' },
        { href: Routes.ORDERS, title: (navbar as Record<string, string>).orders || 'My Orders' },
        { href: Routes.ABOUT, title: navbar.about },
        { href: Routes.CONTACT, title: navbar.contact },
        { href: Routes.PROFILE, title: (navbar as Record<string, string>).account || 'Account' },
    ]

    return (
        <>
            {/* Desktop Navigation */}
            <nav className='hidden md:flex items-center gap-6 lg:gap-8'>
                {Links.map((link) => {
                    const isProfile = link.href === Routes.PROFILE;
                    const isActive = pathname.startsWith(`/${localeValue}/${link.href}`);

                    if (isProfile) {
                        return (
                            <Link
                                key={link.href}
                                href={`/${localeValue}/${link.href}`}
                                onPointerEnter={() => router.prefetch(`/${localeValue}/${link.href}`)}
                                className={`${buttonVariants({ size: 'sm' })} !px-5 !rounded-full capitalize font-semibold shadow-sm`}
                            >
                                {link.title}
                            </Link>
                        );
                    }

                    return (
                        <Link
                            key={link.href}
                            href={`/${localeValue}/${link.href}`}
                            onPointerEnter={() => router.prefetch(`/${localeValue}/${link.href}`)}
                            className={`text-sm font-semibold capitalize transition-colors duration-150 ${
                                isActive
                                    ? 'text-primary font-bold'
                                    : 'text-gray-600 hover:text-primary'
                            }`}
                        >
                            {link.title}
                        </Link>
                    );
                })}
            </nav>

            {/* Mobile Hamburger Toggle Button */}
            <Button
                variant='ghost'
                size='icon'
                className='md:hidden text-gray-700 hover:text-primary'
                onClick={() => setOpenMenu(true)}
                aria-label="Open Navigation Menu"
            >
                <Menu className='h-6 w-6' />
            </Button>

            {/* Mobile Drawer Backdrop & Menu */}
            {openMenu && (
                <div
                    className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm md:hidden"
                    onClick={() => setOpenMenu(false)}
                >
                    <div
                        className="fixed top-0 bottom-0 right-0 w-[280px] bg-white shadow-2xl p-6 flex flex-col justify-between"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div>
                            <div className="flex items-center justify-between pb-6 border-b border-gray-100">
                                <span className="font-extrabold text-xl text-primary">Menu</span>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setOpenMenu(false)}
                                    aria-label="Close menu"
                                >
                                    <X className="h-5 w-5 text-gray-500" />
                                </Button>
                            </div>

                            <ul className="flex flex-col gap-4 pt-6">
                                {Links.map((link) => {
                                    const isProfile = link.href === Routes.PROFILE;
                                    const isActive = pathname.startsWith(`/${localeValue}/${link.href}`);

                                    return (
                                        <li key={link.href}>
                                            <Link
                                                href={`/${localeValue}/${link.href}`}
                                                onClick={() => setOpenMenu(false)}
                                                className={`block py-2 text-base font-semibold transition-colors ${
                                                    isProfile
                                                        ? `${buttonVariants({ size: 'sm' })} w-full text-center mt-2`
                                                        : isActive
                                                        ? 'text-primary'
                                                        : 'text-gray-700 hover:text-primary'
                                                }`}
                                            >
                                                {link.title}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>

                        <div className="pt-6 border-t border-gray-100 text-xs text-gray-400 text-center">
                            Fasty Food © 2026
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Navbar
