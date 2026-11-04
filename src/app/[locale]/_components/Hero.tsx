import { buttonVariants } from '@/components/ui/button'
import { Routes } from '@/constants/enums'
import getTrans from '@/lib/translation'
import { Locale } from '@/i18n.config'
import { ArrowRight, Sparkles, ChefHat } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Hero = async ({ locale }: { locale: Locale }) => {
    const { home } = await getTrans(locale)
    const { hero } = home

    return (
        <section className='py-8 sm:py-12 lg:py-16'>
            <div className='container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center'>
                    <div className='space-y-6 text-center lg:text-left'>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-bold tracking-wide">
                            <Sparkles className="h-4 w-4" />
                            <span>Authentic Fresh Taste</span>
                        </div>

                        <h1 className='text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight leading-[1.1]'>
                            {hero.title}
                        </h1>

                        <p className='text-gray-600 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed'>
                            {hero.description}
                        </p>

                        <div className='flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2'>
                            <Link
                                href={`/${locale}/${Routes.MENU}`}
                                className={`${buttonVariants({ size: 'lg' })} !px-8 !h-12 !rounded-full font-bold shadow-md gap-2`}
                            >
                                <span>{hero.orderNow}</span>
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                            <Link
                                href={`/${locale}/${Routes.ABOUT}`}
                                className='inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-gray-700 hover:text-primary transition-colors'
                            >
                                <ChefHat className="h-4 w-4 text-primary" />
                                <span>{hero.learnMore}</span>
                            </Link>
                        </div>
                    </div>

                    <div className='relative w-full h-[280px] sm:h-[380px] lg:h-[460px] rounded-3xl overflow-hidden shadow-xl border border-gray-100 bg-gray-50'>
                        <Image
                            src='/assets/images/menu/hero-chicken-cutlets.jpg'
                            alt='Delicious Restaurant Dishes'
                            className='object-cover hover:scale-105 transition-transform duration-500'
                            loading='eager'
                            priority
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero
