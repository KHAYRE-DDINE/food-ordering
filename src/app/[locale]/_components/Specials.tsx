import Image from 'next/image'
import React from 'react'
import getTrans from '@/lib/translation'
import { Locale } from '@/i18n.config'

const images = [
  '/assets/images/menu/special-family-feast.jpg',
  '/assets/images/menu/special-weekend.jpg',
  '/assets/images/menu/special-first-order.jpg',
]

const Specials = async ({ locale }: { locale: Locale }) => {
  const { home } = await getTrans(locale)
  const { specials } = home

  return (
    <section className="section-gap">
    <div className="container">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 italic bg-clip-text text-transparent" style={{ backgroundImage: 'var(--primary-gradient)' }}>
        {specials.title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {specials.offers.map((offer, index) => (
          <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="h-48 overflow-hidden">
              <Image
                src={images[index]}
                alt={offer.title}
                width={400}
                height={192}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                style={{ width: "100%", height: "auto", minHeight: "100%" }}
                priority={index < 2} // Optional: prioritize loading first 2 images
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 text-primary">{offer.title}</h3>
              <p className="text-gray-600 mb-4">{offer.description}</p>
              <div className="flex justify-between items-center">
                <span className="px-3 py-1 bg-primary text-white text-sm font-medium rounded-full">
                  {offer.code}
                </span>
                <button className="text-primary font-medium hover:underline">
                  {specials.orderNow}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
  )
}

export default Specials
