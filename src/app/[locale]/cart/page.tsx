import React from 'react'
import Items from './_components/items'
import { Button } from '@/components/ui/button'
import { ShoppingBag, CreditCard } from 'lucide-react'
import Link from 'next/link'

const CartPage = async ({ params }: { params: Promise<{ locale: string }> }) => {
    const { locale } = await params
    return (
        <main className="min-h-[calc(100vh-193px)] bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-center gap-2 mb-10">
                    <ShoppingBag className="h-8 w-8 text-primary" />
                    <h1 className='text-4xl font-bold text-center text-gray-900'>
                        Your Shopping Cart
                    </h1>
                </div>
                
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                    <div className='lg:col-span-2 bg-white rounded-lg border border-gray-100 shadow-sm p-6'>
                        <h2 className='text-2xl font-semibold text-gray-800 mb-6'>Order Summary</h2>
                        <Items />
                    </div>
                    <div className='lg:sticky lg:top-28 h-fit rounded-lg border border-gray-100 bg-white p-6 shadow-sm'>
                        <h2 className='text-2xl font-bold text-gray-900'>Ready to order?</h2>
                        <p className='mt-2 text-sm leading-6 text-gray-500'>
                            Continue to checkout to add delivery details and place your order.
                        </p>
                        <Button asChild className='mt-6 h-12 w-full text-base font-semibold'>
                            <Link href={`/${locale}/checkout`}>
                                <CreditCard className='mr-2 h-5 w-5' />
                                Continue to checkout
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default CartPage
