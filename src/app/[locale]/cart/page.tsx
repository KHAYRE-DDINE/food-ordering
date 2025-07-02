import React from 'react'
import Items from './_components/items'
import Checkpoint from './_components/checkout'
import { ShoppingBag } from 'lucide-react'

const CartPage = () => {
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
                    <div className='lg:col-span-2 bg-white rounded-xl shadow-sm p-6'>
                        <h2 className='text-2xl font-semibold text-gray-800 mb-6'>Order Summary</h2>
                        <Items />
                    </div>
                    <div className='lg:sticky lg:top-8 h-fit'>
                        <Checkpoint />
                    </div>
                </div>
            </div>
        </main>
    )
}

export default CartPage
