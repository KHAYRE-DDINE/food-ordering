'use client'
import './Menu.css'
import { FormatCurrency } from '@/lib/Formatter'
import React from 'react'
import AddButton from './add-to-cart'
import Image from 'next/image'
import { ProductWithRelations } from '@/types/product'
import { Routes } from '@/constants/enums'
import Link from 'next/link'
import { motion } from "motion/react"

function MenuItem({ item }: { item: ProductWithRelations }) {
    return (

        <motion.div
            initial={{ opacity: 0, y: 20, scale: 1 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: .4, delay: .2 }}
            className='menu-item h-full p-4 rounded-md bg-gray-200 hover:shadow-2xl shadow-[#000000b3] duration-75'>
            <div className="relative w-full h-48 mx-auto overflow-hidden">
                <Image src={item.image} className='object-fill' alt={item.name} fill />
            </div>
            <div className='flex justify-between items-center mb-4'>
                <Link key={item.id} href={`${Routes.MENU}/${item.id}`} prefetch>
                    <h4 className='font-semibold text-xl my-3 hover:underline'>{item.name}</h4>
                </Link>
                <strong className='text-accent'>{FormatCurrency(item.basePrice)}</strong>
            </div>
            <p className='text-gray-500 text-sm line-clamp-1'>{item.description}</p>
            <AddButton item={item} />
        </motion.div>

    )
}

export default MenuItem
