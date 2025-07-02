"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getTotalAmount } from "@/lib/cart";
import { FormatCurrency } from "@/lib/Formatter";
import { selectCartItems } from "@/redux/features/cart/cartSlice";
import { useAppSelector } from "@/redux/hooks";
import { CreditCard, MapPin, Phone, ShoppingBag } from 'lucide-react';
import React, { useState } from "react";

const Checkpoint = () => {
    const cart = useAppSelector(selectCartItems);
    const totalAmount = getTotalAmount(cart);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Handle form submission here
        console.log('Order submitted');
    };

    if (!cart || cart.length === 0) {
        return null;
    }

    return (
        <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
            <div className="flex items-center gap-2 mb-6">
                <ShoppingBag className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold text-gray-900">Order Summary</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-1">
                    <Label htmlFor="phone" className="text-gray-700 flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-500" />
                        Phone Number
                    </Label>
                    <Input
                        id="phone"
                        placeholder="+1 (555) 000-0000"
                        type="tel"
                        name="phone"
                        required
                        className="focus-visible:ring-2 focus-visible:ring-primary/50 h-11"
                    />
                </div>

                <div className="space-y-1">
                    <Label htmlFor="address" className="text-gray-700 flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        Delivery Address
                    </Label>
                    <Textarea
                        id="address"
                        placeholder="Enter your full address"
                        name="address"
                        required
                        rows={3}
                        className="resize-none focus-visible:ring-2 focus-visible:ring-primary/50 min-h-[100px]"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <Label htmlFor="postal-code" className="text-gray-700 text-sm">
                            Postal Code
                        </Label>
                        <Input
                            type="text"
                            id="postal-code"
                            placeholder="12345"
                            name="postalCode"
                            required
                            className="focus-visible:ring-2 focus-visible:ring-primary/50 h-10"
                        />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="city" className="text-gray-700 text-sm">
                            City
                        </Label>
                        <Input
                            type="text"
                            id="city"
                            placeholder="New York"
                            name="city"
                            required
                            className="focus-visible:ring-2 focus-visible:ring-primary/50 h-10"
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <Label htmlFor="country" className="text-gray-700 text-sm">
                        Country
                    </Label>
                    <Input
                        type="text"
                        id="country"
                        placeholder="United States"
                        name="country"
                        required
                        className="focus-visible:ring-2 focus-visible:ring-primary/50 h-10"
                    />
                </div>

                <div className="pt-2">
                    <Button 
                        type="submit" 
                        className="w-full h-12 text-base font-medium bg-primary hover:bg-primary/90 transition-colors"
                        disabled={isSubmitting}
                    >
                        <CreditCard className="mr-2 h-5 w-5" />
                        {isSubmitting ? 'Processing...' : `Pay ${FormatCurrency(totalAmount)}`}
                    </Button>
                </div>

                <p className="text-xs text-gray-500 text-center mt-4">
                    By placing this order, you agree to our Terms of Service and Privacy Policy
                </p>
            </form>
        </div>
    );
};

export default Checkpoint;
