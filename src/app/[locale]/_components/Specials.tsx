import Image from 'next/image'
import React from 'react'
import getTrans from '@/lib/translation'
import { Locale } from '@/i18n.config'
import Link from 'next/link'

const images = [
  '/assets/images/menu/special-family-feast.jpg',
  '/assets/images/menu/special-weekend.jpg',
  '/assets/images/menu/special-first-order.jpg',
]

const Specials = async ({ locale }: { locale: Locale }) => {
  const { home } = await getTrans(locale)
  const { specials } = home

  return (
    <section className="py-12 bg-gray-50/60 border-b border-gray-100">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-primary font-bold text-xs uppercase tracking-wider">
            Special Deals
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-1">
            {specials.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {specials.offers.map((offer, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col group"
            >
              <div className="h-48 overflow-hidden bg-gray-100 relative">
                <Image
                  src={images[index]}
                  alt={offer.title}
                  width={400}
                  height={192}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  priority={index < 2}
                />
              </div>
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">{offer.title}</h3>
                  <p className="text-gray-600 mb-6 text-sm leading-relaxed">{offer.description}</p>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                  <span className="px-3 py-1 bg-primary text-white text-xs font-mono font-bold rounded-full">
                    {offer.code}
                  </span>
                  <Link
                    href={`/${locale}/offers`}
                    className="text-primary font-semibold text-sm hover:underline flex items-center gap-1"
                  >
                    <span>{specials.orderNow}</span>
                    <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Specials;
