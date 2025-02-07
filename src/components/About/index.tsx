import MainHead from "@/components/main-heading"
import { Routes } from "@/constants/enums"
import { getCurrentLocale } from "@/lib/getCurrentLocale"
import getTrans from "@/lib/translation"
import Image from "next/image"

const About = async () => {
    const locale = await getCurrentLocale()
    const { home } = await getTrans(locale)
    const { about } = home
    const { ourStory, aboutUs, firstDescriptions, secondDescriptions, thirdDescriptions } = about

    return (
        <div className="section-gap" id={Routes.ABOUT}>
            <div className="text-center mb-4">
                <MainHead title={aboutUs} subTitle={ourStory} />
            </div>
            <div className="container grid gap-10">
                <div className="flex items-center justify-around gap-5 flex-row-reverse">
                    <div>
                        <Image
                            src='https://img.freepik.com/free-vector/boy-eating-vegetables-isolated-illustration_18591-83848.jpg?t=st=1738451704~exp=1738455304~hmac=04df03833ffcfaa37e5e49cd05921a794751d5faeae43ec09a6cbf3286c8d142&w=740'
                            alt="img-1" width={500} height={400} className="hover:scale-110 transition-all duration-500" />
                    </div>
                    <div className="text-accent max-w-md mx-auto mt-4 flex flex-col gap-4">
                        <h1 className="text-primary text-3xl font-bold uppercase tracking-wider">{about.firstTitle}</h1>
                        <div className="text-[15px] grid gap-3">
                            <p>{firstDescriptions.beginning}</p>
                            <p><span className="font-bold text-gray-800">{locale == "en" ? 'Gourmet Dining: ' : ''}</span> {firstDescriptions.one}</p>
                            <p><span className="font-bold text-gray-800">{locale == "en" ? 'Catering Services: ' : ''}</span>  {firstDescriptions.two}</p>
                            <p><span className="font-bold text-gray-800">{locale == "en" ? 'Meal Prep & Delivery: ' : ''}</span>  {firstDescriptions.three}</p>
                            <p><span className="font-bold text-gray-800">{locale == "en" ? 'Cooking Classes: ' : ''}</span>  {firstDescriptions.four}</p>
                            <p><span className="font-bold text-gray-800">{locale == "en" ? 'Custom Menus: ' : ''}</span>  {firstDescriptions.five}</p>
                            <span>{about.firstFoot}</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-around gap-5 ">
                    <div>
                        <Image
                            src='https://img.freepik.com/free-vector/combo-offer-concept-illustration_114360-6034.jpg?t=st=1738451765~exp=1738455365~hmac=987310b4f455ad4df76ed73e923dcfc6dbd01675df9f2d054021c30c1c3f81a4&w=740'
                            alt="img-1" width={500} height={500} className="hover:scale-110 transition-all duration-500" />
                    </div>
                    <div className="text-accent max-w-md mx-auto mt-4 flex flex-col gap-4">
                        <h1 className="tracking-wider text-primary text-3xl font-bold uppercase ">{about.secondTitle}</h1>
                        <div className="text-[15px] grid gap-3">
                            <p>{secondDescriptions.beginning}</p>
                            <p><span className="font-bold text-gray-800">{locale == "en" ? 'First-Time Discount: ' : ''}</span>  {secondDescriptions.one}</p>
                            <p><span className="font-bold text-gray-800">{locale == "en" ? 'Family Feast Deals: ' : ''}</span> {secondDescriptions.two}</p>
                            <p><span className="font-bold text-gray-800">{locale == "en" ? 'Seasonal Specials: ' : ''}</span>{secondDescriptions.three}</p>
                            <p><span className="font-bold text-gray-800">{locale == "en" ? 'Loyalty Rewards: ' : ''}</span> {secondDescriptions.four}</p>
                            <p><span className="font-bold text-gray-800">{locale == "en" ? 'Event Catering Discounts: ' : ''}</span> {secondDescriptions.five}</p>
                            <span>{about.secondFoot}</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-around gap-5 flex-row-reverse">
                    <div>
                        <Image
                            src='https://img.freepik.com/free-vector/delivery-guy-motor-scooter-wearing-mask_23-2148498576.jpg?t=st=1738452461~exp=1738456061~hmac=03760b4093f898d3ae46dc86822d4ac1f04993bb6eb49e8630d891091fff424f&w=740'
                            alt="img-1" width={500} height={500} className="hover:scale-110 transition-all duration-500" />
                    </div>
                    <div className="text-accent max-w-md mx-auto mt-4 flex flex-col gap-4">
                        <h1 className="tracking-wider text-primary text-3xl font-bold uppercase">{about.thirdTitle}</h1>
                        <div className="text-[15px] grid gap-3">
                            <p>{thirdDescriptions.beginning}</p>
                            <p><span className="font-bold text-gray-800">{locale == "en" ? 'Farm to Table Freshness: ' : ''}</span> {thirdDescriptions.one}</p>
                            <p><span className="font-bold text-gray-800">{locale == "en" ? 'Diverse Menu Options: ' : ''}</span> {thirdDescriptions.two}</p>
                            <p><span className="font-bold text-gray-800">{locale == "en" ? 'Chef-Crafted Recipes: ' : ''}</span> {thirdDescriptions.three}</p>
                            <p><span className="font-bold text-gray-800">{locale == "en" ? 'Fast & Reliable Delivery: ' : ''}</span> {thirdDescriptions.four}</p>
                            <p><span className="font-bold text-gray-800">{locale == "en" ? 'Eco-Friendly Practices: ' : ''}</span> {thirdDescriptions.five}</p>
                            <span>{about.thirdFoot}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About
