"use client";
import { Routes } from '@/constants/enums'
import { selectCartItems } from '@/redux/features/cart/cartSlice'
import { useAppSelector } from '@/redux/hooks'
import { ShoppingCartIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { GetCartQuantity } from '../../lib/cart'

const Cart = () => {
    const cart = useAppSelector(selectCartItems)
    const cartQuantity = GetCartQuantity(cart)

    return (
        <Link href={Routes.CART} className='block relative group'>
            <span className='absolute -top-4 bg-primary start-4 w-5 h-5 rounded-full text-white text-center text-sm'>
                {cartQuantity}
            </span>
            <ShoppingCartIcon className='text-accent group-hover:text-primary duration-200 transition-colors !h-6 !w-6' />
        </Link>
    )
}

export default Cart
