"use client";

import { buttonVariants } from "@/components/ui/button";
import { FormatCurrency } from "@/lib/Formatter";
import { getItemQuantity } from "@/lib/cart";
import { AddToCart, selectCartItems } from "@/redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ProductWithRelations } from "@/types/product";
import { Translations } from "@/types/translations";
import { Extra, ProductSizes, Size } from "@prisma/client";
import { Label } from "@radix-ui/react-label";
import { motion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ChooseQuantity, Extras, PickSize } from "./add-to-cart";

const Details = ({
  item,
  labels,
}: {
  item: ProductWithRelations;
  labels: Translations["menuItem"];
}) => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector(selectCartItems);
  const defaultSize =
    cart.find((product) => product.id == item.id)?.size ||
    item.sizes.find((size) => size.name === ProductSizes.SMALL);
  const defaultExtra = cart.find((element) => element.id === item.id)?.extra || [];
  const [selectedSize, setSelectedSize] = useState<Size>(defaultSize!);
  const [selectedExtras, setSelectedExtras] = useState<Extra[]>(defaultExtra);
  const quantity = getItemQuantity(item.id, cart);
  const extrasTotal = selectedExtras.reduce((sum, extra) => sum + extra.price, 0);
  const selectedTotal = item.basePrice + (selectedSize?.price || 0) + extrasTotal;

  const handleCartItem = () => {
    dispatch(
      AddToCart({
        id: item.id,
        basePrice: item.basePrice,
        image: item.image,
        name: item.name,
        quantity,
        size: selectedSize,
        extra: selectedExtras,
      })
    );
  };

  useEffect(() => {
    sessionStorage.setItem("cartItems", JSON.stringify(cart));
  }, [cart]);

  return (
    <div className="grid grid-cols-1 items-start gap-8 py-10 lg:grid-cols-2">
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.22 }}
        className="relative min-h-[360px] overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm md:min-h-[520px]"
      >
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 50vw, 100vw"
          priority
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.22, delay: 0.05 }}
        className="rounded-lg border border-zinc-200 bg-white p-6 leading-7 shadow-sm lg:sticky lg:top-28"
      >
        <h1 className="text-4xl font-bold text-zinc-950">{item.name}</h1>
        <strong className="mt-3 block text-2xl text-primary">
          {FormatCurrency(item.basePrice)}
        </strong>
        <p className="mt-4 max-w-xl text-sm font-medium leading-7 text-accent">
          {item.description}
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="space-y-4">
            <Label className="font-bold text-primary">{labels.pickSize}</Label>
            <PickSize
              sizes={item.sizes}
              item={item}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
            />
          </div>
          <div className="space-y-4">
            <Label className="font-bold text-primary">{labels.anyExtra}</Label>
            <Extras
              extras={item.extras}
              selectedExtras={selectedExtras}
              setSelectedExtras={setSelectedExtras}
            />
          </div>
        </div>

        {quantity == 0 ? (
          <button
            className={`${buttonVariants({ size: "lg" })} mt-5 w-full p-2`}
            onClick={handleCartItem}
          >
            {labels.addToCartWithPrice} {FormatCurrency(selectedTotal)}
          </button>
        ) : (
          <ChooseQuantity
            quantity={quantity}
            item={item}
            selectedSize={selectedSize}
            selectedExtras={selectedExtras}
            labels={labels}
          />
        )}
      </motion.div>
    </div>
  );
};

export default Details;
