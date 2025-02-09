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
import { getItemQuantity } from "@/lib/cart"

const AddButton = ({ item }: { item: ProductWithRelations }) => {
    const cart = useAppSelector(selectCartItems)
    const dispatch = useAppDispatch()
    const defaultSize = cart.find((product) => product.id == item.id)?.size || item.sizes.find((size) => size.name === ProductSizes.SMALL)
    const defaultExtra = cart.find((element) => element.id === item.id)?.extra || []
    const [selectedSize, setSelectedSize] = useState<Size>(defaultSize!)
    const [selectedExtras, setSelectedExtras] = useState<Extra[]>(defaultExtra)
    const quantity = getItemQuantity(item.id, cart)


    let totalPrice = item.basePrice
    if (selectedSize) {
        totalPrice += selectedSize.price
    }
    if (selectedExtras) {
        for (const extra of selectedExtras) {
            totalPrice += extra.price
        }
    }

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
                <Button className='text-white mt-4 rounded-full !px-8' type='button' size='lg'><span>Add To Card</span></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <Image src={item.image} alt={item.name} width={200} height={200} className="m-auto" />
                    <DialogTitle className="text-center">Pizza</DialogTitle>
                    <DialogDescription className="text-center">
                        {item.description}
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-10">
                    <div className="space-y-4 text-center">
                        <Label>Pick your size</Label>
                        <PickSize
                            sizes={item.sizes}
                            item={item}
                            selectedSize={selectedSize}
                            setSelectedSize={setSelectedSize}
                        />
                    </div>
                    <div className="space-y-4 text-center">
                        <Label>Any Extra?</Label>
                        <Extras
                            extras={item.extras}
                            selectedExtras={selectedExtras}
                            setSelectedExtras={setSelectedExtras}
                        />
                    </div>
                </div>
                <DialogFooter>
                    {quantity === 0 ?
                        <Button type="submit" className="w-full h-10" onClick={handleCart}>
                            Add To Card {FormatCurrency(totalPrice)}
                        </Button> : <ChooseQuantity item={item} quantity={quantity} selectedSize={selectedSize} selectedExtras={selectedExtras} />
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
    setSelectedSize: React.Dispatch<React.SetStateAction<Size>>
}) {
    return (
        <RadioGroup defaultValue="comfortable" >
            {sizes.map((size) => (
                <div key={size.id} className="flex items-center space-x-2 border border-gray-100 rounded-md p-4 mb-3">
                    <RadioGroupItem
                        value={selectedSize.name}
                        id={item.id}
                        checked={selectedSize.id === size.id}
                        onClick={() => setSelectedSize(size)}
                        className={`${selectedSize.id === size.id ? 'bg-primary' : ''} w-5 h-5 border border-primary rounded-full`} />
                    <Label htmlFor={size.id}>{size.name} {FormatCurrency(size.price + item.basePrice)}</Label>
                </div>
            ))}
        </RadioGroup>
    )
}

export function Extras(
    { extras, selectedExtras, setSelectedExtras }
        : {
            extras: Extra[], selectedExtras: Extra[], setSelectedExtras: React.Dispatch<React.SetStateAction<Extra[]>>
        }) {

    const handleExtras = (extra: Extra) => {
        if (selectedExtras.find((e) => e.id === extra.id)) {
            const filterExtras = selectedExtras.filter((e) => e.id !== extra.id)
            setSelectedExtras(filterExtras)
        } else {
            setSelectedExtras((prev) => [...prev, extra])
        }
    }

    return (
        <RadioGroup defaultValue="comfortable" >
            {extras.map((extra) => (
                <div key={extra.id} className="flex items-center space-x-2 border border-gray-100 rounded-md p-4 mb-3">
                    <Checkbox
                        id={extra.id}
                        checked={Boolean(selectedExtras.find((e) => e.id === extra.id))}
                        onClick={() => handleExtras(extra)}
                        className={`${Boolean(selectedExtras.find((ex) => ex.id === extra.id)) ? 'bg-primary' : ''} w-5 h-5 border border-primary rounded-md`} />
                    <Label
                        htmlFor={extra.id}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        {extra.name} {FormatCurrency(extra.price)}
                    </Label>
                </div>
            ))}
        </RadioGroup>
    )
}

export function ChooseQuantity({ quantity, item, selectedSize, selectedExtras }
    :
    {
        quantity: number,
        item: ProductWithRelations,
        selectedSize: Size,
        selectedExtras: Extra[]
    }) {
    const dispatch = useAppDispatch()
    return (
        <div className='flex items-center flex-col gap-2 mt-4 w-full'>
            <div className='flex items-center justify-center gap-2'>
                <Button
                    variant='outline'
                    onClick={() => dispatch(RemoveCartItem({ id: item.id }))}
                >
                    -
                </Button>
                <div>
                    <span className='text-black'>{quantity} in cart</span>
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
                onClick={() => dispatch(RemoveItemFromForm({ id: item.id }))}
            >
                Remove
            </Button>
        </div>
    )
}