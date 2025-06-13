import React from 'react'
import Items from './_components/items'
import Checkpoint from './_components/checkout'

const CartItems = () => {
    return (
        <div>
            <div className="container mt-12" style={{ minHeight: 'calc(100vh - 193px)' }}>
                <h1 className='text-primary italic font-bold text-center text-4xl mb-10'>Cart</h1>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
                    <Items />
                    <Checkpoint />
                </div>
            </div>
        </div>
    )
}

export default CartItems
