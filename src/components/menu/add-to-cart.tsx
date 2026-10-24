'use client'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import Image from "next/image"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group"
import { FormatCurrency } from "@/lib/Formatter"
import { Checkbox } from "@radix-ui/react-checkbox"
import { Extra, ProductSizes, Size } from "@prisma/client"
import { ProductWithRelations } from "@/types/product"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { AddToCart, RemoveCartItem, RemoveItemFromForm, selectCartItems } from "@/redux/features/cart/cartSlice"
import { useState } from "react"
import { getLineQuantity } from "@/lib/cart"
import { cartLineKey } from "@/lib/cart-line"
import { computeUnitPriceCents, fromCents } from "@/lib/pricing"
import { Translations } from "@/types/translations"
import { LanguageType } from "@/i18n.config"
import { defaultMenuTranslation, localizeExtraName } from "@/lib/menu-localization"
import { Languages } from "@/constants/enums"

const AddButton = ({
    item,
    locale,
    translation,
}: {
    item: ProductWithRelations
    locale?: LanguageType
    translation?: Translations['menu']
}) => {
    const currentLocale = locale ?? Languages.ENGLISH
    const currentTranslation = translation ?? defaultMenuTranslation
    const cart = useAppSelector(selectCartItems)
    const dispatch = useAppDispatch()
    // Prefer the SMALL size, otherwise the first available one. A product
    // without sizes is still orderable (selectedSize stays undefined).
    const defaultSize = item.sizes.find((size) => size.name === ProductSizes.SMALL) ?? item.sizes[0]
    const [selectedSize, setSelectedSize] = useState<Size | undefined>(defaultSize)
    const [selectedExtras, setSelectedExtras] = useState<Extra[]>([])

    // The quantity shown belongs to this exact customization.
    const lineKey = cartLineKey({ id: item.id, size: selectedSize, extra: selectedExtras })
    const quantity = getLineQuantity(lineKey, cart)

    const totalPrice = fromCents(
        computeUnitPriceCents({
            basePrice: item.basePrice,
            sizePrice: selectedSize?.price ?? 0,
            extraPrices: selectedExtras.map((extra) => extra.price),
        })
    )

    const handleCart = () => {
        dispatch(
            AddToCart({
                basePrice: item.basePrice,
                id: item.id,
                image: item.image,
                name: item.name,
                size: selectedSize,
                extra: selectedExtras,
            })
        )
    }


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className='text-white mt-4 rounded-full !px-8' type='button' size='lg'><span>{currentTranslation.addToCart}</span></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <Image src={item.image} alt={item.name} width={200} height={200} className="m-auto" />
                    <DialogTitle className="text-center">{item.name}</DialogTitle>
                    <DialogDescription className="text-center">
                        {item.description}
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-10">
                    {item.sizes.length > 0 && selectedSize && (
                        <div className="space-y-4 text-center">
                            <Label>{currentTranslation.pickYourSize}</Label>
                            <PickSize
                                sizes={item.sizes}
                                item={item}
                                selectedSize={selectedSize}
                                setSelectedSize={setSelectedSize}
                            />
                        </div>
                    )}
                    {item.extras.length > 0 && (
                        <div className="space-y-4 text-center">
                            <Label>{currentTranslation.anyExtra}</Label>
                            <Extras
                                extras={item.extras}
                                selectedExtras={selectedExtras}
                                setSelectedExtras={setSelectedExtras}
                                locale={currentLocale}
                            />
                        </div>
                    )}
                </div>
                <DialogFooter>
                    {quantity === 0 ?
                        <Button type="button" className="w-full h-10" onClick={handleCart}>
                            {currentTranslation.addToCart} {FormatCurrency(totalPrice)}
                        </Button> : <ChooseQuantity item={item} lineKey={lineKey} quantity={quantity} selectedSize={selectedSize} selectedExtras={selectedExtras} translation={currentTranslation} />
                    }
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default AddButton


export function PickSize({
    sizes, item, selectedSize, setSelectedSize
}: {
    sizes: Size[],
    item: ProductWithRelations,
    selectedSize: Size,
    setSelectedSize: React.Dispatch<React.SetStateAction<Size | undefined>>
}) {
    return (
        <RadioGroup
            value={selectedSize.id}
            onValueChange={(sizeId) => setSelectedSize(sizes.find((size) => size.id === sizeId))}
        >
            {sizes.map((size) => (
                <div key={size.id} className="flex items-center space-x-2 border border-gray-100 rounded-md p-4 mb-3">
                    <RadioGroupItem
                        value={size.id}
                        id={`size-${size.id}`}
                        className={`${selectedSize.id === size.id ? 'bg-primary' : ''} w-5 h-5 border border-primary rounded-full`} />
                    <Label htmlFor={`size-${size.id}`}>{size.name} {FormatCurrency(size.price + item.basePrice)}</Label>
                </div>
            ))}
        </RadioGroup>
    )
}

export function Extras(
    { extras, selectedExtras, setSelectedExtras, locale }
        : {
            extras: Extra[],
            selectedExtras: Extra[],
            setSelectedExtras: React.Dispatch<React.SetStateAction<Extra[]>>,
            locale?: LanguageType
        }) {
    const currentLocale = locale ?? Languages.ENGLISH

    const handleExtras = (extra: Extra) => {
        if (selectedExtras.find((e) => e.id === extra.id)) {
            const filterExtras = selectedExtras.filter((e) => e.id !== extra.id)
            setSelectedExtras(filterExtras)
        } else {
            setSelectedExtras((prev) => [...prev, extra])
        }
    }

    return (
        <div>
            {extras.map((extra) => (
                <div key={extra.id} className="flex items-center space-x-2 border border-gray-100 rounded-md p-4 mb-3">
                    <Checkbox
                        id={`extra-${extra.id}`}
                        checked={Boolean(selectedExtras.find((e) => e.id === extra.id))}
                        onClick={() => handleExtras(extra)}
                        className={`${Boolean(selectedExtras.find((ex) => ex.id === extra.id)) ? 'bg-primary' : ''} w-5 h-5 border border-primary rounded-md`} />
                    <Label
                        htmlFor={`extra-${extra.id}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        {localizeExtraName(extra.name, currentLocale)} {FormatCurrency(extra.price)}
                    </Label>
                </div>
            ))}
        </div>
    )
}

export function ChooseQuantity({ quantity, item, lineKey, selectedSize, selectedExtras, translation }
    :
    {
        quantity: number,
        item: ProductWithRelations,
        lineKey: string,
        selectedSize?: Size,
        selectedExtras: Extra[],
        translation?: Translations['menu']
    }) {
    const dispatch = useAppDispatch()
    const currentTranslation = translation ?? defaultMenuTranslation
    return (
        <div className='flex items-center flex-col gap-2 mt-4 w-full'>
            <div className='flex items-center justify-center gap-2'>
                <Button
                    variant='outline'
                    onClick={() => dispatch(RemoveCartItem({ lineKey }))}
                >
                    -
                </Button>
                <div>
                    <span className='text-black'>{quantity} {currentTranslation.inCart}</span>
                </div>
                <Button
                    variant='outline'
                    onClick={() =>
                        dispatch(
                            AddToCart({
                                basePrice: item.basePrice,
                                id: item.id,
                                image: item.image,
                                name: item.name,
                                extra: selectedExtras,
                                size: selectedSize,
                            })
                        )
                    }
                >
                    +
                </Button>
            </div>
            <Button
                size='sm'
                onClick={() => dispatch(RemoveItemFromForm({ lineKey }))}
            >
                {currentTranslation.remove}
            </Button>
        </div>
    )
}
