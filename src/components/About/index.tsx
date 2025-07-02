import { Routes } from "@/constants/enums"
import { getCurrentLocale } from "@/lib/getCurrentLocale"
import getTrans from "@/lib/translation"
import Image from "next/image"

// Simple heading component since MainHead is not available
const MainHead = ({ title, subTitle }: { title: string; subTitle: string }) => (
  <div className="text-center mb-12">
    <h1 className="text-5xl font-bold text-gray-900 mb-4 relative inline-block">
      {title}
      <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-primary rounded-full"></span>
    </h1>
    <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subTitle}</p>
  </div>
)

const About = async () => {
    const locale = await getCurrentLocale()
    const { home } = await getTrans(locale)
    const { about } = home
    const { ourStory, aboutUs, firstDescriptions, secondDescriptions, thirdDescriptions } = about

    return (
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white" id={Routes.ABOUT}>
      <div className="container mx-auto px-4">
        <MainHead title={aboutUs} subTitle={ourStory} />
        
        {/* First Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-24">
          <div className="lg:w-1/2 relative group">
            <div className="absolute -inset-4 bg-primary/10 rounded-3xl -z-10 transform rotate-1 group-hover:rotate-0 transition-transform duration-500"></div>
            <Image
              src='https://img.freepik.com/free-vector/boy-eating-vegetables-isolated-illustration_18591-83848.jpg'
              alt="Gourmet Dining"
              width={600}
              height={500}
              className="rounded-2xl shadow-xl transform group-hover:scale-105 transition-all duration-500"
            />
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">{about.firstTitle}</h2>
            <p className="text-gray-600 mb-6">{firstDescriptions.beginning}</p>
            <div className="space-y-4">
              {[
                { title: 'Gourmet Dining', desc: firstDescriptions.one },
                { title: 'Catering Services', desc: firstDescriptions.two },
                { title: 'Meal Prep & Delivery', desc: firstDescriptions.three },
                { title: 'Cooking Classes', desc: firstDescriptions.four },
                { title: 'Custom Menus', desc: firstDescriptions.five }
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <span className="text-primary font-bold">{index + 1}.</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{locale === 'en' ? item.title : ''}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-primary font-medium">{about.firstFoot}</p>
          </div>
        </div>

        {/* Second Section */}
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 mb-24">
          <div className="lg:w-1/2">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">{about.secondTitle}</h2>
            <p className="text-gray-600 mb-6">{secondDescriptions.beginning}</p>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: 'First-Time Discount', desc: secondDescriptions.one },
                { title: 'Family Feast Deals', desc: secondDescriptions.two },
                { title: 'Seasonal Specials', desc: secondDescriptions.three },
                { title: 'Loyalty Rewards', desc: secondDescriptions.four },
                { title: 'Event Catering', desc: secondDescriptions.five }
              ].map((item, index) => (
                <div key={index} className="bg-white p-5 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 border-l-4 border-primary">
                  <h3 className="font-semibold text-gray-900 mb-2">{locale === 'en' ? item.title : ''}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-primary font-medium">{about.secondFoot}</p>
          </div>
          <div className="lg:w-1/2 relative group">
            <div className="absolute -inset-4 bg-primary/10 rounded-3xl -z-10 transform -rotate-1 group-hover:rotate-0 transition-transform duration-500"></div>
            <Image
              src='https://img.freepik.com/free-vector/surprise-gift-concept-illustration_114360-30506.jpg'
              alt="Special Offers"
              width={600}
              height={500}
              className="rounded-2xl shadow-xl transform group-hover:scale-105 transition-all duration-500"
            />
          </div>
        </div>

        {/* Third Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/2 relative group">
            <div className="absolute -inset-4 bg-primary/10 rounded-3xl -z-10 transform rotate-1 group-hover:rotate-0 transition-transform duration-500"></div>
            <Image
              src='https://img.freepik.com/free-vector/chef-holding-tray-food_1020-664.jpg'
              alt="Our Promise"
              width={600}
              height={500}
              className="rounded-2xl shadow-xl transform group-hover:scale-105 transition-all duration-500"
            />
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">{about.thirdTitle}</h2>
            <p className="text-gray-600 mb-6">{thirdDescriptions.beginning}</p>
            <div className="space-y-4">
              {[
                { title: 'Farm to Table Freshness', desc: thirdDescriptions.one },
                { title: 'Diverse Menu Options', desc: thirdDescriptions.two },
                { title: 'Chef-Crafted Recipes', desc: thirdDescriptions.three },
                { title: 'Fast & Reliable Delivery', desc: thirdDescriptions.four },
                { title: 'Eco-Friendly Practices', desc: thirdDescriptions.five }
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <span className="text-primary font-bold">{index + 1}.</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{locale === 'en' ? item.title : ''}</h3>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-primary font-medium">{about.thirdFoot}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
