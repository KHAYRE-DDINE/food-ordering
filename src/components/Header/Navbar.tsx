'use client'
import './Header.css'
import { Pages, Routes } from '@/constants/enums'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { Button, buttonVariants } from '@/components/ui/button'
import { Menu, XIcon } from 'lucide-react';
import { useParams, usePathname, useRouter } from 'next/navigation'
import { Translations } from '@/types/translations'

const NAV_TIMING_KEY = 'nav-click-timing';

const Navbar = ({ translation }: { translation: Translations }) => {
    const { locale } = useParams(); // Valid only inside components
    const localeValue = Array.isArray(locale) ? locale[0] : locale;
    const pathname = usePathname();
    const router = useRouter();
    const [openMenu, setOpenMenu] = useState(false);
    const navigationStartRef = useRef<{
        href: string;
        title: string;
        startedAt: number;
        from: string;
    } | null>(null);
    const { navbar } = translation

    const Links = [
        { href: Routes.MENU, title: navbar.menu },
        { href: Routes.ABOUT, title: navbar.about },
        { href: Routes.CONTACT, title: navbar.contact },
        { href: `${Routes.AUTH}/${Pages.LOGIN}`, title: navbar.login },
    ]

    useEffect(() => {
        const storedTiming = sessionStorage.getItem(NAV_TIMING_KEY);
        const pendingTiming = navigationStartRef.current ?? (storedTiming ? JSON.parse(storedTiming) : null);

        if (!pendingTiming || pendingTiming.href !== pathname) {
            return;
        }

        const duration = Math.round(performance.now() - pendingTiming.startedAt);
        console.log('[navigation timing] redirect completed', {
            link: pendingTiming.title,
            from: pendingTiming.from,
            to: pathname,
            durationMs: duration,
        });
        navigationStartRef.current = null;
        sessionStorage.removeItem(NAV_TIMING_KEY);
    }, [pathname]);

    const handleNavigationClick = (href: string, title: string) => {
        const timing = {
            href,
            title,
            startedAt: performance.now(),
            from: pathname,
        };

        navigationStartRef.current = timing;
        sessionStorage.setItem(NAV_TIMING_KEY, JSON.stringify(timing));
        console.log('[navigation timing] link clicked', {
            link: title,
            from: pathname,
            to: href,
        });
    };

    const prefetchRoute = (href: string) => {
        router.prefetch(href);
    };

    return (
        <nav className='flex-1 justify-start md:justify-end flex '>
            <Button variant={'secondary'} size='sm' className='md:hidden absolute top-6 left-1/2' onClick={() => setOpenMenu(!openMenu)}>
                <Menu className='!w-6 !h-6 ' />
            </Button>
            <ul className={`${openMenu ? 'left-0 z-[1000]' : '!-left-full'} navbar w-full h-full left-0 top-0 px-10 py-20 md:py-0 md:px-3 flex flex-col md:flex-row justify-start md:justify-end items-start md:items-center gap-6 lg:gap-10 fixed md:static bg-background rounded-full`}>
                <Button variant={'secondary'} size='sm' className='md:hidden absolute top-10 right-10 ' onClick={() => setOpenMenu(!openMenu)}>
                    <XIcon className='!w-6 !h-6' />
                </Button>
                {Links.map((link) => (
                    <Link href={`/${localeValue}/${link.href}`} key={link.href}
                        onClick={() => handleNavigationClick(`/${localeValue}/${link.href}`, link.title)}
                        onPointerEnter={() => prefetchRoute(`/${localeValue}/${link.href}`)}
                        onFocus={() => prefetchRoute(`/${localeValue}/${link.href}`)}
                        className={`${link.href === `${Routes.AUTH}/${Pages.LOGIN}` ? `
                            ${buttonVariants({ size: 'lg' })} !px-8 !rounded-full capitalize`
                            : 'text-accent hover:text-primary capitalize duration-200 '}
                            font-semibold ${pathname.startsWith(`/${localeValue}/${link.href}`) ? 'text-primary ' : 'text-accent'}`}
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
