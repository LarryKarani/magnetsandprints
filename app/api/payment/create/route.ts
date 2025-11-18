import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, amount, currency, customerEmail, customerName } = body;

    // Validate required fields
    if (!orderId || !amount || !customerEmail) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create Ziina payment intent (API v2)
    const ziinaResponse = await fetch('https://api-v2.ziina.com/api/payment_intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.ZIINA_API_KEY}`,
      },
      body: JSON.stringify({
        amount: Math.round(amount * 100), // Convert to fils (AED cents)
        currency_code: currency || 'AED',
        message: `Order #${orderId} - ${customerName}`,
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success?orderId=${orderId}`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/cancelled?orderId=${orderId}`,
        failure_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/cancelled?orderId=${orderId}`,
        test: process.env.ZIINA_TEST_MODE === 'true',
        allow_tips: false,
      }),
    });

    if (!ziinaResponse.ok) {
      const errorData = await ziinaResponse.json();
      return NextResponse.json(
        { error: 'Failed to create payment with Ziina' },
        { status: 500 }
      );
    }

    const paymentData = await ziinaResponse.json();

    // Update order with payment ID
    await prisma.order.update({
      where: { id: orderId },
      data: {
        paymentId: paymentData.id,
      },
    });

    return NextResponse.json({
      paymentId: paymentData.id,
      paymentUrl: paymentData.redirect_url,
      embeddedUrl: paymentData.embedded_url,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create payment' },
      { status: 500 }
    );
  }
}
