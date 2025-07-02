'use client'
import { Button } from '@/components/ui/button'
import { deliveryFee, getSubTotal } from '@/lib/cart'
import { FormatCurrency } from '@/lib/Formatter'
import { RemoveItemFromForm, selectCartItems } from '@/redux/features/cart/cartSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { Trash2, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect } from 'react'

const Items = () => {
    const cart = useAppSelector(selectCartItems)
    const dispatch = useAppDispatch()
    const subTotal = getSubTotal(cart)

    useEffect(() => {
        sessionStorage.setItem('cartItems', JSON.stringify(cart));
    }, [cart]);

    if (!cart || cart.length === 0) {
        return (
            <div className='text-center py-12'>
                <ShoppingCart className='mx-auto h-12 w-12 text-gray-400' />
                <h3 className='mt-2 text-sm font-medium text-gray-900'>Your cart is empty</h3>
                <p className='mt-1 text-sm text-gray-500'>Start adding some delicious items to your cart.</p>
            </div>
        )
    }

    return (
        <div className='space-y-6'>
            <ul className='space-y-6 divide-y divide-gray-100'>
                {cart.map((item) => (
                    <li key={item.id} className='pt-6 first:pt-0'>
                        <div className='flex flex-col sm:flex-row gap-4 justify-between'>
                            <div className='flex items-start gap-4 flex-1'>
                                <div className='relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-50'>
                                    <Image
                                        src={item.image}
                                        className='object-cover w-full h-full'
                                        alt={item.name}
                                        width={80}
                                        height={80}
                                    />
                                </div>
                                <div className='flex-1 min-w-0'>
                                    <h4 className='font-semibold text-gray-900 text-lg'>{item.name}</h4>
                                    <div className='mt-1 space-y-1'>
                                        {item.size && (
                                            <p className='text-sm text-gray-600'>
                                                Size: <span className='font-medium'>{item.size.name}</span>
                                            </p>
                                        )}
                                        {item.extra && item.extra.length > 0 && (
                                            <div className='text-sm'>
                                                <p className='text-gray-600'>Extras:</p>
                                                <ul className='space-y-1 mt-1'>
                                                    {item.extra.map((extra) => (
                                                        <li key={extra.id} className='text-gray-600 flex items-center gap-1'>
                                                            <span>•</span>
                                                            <span>{extra.name} (+{FormatCurrency(extra.price)})</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className='flex items-center justify-between sm:justify-end gap-4 sm:w-48'>
                                <div className='flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-900 font-medium'>
                                    ×{item.quantity}
                                </div>
                                <div className='text-right'>
                                    <p className='font-semibold text-gray-900'>{FormatCurrency(item.basePrice)}</p>
                                </div>
                                <Button
                                    onClick={() => dispatch(RemoveItemFromForm({ id: item.id }))}
                                    variant='ghost'
                                    size='icon'
                                    className='text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full'
                                    aria-label='Remove item'
                                >
                                    <Trash2 className='h-4 w-4' />
                                </Button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            <div className='mt-8 pt-6 border-t border-gray-200 space-y-3'>
                <div className='flex justify-between text-base'>
                    <span className='text-gray-600'>Subtotal</span>
                    <span className='font-medium text-gray-900'>{FormatCurrency(subTotal)}</span>
                </div>
                <div className='flex justify-between text-base'>
                    <span className='text-gray-600'>Delivery</span>
                    <span className='font-medium text-gray-900'>{FormatCurrency(deliveryFee)}</span>
                </div>
                <div className='flex justify-between text-lg font-bold mt-4 pt-4 border-t border-gray-200'>
                    <span>Total</span>
                    <span className='text-primary'>{FormatCurrency(deliveryFee + subTotal)}</span>
                </div>
            </div>
        </div>
    )
}

export default Items
