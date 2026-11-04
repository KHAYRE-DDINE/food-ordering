'use client'
import { buttonVariants } from "@/components/ui/button"
import { AddToCart, selectCartItems } from "@/redux/features/cart/cartSlice"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { ProductWithRelations } from "@/types/product"
import { useEffect, useState } from "react"
import { ChooseQuantity, Extras, PickSize } from "./add-to-cart"
import { Extra, ProductSizes, Size } from "@prisma/client"
import { getLineQuantity } from "@/lib/cart"
import { cartLineKey } from "@/lib/cart-line"
import { computeUnitPriceCents, fromCents } from "@/lib/pricing"
import { Label } from "@radix-ui/react-label"
import { FormatCurrency } from "@/lib/Formatter"
import { LanguageType } from "@/i18n.config"
import { Translations } from "@/types/translations"
import { defaultMenuTranslation } from "@/lib/menu-localization"
import { Languages } from "@/constants/enums"
import FavoriteButton from "./FavoriteButton"

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
    const safeSizes = Array.isArray(item?.sizes) ? item.sizes : []
    const safeExtras = Array.isArray(item?.extras) ? item.extras : []
    const defaultSize = safeSizes.find((size) => size.name === ProductSizes.SMALL) ?? safeSizes[0]
    const [selectedSize, setSelectedSize] = useState<Size | undefined>(defaultSize)
    const [selectedExtras, setSelectedExtras] = useState<Extra[]>([])

    // The quantity shown belongs to this exact customization.
    const lineKey = cartLineKey({ id: item.id, size: selectedSize, extra: selectedExtras })
    const quantity = getLineQuantity(lineKey, cart)
    // const [itemQuantity, setQuantity] = useState<number>(quantity)

    // Preview of this item's price; the server recomputes it at checkout.
    const itemPrice = fromCents(
        computeUnitPriceCents({
            basePrice: item.basePrice,
            sizePrice: selectedSize?.price ?? 0,
            extraPrices: selectedExtras.map((extra) => extra.price),
        })
    )

    const handleCartItem = () => {
        dispatch(
            AddToCart({
                id: item.id,
                basePrice: item.basePrice,
                image: item.image,
                name: item.name,
                size: selectedSize,
                extra: selectedExtras
            })
        )
    }

    useEffect(() => {
        sessionStorage.setItem('cartItems', JSON.stringify(cart));
    }, [cart]);

    return (
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 py-10 items-center'>
            <div className="image relative max-w-[400px]">
                <img src={item.image} alt={item.name} className="w-full h-auto rounded-lg shadow-md" />
                <div className="absolute top-4 right-4 z-10">
                    <FavoriteButton
                        item={{
                            id: item.id,
                            name: item.name,
                            image: item.image,
                            basePrice: item.basePrice,
                            description: item.description,
                            categoryId: item.categoryId,
                        }}
                        size={22}
                    />
                </div>
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
                    {safeSizes.length > 0 && selectedSize && (
                        <div className="space-y-4 text-center">
                            <Label className="text-primary font-bold">{translation.pickYourSize}</Label>
                            <PickSize
                                sizes={safeSizes}
                                item={item}
                                selectedSize={selectedSize}
                                setSelectedSize={setSelectedSize}
                            />
                        </div>
                    )}
                    {safeExtras.length > 0 && (
                        <div className="space-y-4 text-center">
                            <Label className="text-primary font-bold">{translation.anyExtra}</Label>
                            <Extras
                                extras={safeExtras}
                                selectedExtras={selectedExtras}
                                setSelectedExtras={setSelectedExtras}
                                locale={locale}
                            />
                        </div>
                    )}
                </div>
                {quantity == 0 ? (
                    <button
                        type="button"
                        className={`${buttonVariants({ size: 'lg' })} p-2 mt-5 !rounded-full`}
                        onClick={handleCartItem}
                    >
                        {translation.addToCart} {FormatCurrency(itemPrice)}
                    </button>
                ) : (
                    <ChooseQuantity quantity={quantity} item={item} lineKey={lineKey} selectedSize={selectedSize} selectedExtras={selectedExtras} translation={translation} />
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
