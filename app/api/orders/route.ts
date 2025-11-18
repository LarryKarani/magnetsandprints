/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateOrderNumber } from '@/lib/utils'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { user, items, shippingAddress, specialInstructions } = body

    // Calculate total amount
    const totalAmount = items.reduce((total: number, item: any) =>
      total + item.price, 0
    )

    // Create or find user
    let dbUser = await prisma.user.findUnique({
      where: { email: user.email },
    })

    if (!dbUser) {
      dbUser = await prisma.user.create({
        data: {
          email: user.email,
          name: user.name,
          phone: user.phone,
        },
      })
    }

    // Create order
    const order = await prisma.order.create({
      data: {
        orderNumber: generateOrderNumber(),
        userId: dbUser.id,
        totalAmount,
        shippingAddress,
        specialInstructions,
        items: {
          create: items.map((item: any) => ({
            imageUrl: item.imageUrl,
            cloudinaryId: item.cloudinaryId,
            size: item.size,
            quantity: item.quantity,
            borderStyle: item.borderStyle,
            finish: item.finish,
            price: item.price,
          })),
        },
      },
      include: {
        items: true,
        user: true,
      },
    })

    // Send email notification (don't await - fire and forget)
    if (process.env.ORDER_NOTIFICATION_EMAIL) {
      fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/notifications/order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order, user: dbUser }),
      }).catch(() => {
        // Silently fail - order is already created
      });
    }

    return NextResponse.json(order)
  } catch {
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        items: true,
        user: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(orders)
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    )
  }
}