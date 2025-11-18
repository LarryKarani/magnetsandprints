import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';

// Verify Ziina webhook signature
function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('x-ziina-signature');

    // Verify webhook signature
    if (!signature) {
      return NextResponse.json(
        { error: 'No signature provided' },
        { status: 401 }
      );
    }

    const webhookSecret = process.env.ZIINA_WEBHOOK_SECRET;
    if (!webhookSecret) {
      return NextResponse.json(
        { error: 'Webhook secret not configured' },
        { status: 500 }
      );
    }

    // Verify the signature
    const isValid = verifyWebhookSignature(body, signature, webhookSecret);
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }

    // Parse the webhook event
    const event = JSON.parse(body);

    // Handle different event types
    switch (event.type) {
      case 'payment.succeeded':
      case 'payment.completed':
        await handlePaymentSuccess(event.data);
        break;

      case 'payment.failed':
        await handlePaymentFailed(event.data);
        break;

      case 'payment.refunded':
        await handlePaymentRefunded(event.data);
        break;

      default:
    }

    return NextResponse.json({ received: true });
  } catch {
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

interface ZiinaPaymentData {
  id: string;
  metadata?: {
    orderId?: string;
  };
  [key: string]: unknown;
}

async function handlePaymentSuccess(paymentData: ZiinaPaymentData) {
  try {
    const orderId = paymentData.metadata?.orderId;
    if (!orderId) {
      return;
    }

    await prisma.order.update({
      where: { id: orderId },
      data: {
        paymentStatus: 'COMPLETED',
        status: 'PROCESSING',
        paymentId: paymentData.id,
      },
    });

    // TODO: Send confirmation email to customer
    // TODO: Notify admin about new order
  } catch {
  }
}

async function handlePaymentFailed(paymentData: ZiinaPaymentData) {
  try {
    const orderId = paymentData.metadata?.orderId;
    if (!orderId) {
      return;
    }

    await prisma.order.update({
      where: { id: orderId },
      data: {
        paymentStatus: 'FAILED',
      },
    });

  } catch {
  }
}

async function handlePaymentRefunded(paymentData: ZiinaPaymentData) {
  try {
    const orderId = paymentData.metadata?.orderId;
    if (!orderId) {
      return;
    }

    await prisma.order.update({
      where: { id: orderId },
      data: {
        paymentStatus: 'REFUNDED',
        status: 'CANCELLED',
      },
    });

  } catch {
  }
}
