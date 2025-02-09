'use client'
import { Button } from '@/components/ui/button'
import { deliveryFee, getSubTotal } from '@/lib/cart'
import { FormatCurrency } from '@/lib/Formatter'
import { RemoveItemFromForm, selectCartItems } from '@/redux/features/cart/cartSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { Trash2 } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect } from 'react'

const Items = () => {
    const cart = useAppSelector(selectCartItems)
    const dispatch = useAppDispatch()
    const subTotal = getSubTotal(cart)

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cart));
    }, [cart]);

    return (
        <div>
            {cart && cart.length > 0 ? (
                <>
                    <ul>
                        {cart.map((item) => (
                            <li key={item.id}>
                                <div className='flex flex-col md:flex-row gap-6 justify-between'>
                                    <div className='flex items-center gap-2'>
                                        <div className='relative w-24 h-24 flex items-center'>
                                            <Image
                                                src={item.image}
                                                className='object-contain rounded-full'
                                                alt={item.name}
                                                width={100}
                                                height={100}
                                            />
                                        </div>
                                        <div>
                                            <h4 className='font-semibold md:text-lg'>{item.name}</h4>
                                            <div className='relative'>
                                                {item.size && (
                                                    <span className='text-sm text-accent'>
                                                        Size: {item.size.name}
                                                    </span>
                                                )}
                                                {item.extra && item.extra.length > 0 && (
                                                    <div className='flex gap-1'>
                                                        <span>Extras:</span>
                                                        <ul>
                                                            {item.extra.map((extra) => (
                                                                <li key={extra.id}>
                                                                    <span className='text-sm text-accent'>
                                                                        {extra.name} {FormatCurrency(extra.price)}
                                                                    </span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                                <span className='absolute right-0 top-0 text-sm text-black'>
                                                    x{item.quantity}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex-1 flex items-center gap-4 justify-end'>
                                        <strong className='text-black '>
                                            {FormatCurrency(item.basePrice)}
                                        </strong>
                                        <Button
                                            onClick={() =>
                                                dispatch(RemoveItemFromForm({ id: item.id }))
                                            }
                                            variant='secondary'
                                            className='border'
                                        >
                                            <Trash2 />
                                        </Button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className='flex flex-col justify-end items-end pt-6'>
                        <span className='text-accent font-medium'>
                            Subtotal:
                            <strong className='text-black'>{FormatCurrency(subTotal)}</strong>
                        </span>
                        <span className='text-accent font-medium'>
                            Delivery:
                            <strong className='text-black'>
                                {FormatCurrency(deliveryFee)}
                            </strong>
                        </span>
                        <span className='text-accent font-medium'>
                            Total:
                            <strong className='text-black'>
                                {FormatCurrency(deliveryFee + subTotal)}
                            </strong>
                        </span>
                    </div>
                </>
            ) : (
                <p className='text-accent'>There are no items in your cart. Add some</p>
            )}
        </div >
    )
}

export default Items
