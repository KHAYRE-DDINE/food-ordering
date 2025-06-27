'use client';

import React from 'react'
import MenuItem from './MenuItem'
import { ProductWithRelations } from '@/types/product'

interface MenuProps {
  items: ProductWithRelations[]
}

const Menu = ({ items }: MenuProps) => {
  return (
      <div className="lg:container mx-4 my-6">
        <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 lg:gap-9 text-center'>
          {items.map((item) => (
            <MenuItem key={item.id} item={item} />
          ))}
        </ul>
      </div>
  )
}

export default Menu