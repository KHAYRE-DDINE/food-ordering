"use client";
import { Routes } from '@/constants/enums'
import { selectCartItems } from '@/redux/features/cart/cartSlice'
import { useAppSelector } from '@/redux/hooks'
import { ShoppingCartIcon } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React from 'react'
import { GetCartQuantity } from '../../lib/cart'

const Cart = () => {
    const cart = useAppSelector(selectCartItems)
    const { locale } = useParams<{ locale: string }>()
    const cartQuantity = GetCartQuantity(cart)

    return (
        <Link href={`/${locale}/${Routes.CART}`} className='block relative group rounded-md border border-zinc-200 bg-white p-2 transition hover:border-primary'>
            <span className='absolute -top-2 -right-2 bg-primary start-auto w-5 h-5 rounded-full text-zinc-950 text-center text-xs font-bold leading-5'>
                {cartQuantity}
            </span>
            <ShoppingCartIcon className='text-accent group-hover:text-primary duration-200 transition-colors !h-6 !w-6' />
        </Link>
    )
}

export default Cart
