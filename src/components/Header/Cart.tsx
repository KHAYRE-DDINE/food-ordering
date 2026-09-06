"use client";

import { Button } from "@/components/ui/button";
import { Routes } from "@/constants/enums";
import { FormatCurrency } from "@/lib/Formatter";
import { deliveryFee, GetCartQuantity, getSubTotal, getTotalAmount } from "@/lib/cart";
import {
  AddToCart,
  RemoveCartItem,
  RemoveItemFromForm,
  selectCartItems,
} from "@/redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Translations } from "@/types/translations";
import { AnimatePresence, motion } from "motion/react";
import { Minus, Plus, ShoppingCartIcon, Trash2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

const Cart = ({ labels }: { labels: Translations["cart"] }) => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector(selectCartItems);
  const { locale } = useParams<{ locale: string }>();
  const [isOpen, setIsOpen] = useState(false);
  const cartQuantity = GetCartQuantity(cart);
  const subTotal = getSubTotal(cart);
  const total = getTotalAmount(cart);
  const isArabic = locale === "ar";

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="relative rounded-md border border-zinc-200 bg-white p-2 transition hover:border-primary"
        aria-label={labels.title}
      >
        <span className="absolute -right-2 -top-2 h-5 w-5 rounded-full bg-primary text-center text-xs font-bold leading-5 text-white">
          {cartQuantity}
        </span>
        <ShoppingCartIcon className="!h-6 !w-6 text-accent transition-colors duration-200 hover:text-primary" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close cart"
              className="fixed inset-0 z-[98765679] bg-zinc-950/40 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.aside
              className={`fixed bottom-0 z-[98765680] flex max-h-[86vh] w-full flex-col rounded-t-lg border border-zinc-200 bg-white shadow-2xl md:bottom-auto md:top-0 md:h-screen md:max-h-none md:w-[420px] md:rounded-none ${
                isArabic ? "left-0 md:border-r" : "right-0 md:border-l"
              }`}
              initial={isArabic ? { x: "-100%" } : { x: "100%" }}
              animate={{ x: 0 }}
              exit={isArabic ? { x: "-100%" } : { x: "100%" }}
              transition={{ duration: 0.24, ease: "easeOut" }}
            >
              <div className="flex items-center justify-between border-b border-zinc-100 p-5">
                <div>
                  <h2 className="text-xl font-bold text-zinc-950">{labels.title}</h2>
                  <p className="text-sm text-zinc-500">
                    {cartQuantity} {labels.orderSummary.toLowerCase()}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-md border border-zinc-200 transition hover:bg-zinc-50"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5">
                {cart.length === 0 ? (
                  <div className="rounded-lg border border-dashed border-zinc-300 p-8 text-center">
                    <ShoppingCartIcon className="mx-auto h-10 w-10 text-zinc-300" />
                    <h3 className="mt-3 font-semibold text-zinc-950">{labels.emptyTitle}</h3>
                    <p className="mt-1 text-sm text-zinc-500">{labels.emptyDescription}</p>
                  </div>
                ) : (
                  <ul className="space-y-4">
                    {cart.map((item) => (
                      <li key={item.id} className="rounded-lg border border-zinc-200 p-3">
                        <div className="flex gap-3">
                          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-zinc-100">
                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-3">
                              <h3 className="line-clamp-2 text-sm font-semibold text-zinc-950">
                                {item.name}
                              </h3>
                              <button
                                type="button"
                                onClick={() => dispatch(RemoveItemFromForm({ id: item.id }))}
                                className="text-zinc-400 transition hover:text-rose-500"
                                aria-label={labels.removeItem}
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                            <p className="mt-1 text-sm font-bold text-primary">
                              {FormatCurrency(item.basePrice)}
                            </p>
                            <div className="mt-3 flex items-center gap-2">
                              <Button
                                size="icon"
                                variant="outline"
                                className="h-8 w-8"
                                onClick={() => dispatch(RemoveCartItem({ id: item.id }))}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="w-7 text-center text-sm font-semibold">
                                {item.quantity}
                              </span>
                              <Button
                                size="icon"
                                variant="outline"
                                className="h-8 w-8"
                                onClick={() => dispatch(AddToCart(item))}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="border-t border-zinc-100 p-5">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">{labels.subtotal}</span>
                    <span className="font-semibold">{FormatCurrency(subTotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">{labels.delivery}</span>
                    <span className="font-semibold">{FormatCurrency(cart.length ? deliveryFee : 0)}</span>
                  </div>
                  <div className="flex justify-between pt-2 text-base font-bold text-zinc-950">
                    <span>{labels.total}</span>
                    <span>{FormatCurrency(cart.length ? total : 0)}</span>
                  </div>
                </div>
                <Button asChild className="mt-5 h-12 w-full font-bold">
                  <Link href={`/${locale}/${Routes.CHECKOUT}`} onClick={() => setIsOpen(false)}>
                    {labels.continueCheckout}
                  </Link>
                </Button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {cartQuantity > 0 && (
        <Link
          href={`/${locale}/${Routes.CHECKOUT}`}
          className="fixed bottom-4 left-4 right-4 z-[900] flex h-14 items-center justify-between rounded-lg bg-zinc-950 px-4 font-bold text-white shadow-xl md:hidden"
        >
          <span>{cartQuantity} · {FormatCurrency(total)}</span>
          <span>{labels.continueCheckout}</span>
        </Link>
      )}
    </>
  );
};

export default Cart;
