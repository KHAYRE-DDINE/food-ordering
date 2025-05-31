import { Routes } from '@/constants/enums'
import './contact.css'
import MainHead from '../main-heading'
import { getCurrentLocale } from '@/lib/getCurrentLocale'
import getTrans from '@/lib/translation'
import Link from 'next/link'
import { buttonVariants } from '../ui/button'
import Image from 'next/image'


const Contact = async () => {
    const locale = await getCurrentLocale()
    const { home } = await getTrans(locale)
    const { contact } = home


    return (
        <div className='section-gap' id={Routes.CONTACT}>
            <div className="text-center mb-9">
                <MainHead title={contact.contactUs} subTitle={contact["Don't Hesitate"]} />
            </div>
            <div className="container">
                <div className='grid grid-cols-1 lg:grid-cols-2 mt-[80px] relative'>
                    <div className="relative image w-[400px] h-[400px]">
                        {/* <img src="/public/assets/images/women-food.jpg" alt="woman" className="object-contain" /> */}
                        <Image src={"https://img.freepik.com/free-vector/retro-cartoon-internet-stickers-collection_23-2151023117.jpg?t=st=1739445838~exp=1739449438~hmac=4cbca2e87e5ae50b8da8454611890ebbfa221e34d0576ff20fa1ea1d209f76b3&w=740"}
                            alt='woman' className='object-contain' layout="fill"
                        />
                    </div>
                    <div className="form">
                        <div className='grid grid-cols-2 gap-4 '>
                            <div>
                                <h3 className='text-accent font-bold italic text-sm'>PHONE:</h3>
                                <span className='text-primary text-md font-bold'>+2176371380</span>
                            </div>
                            <div>
                                <h3 className='text-accent font-bold italic text-sm'>EMAIL:</h3>
                                <Link href='mail:ahrarkhirdin@gmail.com' className='text-primary text-md font-bold'>ahrarkhirdin@gmail.com</Link>
                            </div>
                        </div>
                        <form action="" className='flex flex-col gap-6 mt-9'>
                            <fieldset >
                                <input type="text" name="name" id="name"
                                    className='input-form' placeholder=''
                                />
                                <label htmlFor="name">name</label>
                            </fieldset>
                            <fieldset >
                                <input type="email" name="email" id="email" className='input-form' placeholder=''
                                />
                                <label htmlFor="email">email</label>
                            </fieldset>
                            <fieldset >
                                <textarea name="message" id="message"
                                    className='input-form !h-[150px] resize-none' placeholder=''
                                ></textarea>
                                <label htmlFor="message">message</label>
                            </fieldset>
                            <input type="submit" value="Send Message"
                                className={`${buttonVariants({ size: 'lg' })} rounded-full text-accent  cursor-pointer`}
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact
