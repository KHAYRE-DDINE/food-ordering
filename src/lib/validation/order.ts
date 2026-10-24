import { z } from "zod";

const trimmed = (max: number) => z.string().trim().min(1).max(max);

export const orderLineSchema = z.object({
  productId: z.string().min(1).max(64),
  quantity: z.number().int().min(1).max(50),
  sizeId: z.string().min(1).max(64).nullish(),
  extraIds: z.array(z.string().min(1).max(64)).max(20).default([]),
});

/**
 * Client-supplied order input. Prices and totals are intentionally NOT part
 * of this schema: the server computes them from the database.
 */
export const createOrderSchema = z.object({
  userEmail: z.string().trim().toLowerCase().email().max(254),
  phone: z
    .string()
    .trim()
    .min(6)
    .max(24)
    .regex(/^[+\d][\d\s().-]*$/, "Invalid phone number"),
  streetAddress: trimmed(255),
  postalCode: trimmed(20),
  city: trimmed(100),
  country: trimmed(100),
  deliveryNotes: z.string().trim().max(500).optional(),
  promoCode: z.string().trim().max(30).optional(),
  fulfillmentMethod: z.enum(["DELIVERY", "PICKUP"]).default("DELIVERY"),
  products: z.array(orderLineSchema).min(1).max(50),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
