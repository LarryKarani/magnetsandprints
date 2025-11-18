import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { order, user } = await request.json();

    if (!order || !user) {
      return NextResponse.json(
        { error: 'Missing order or user data' },
        { status: 400 }
      );
    }

    const notificationEmail = process.env.ORDER_NOTIFICATION_EMAIL;

    if (!notificationEmail) {
      return NextResponse.json(
        { error: 'Notification email not configured' },
        { status: 500 }
      );
    }

    // Send notification to store owner
    const data = await resend.emails.send({
      from: 'Magnets & Prints <orders@magnetsandprints.com>',
      to: [notificationEmail],
      subject: `New Order #${order.orderNumber}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #6366f1;">New Order Received!</h2>

          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Order Details</h3>
            <p><strong>Order Number:</strong> ${order.orderNumber}</p>
            <p><strong>Total Amount:</strong> AED ${(order.totalAmount / 100).toFixed(2)}</p>
            <p><strong>Status:</strong> ${order.status}</p>
            <p><strong>Payment Status:</strong> ${order.paymentStatus}</p>
          </div>

          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Customer Information</h3>
            <p><strong>Name:</strong> ${user.name}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Phone:</strong> ${user.phone || 'Not provided'}</p>
          </div>

          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Shipping Address</h3>
            <p>${order.shippingAddress.address}</p>
            <p>${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zipCode}</p>
            <p>${order.shippingAddress.country}</p>
          </div>

          ${order.specialInstructions ? `
          <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Special Instructions</h3>
            <p>${order.specialInstructions}</p>
          </div>
          ` : ''}

          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Order Items (${order.items.length})</h3>
            ${order.items.map((item: {
              size: string;
              quantity: number;
              borderStyle: string;
              finish: string;
              price: number;
            }) => `
              <div style="border-bottom: 1px solid #d1d5db; padding: 10px 0;">
                <p><strong>Size:</strong> ${item.size}</p>
                <p><strong>Quantity:</strong> ${item.quantity}</p>
                <p><strong>Border:</strong> ${item.borderStyle}</p>
                <p><strong>Finish:</strong> ${item.finish}</p>
                <p><strong>Price:</strong> AED ${(item.price / 100).toFixed(2)}</p>
              </div>
            `).join('')}
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px;">
              View this order in your <a href="${process.env.NEXT_PUBLIC_APP_URL}/admin/dashboard" style="color: #6366f1;">admin dashboard</a>
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch {
    return NextResponse.json(
      { error: 'Failed to send notification' },
      { status: 500 }
    );
  }
}
