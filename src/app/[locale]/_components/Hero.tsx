import { buttonVariants } from '@/components/ui/button'
import { Routes } from '@/constants/enums'
import { getCurrentLocale } from '@/lib/getCurrentLocale'
import getTrans from '@/lib/translation'
import { ArrowRightCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Hero = async () => {
    const locale = await getCurrentLocale()
    const { home } = await getTrans(locale)
    const { hero } = home

    return (
        <section className='section-gap'>
            <div className='container grid grid-cols-1 md:grid-cols-2 gap-3'>
                <div className='md:py-12'>
                    <h1 className='font-bold text-4xl'>{hero.title}</h1>
                    <p className='text-accent py-4'>{hero.description}</p>
                    <div className='flex items-center gap-4'>
                        <Link href={`/${Routes.MENU}`} className={`${buttonVariants({ size: 'lg' })} space-x-2 !px-4 !rounded-full uppercase`}>
                            {hero.orderNow}
                            <ArrowRightCircle />
                        </Link>
                        <Link href={`/${Routes.ABOUT}`} className={`text-black flex gap-2 hover:text-primary duration-200 transition-colors font-semibold`}>
                            {hero.learnMore}
                            <ArrowRightCircle />
                        </Link>
                    </div>
                </div>

                <div className='relative hidden md:block w-[100%] h-[280px]'>
                    <Image src='https://img.freepik.com/free-photo/black-plate-vegetables-chicken-cutlets_114579-86324.jpg?t=st=1739714173~exp=1739717773~hmac=568f3808a890ee08770e87005cb7a54727bbcdf6ad3e27f23182cb9765f87810&w=740'
                        alt='Pizza' className='object-contain' loading='eager' priority fill
                    />
                </div>
            </div>
        </section>
    )
}

export default Hero
