'use client'
import { buttonVariants } from "@/components/ui/button"
import Loading from "@/lib/Loading"
import { AddToCart, selectCartItems } from "@/redux/features/cart/cartSlice"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { ProductWithRelations } from "@/types/product"
import { useEffect, useState } from "react"
import Image from "next/image"
import { ChooseQuantity, Extras, PickSize } from "./add-to-cart"
import { Extra, ProductSizes, Size } from "@prisma/client"
import { getItemQuantity, getTotalAmount } from "@/lib/cart"
import { Label } from "@radix-ui/react-label"
import { FormatCurrency } from "@/lib/Formatter"

const Details = ({ item }: { item: ProductWithRelations }) => {
    const dispatch = useAppDispatch()
    const cart = useAppSelector(selectCartItems)
    const [loading, setLoading] = useState(false)
    const defaultSize = cart.find((product) => product.id == item.id)?.size || item.sizes.find((size) => size.name === ProductSizes.SMALL)
    const defaultExtra = cart.find((element) => element.id === item.id)?.extra || []
    const [selectedSize, setSelectedSize] = useState<Size>(defaultSize!)
    const [selectedExtras, setSelectedExtras] = useState<Extra[]>(defaultExtra)
    const quantity = getItemQuantity(item.id, cart)
    // const [itemQuantity, setQuantity] = useState<number>(quantity)
    const totalAmount = getTotalAmount(cart)

    const handleCartItem = () => {
        dispatch(
            AddToCart({
                id: item.id,
                basePrice: item.basePrice,
                image: item.image,
                name: item.name,
                quantity: quantity,
                size: selectedSize,
                extra: selectedExtras
            })
        )
    }

    useEffect(() => {
        setLoading(true)

        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, [])

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cart));
    }, [cart]);


    if (loading) {
        return <Loading />
    }

    return (
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 py-10 items-center'>
            <div className="image">
                <Image src={item.image} alt={item.name} width='400' height='400' />
            </div>
            <div className="details leading-7">
                <h1 className='text-primary text-4xl font-bold my-7'>{item.name}</h1>
                <p className='text-accent text-sm font-bold w-[340px]'>{item.description}</p>
                <div className="leading-none">
                    <span className='text-accent text-[14px] font-bold mt-5 mb-4 block'>Number of Orders:</span>
                    {/* <div className='flex items-center justify-start gap-4'>
                        <button
                            onClick={() => setQuantity(itemQuantity > 0 ? itemQuantity - 1 : 0)}
                            className='font-bold bg-slate-200 flex items-center justify-center shadow-md w-[35px] h-[35px] text-lg'>-</button>
                        <span className='font-bold text-lg text-gray-500'>{itemQuantity}</span>
                        <button
                            onClick={() => setQuantity(itemQuantity + 1)}
                            className='font-bold bg-slate-200 flex items-center justify-center shadow-md w-[35px] h-[35px] text-lg'>+</button>
                    </div> */}
                </div>
                <div className="grid grid-cols-2 gap-3 mt-5">
                    <div className="space-y-4 text-center">
                        <Label className="text-primary font-bold">Pick your size</Label>
                        <PickSize
                            sizes={item.sizes}
                            item={item}
                            selectedSize={selectedSize}
                            setSelectedSize={setSelectedSize}
                        />
                    </div>
                    <div className="space-y-4 text-center">
                        <Label className="text-primary font-bold">Any Extra?</Label>
                        <Extras
                            extras={item.extras}
                            selectedExtras={selectedExtras}
                            setSelectedExtras={setSelectedExtras}
                        />
                    </div>
                </div>
                {quantity == 0 ? (
                    <button
                        className={`${buttonVariants({ size: 'lg' })} p-2 mt-5 !rounded-full`}
                        onClick={handleCartItem}
                    >
                        Add To Card {FormatCurrency(totalAmount)}
                    </button>
                ) : (
                    <ChooseQuantity quantity={quantity} item={item} selectedSize={selectedSize} selectedExtras={selectedExtras} />
                )}

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
        </div >
    )
}

export default Details

