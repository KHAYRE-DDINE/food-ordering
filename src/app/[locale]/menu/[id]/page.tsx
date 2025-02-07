'use client'
import { buttonVariants } from "@/components/ui/button"
import { AddToCart } from "@/redux/features/cart/cartSlice"
import { useAppDispatch } from "@/redux/hooks"
import { ProductWithRelations } from "@/types/product"
import Image from "next/image"

const ItemDetails = ({ item }: { item: ProductWithRelations }) => {
    const dispatch = useAppDispatch()


    const handleCartItem = () => {
        dispatch(
            AddToCart({
                id: item.id,
                basePrice: item.basePrice,
                image: item.image,
                name: item.name,

            })
        )
    }

    return (
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 py-10'>
            <div className="image"></div>
            <div className="details leading-7">
                <h1 className='text-primary text-4xl font-bold my-7'>Margaret</h1>
                <p className='text-accent text-sm font-bold w-[340px]'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod, voluptatum?</p>
                <div className="leading-none">
                    <span className='text-accent text-[14px] font-bold mt-5 mb-4 block'>Number of Orders:</span>
                    <div className='flex items-center justify-start gap-4'>
                        <button className='font-bold bg-slate-200 flex items-center justify-center shadow-md w-[35px] h-[35px] text-lg'>-</button>
                        <span className='font-bold text-lg text-gray-500'>0</span>
                        <button className='font-bold bg-slate-200 flex items-center justify-center shadow-md w-[35px] h-[35px] text-lg'>+</button>
                    </div>
                </div>
                <button
                    className={`${buttonVariants({ size: 'lg' })} p-2 capitalize mt-5 !rounded-full`}
                    onClick={handleCartItem}
                >order now</button>
                <div className="choose-image flex items-center justify-start gap-2 mt-6">
                    <div className="overflow-hidden border-[3px] border-primary rounded-full cursor-pointer">
                        <Image
                            src='https://plus.unsplash.com/premium_photo-1679924471091-f7cd7ad90ddf?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                            alt="img-1" width={80} height={90} className="hover:scale-110 transition-all duration-500" />
                    </div>
                    <div className="overflow-hidden border-[3px] border-primary rounded-full cursor-pointer">
                        <Image
                            src='https://plus.unsplash.com/premium_photo-1679924471091-f7cd7ad90ddf?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                            alt="img-1" width={80} height={90} className="hover:scale-110 transition-all duration-500" />
                    </div>
                    <div className="overflow-hidden border-[3px] border-primary rounded-full cursor-pointer">
                        <Image
                            src='https://plus.unsplash.com/premium_photo-1679924471091-f7cd7ad90ddf?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                            alt="img-1" width={80} height={90} className="hover:scale-110 transition-all duration-500" />
                    </div>
                    <div className="overflow-hidden border-[3px] border-primary rounded-full cursor-pointer">
                        <Image
                            src='https://plus.unsplash.com/premium_photo-1679924471091-f7cd7ad90ddf?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                            alt="img-1" width={80} height={90} className="hover:scale-110 transition-all duration-500" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ItemDetails
