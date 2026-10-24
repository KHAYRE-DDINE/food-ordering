'use client'
import { buttonVariants } from "@/components/ui/button"
import Loading from "@/lib/Loading"
import { AddToCart, selectCartItems } from "@/redux/features/cart/cartSlice"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { ProductWithRelations } from "@/types/product"
import { useEffect, useState } from "react"
import { ChooseQuantity, Extras, PickSize } from "./add-to-cart"
import { Extra, ProductSizes, Size } from "@prisma/client"
import { getItemQuantity, getTotalAmount } from "@/lib/cart"
import { Label } from "@radix-ui/react-label"
import { FormatCurrency } from "@/lib/Formatter"
import { LanguageType } from "@/i18n.config"
import { Translations } from "@/types/translations"
import { defaultMenuTranslation, localizeExtraName } from "@/lib/menu-localization"
import { Languages } from "@/constants/enums"

const Details = ({
    item,
    locale = Languages.ENGLISH,
    translation = defaultMenuTranslation,
}: {
    item: ProductWithRelations
    locale?: LanguageType
    translation?: Translations['menu']
}) => {
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
        sessionStorage.setItem('cartItems', JSON.stringify(cart));
    }, [cart]);


    if (loading) {
        return <Loading />
    }

    return (
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 py-10 items-center'>
            <div className="image">
                <img src={item.image} alt={item.name} width="400" height="400" />
            </div>
            <div className="details leading-7">
                <h1 className='text-primary text-4xl font-bold my-7'>{item.name}</h1>
                <p className='text-accent text-sm font-bold w-[340px]'>{item.description}</p>
                <div className="leading-none">
                    <span className='text-accent text-[14px] font-bold mt-5 mb-4 block'>{translation.numberOfOrders}</span>
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
                        <Label className="text-primary font-bold">{translation.pickYourSize}</Label>
                        <PickSize
                            sizes={item.sizes}
                            item={item}
                            selectedSize={selectedSize}
                            setSelectedSize={setSelectedSize}
                        />
                    </div>
                    <div className="space-y-4 text-center">
                        <Label className="text-primary font-bold">{translation.anyExtra}</Label>
                        <Extras
                            extras={item.extras}
                            selectedExtras={selectedExtras}
                            setSelectedExtras={setSelectedExtras}
                            locale={locale}
                        />
                    </div>
                </div>
                {quantity == 0 ? (
                    <button
                        className={`${buttonVariants({ size: 'lg' })} p-2 mt-5 !rounded-full`}
                        onClick={handleCartItem}
                    >
                        {translation.addToCart} {FormatCurrency(totalAmount)}
                    </button>
                ) : (
                    <ChooseQuantity quantity={quantity} item={item} selectedSize={selectedSize} selectedExtras={selectedExtras} translation={translation} />
                )}

                <div className="choose-image flex items-center justify-start gap-2 mt-6">
                    <div className="overflow-hidden border-[3px] border-primary rounded-full cursor-pointer">
                        <img
                            src={item.image}
                            alt="img-1" width={80} height={90} className="hover:scale-110 transition-all duration-500" />
                    </div>
                    <div className="overflow-hidden border-[3px] border-primary rounded-full cursor-pointer">
                        <img
                            src={item.image}
                            alt="img-1" width={80} height={90} className="hover:scale-110 transition-all duration-500" />
                    </div>
                    <div className="overflow-hidden border-[3px] border-primary rounded-full cursor-pointer">
                        <img
                            src={item.image}
                            alt="img-1" width={80} height={90} className="hover:scale-110 transition-all duration-500" />
                    </div>
                    <div className="overflow-hidden border-[3px] border-primary rounded-full cursor-pointer">
                        <img
                            src={item.image}
                            alt="img-1" width={80} height={90} className="hover:scale-110 transition-all duration-500" />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Details

