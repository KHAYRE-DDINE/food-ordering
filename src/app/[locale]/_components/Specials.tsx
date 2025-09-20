import Image from 'next/image'
import React from 'react'

const Specials = () => {
  return (
    <section className="section-gap">
    <div className="container">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 italic bg-clip-text text-transparent" style={{ backgroundImage: 'var(--primary-gradient)' }}>
        Special Offers
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          {
            title: 'Family Feast',
            description: 'Perfect for family gatherings. Get 20% off on orders above $50',
            image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1398&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            code: 'FAMILY20'
          },
          {
            title: 'Weekend Special',
            description: 'Enjoy 15% off on all orders during weekends',
            image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            code: 'WEEKEND15'
          },
          {
            title: 'First Order',
            description: 'New customer? Get 25% off on your first order',
            image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=1527&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            code: 'NEW25'
          }
        ].map((offer, index) => (
          <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="h-48 overflow-hidden">
              <Image
                src={offer.image} 
                alt={offer.title}
                width={400}
                height={192}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
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
                  Order Now
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