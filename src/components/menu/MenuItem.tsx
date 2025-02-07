import './Menu.css'
import { FormatCurrency } from '@/lib/Formatter'
import React from 'react'
import AddButton from './add-to-cart'
import Image from 'next/image'
import { ProductWithRelations } from '@/types/product'
import { Routes } from '@/constants/enums'
import Link from 'next/link'

function MenuItem({ item }: { item: ProductWithRelations }) {
    return (
        <Link key={item.id} href={`${Routes.MENU}/${item.id}`}>
            <div className='menu-item h-full p-4 rounded-md bg-gray-200'>
                <div className="relative w-full h-48 mx-auto overflow-hidden">
                    <Image src={item.image} className='object-fill' alt={item.name} fill />
                </div>
                <div className='flex justify-between items-center mb-4'>
                    <h4 className='font-semibold text-xl my-3'>{item.name}</h4>
                    <strong className='text-accent'>{FormatCurrency(item.basePrice)}</strong>
                </div>
                <p className='text-gray-500 text-sm line-clamp-1'>{item.description}</p>
                <AddButton item={item} />
            </div>
        </Link>
    )
}

export default MenuItem
