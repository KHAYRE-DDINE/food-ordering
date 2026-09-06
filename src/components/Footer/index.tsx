import { getCurrentLocale } from '@/lib/getCurrentLocale'
import getTrans from '@/lib/translation'
import { Routes } from '@/constants/enums'
import { Mail, MapPin, Phone } from 'lucide-react'
import Link from 'next/link'
import React from 'react'


const Footer = async () => {
    const locale = await getCurrentLocale()
    const translation = await getTrans(locale)
    const { copyRight, navbar, home } = translation

    return (
        <footer className='border-t border-zinc-200 bg-zinc-950 py-10 text-white'>
            <div className='container grid gap-8 md:grid-cols-[1.2fr_0.8fr_1fr]'>
                <div>
                    <h2 className='text-2xl font-bold'>{translation.logo}</h2>
                    <p className='mt-3 max-w-sm text-sm leading-6 text-zinc-400'>
                        {home.hero.description}
                    </p>
                </div>
                <div>
                    <h3 className='font-semibold'>{navbar.menu}</h3>
                    <div className='mt-3 grid gap-2 text-sm text-zinc-400'>
                        <Link href={`/${locale}`} className='hover:text-white'>{navbar.home}</Link>
                        <Link href={`/${locale}/${Routes.MENU}`} className='hover:text-white'>{navbar.menu}</Link>
                        <Link href={`/${locale}/${Routes.ABOUT}`} className='hover:text-white'>{navbar.about}</Link>
                        <Link href={`/${locale}/${Routes.CONTACT}`} className='hover:text-white'>{navbar.contact}</Link>
                    </div>
                </div>
                <div>
                    <h3 className='font-semibold'>{home.contact.contactUs}</h3>
                    <div className='mt-3 grid gap-3 text-sm text-zinc-400'>
                        <p className='flex items-center gap-2'><MapPin className='h-4 w-4 text-primary' /> {home.contact.address}</p>
                        <p className='flex items-center gap-2'><Phone className='h-4 w-4 text-primary' /> {home.contact.phone}</p>
                        <p className='flex items-center gap-2'><Mail className='h-4 w-4 text-primary' /> {home.contact.emailValue}</p>
                    </div>
                </div>
            </div>
            <div className='container mt-8 border-t border-white/10 pt-5 text-sm text-zinc-500'>
                <p>{copyRight}</p>
            </div>
        </footer>
    )
}

export default Footer
