'use client';

import React from 'react'
import MenuItem from './MenuItem'
import { ProductWithRelations } from '@/types/product'
import { LanguageType } from '@/i18n.config'
import { Translations } from '@/types/translations'
import { Languages } from '@/constants/enums'
import { defaultMenuTranslation } from '@/lib/menu-localization'

export interface MenuProps {
  items: ProductWithRelations[]
  locale?: LanguageType
  translation?: Translations['menu']
}

const Menu = ({
  items,
  locale = Languages.ENGLISH,
  translation = defaultMenuTranslation,
}: MenuProps) => {
  return (
      <div className="my-6">
        <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-9 text-center'>
          {items.map((item) => (
            <MenuItem key={item.id} item={item} locale={locale} translation={translation} />
          ))}
        </ul>
      </div>
  )
}

export default Menu
