import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/prisma'
import { z } from 'zod'

const PromoValidationSchema = z.object({
  code: z.string().trim().min(1, 'Promo code is required'),
  subTotal: z.number().min(0, 'Subtotal must be positive'),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = PromoValidationSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { valid: false, error: 'Invalid input', details: parsed.error.format() },
        { status: 400 }
      )
    }

    const { code, subTotal } = parsed.data
    const normalizedCode = code.toUpperCase().trim()

    const promo = await db.promoCode.findUnique({
      where: { code: normalizedCode },
    })

    if (!promo || !promo.isActive) {
      return NextResponse.json(
        { valid: false, error: 'Invalid or inactive promo code.' },
        { status: 404 }
      )
    }

    const now = new Date()
    if (promo.startsAt && promo.startsAt > now) {
      return NextResponse.json(
        { valid: false, error: 'This promo code is not active yet.' },
        { status: 400 }
      )
    }

    if (promo.expiresAt && promo.expiresAt < now) {
      return NextResponse.json(
        { valid: false, error: 'This promo code has expired.' },
        { status: 400 }
      )
    }

    if (promo.usageLimit !== null && promo.timesUsed >= promo.usageLimit) {
      return NextResponse.json(
        { valid: false, error: 'This promo code has reached its usage limit.' },
        { status: 400 }
      )
    }

    if (subTotal < promo.minOrderAmount) {
      return NextResponse.json(
        {
          valid: false,
          error: `Minimum order amount of $${promo.minOrderAmount.toFixed(2)} required for this code.`,
        },
        { status: 400 }
      )
    }

    let discountAmount = 0
    if (promo.discountType === 'PERCENTAGE') {
      discountAmount = (subTotal * promo.discountValue) / 100
      if (promo.maxDiscount && discountAmount > promo.maxDiscount) {
        discountAmount = promo.maxDiscount
      }
    } else {
      discountAmount = Math.min(promo.discountValue, subTotal)
    }

    discountAmount = Math.round(discountAmount * 100) / 100

    return NextResponse.json({
      valid: true,
      code: promo.code,
      discountAmount,
      discountType: promo.discountType,
      discountValue: promo.discountValue,
    })
  } catch (err: unknown) {
    console.error('Error validating promo code:', err)
    return NextResponse.json(
      { valid: false, error: 'Failed to validate promo code.' },
      { status: 500 }
    )
  }
}
