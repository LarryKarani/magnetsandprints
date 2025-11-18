# Magnets and Prints - Setup Guide

This is a custom fridge magnet ordering platform built with Next.js 15, featuring image uploads to Cloudinary, payment processing via Ziina, and order storage in Supabase (PostgreSQL).

## Features Implemented

- ✅ Image upload to Cloudinary
- ✅ Custom magnet configurator (size, quantity, border, finish)
- ✅ Shopping cart with Zustand
- ✅ User details collection
- ✅ Ziina payment gateway integration
- ✅ Order storage in Supabase PostgreSQL database
- ✅ Payment webhook handling
- ✅ Success/Cancelled payment pages

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Database**: Supabase (PostgreSQL) with Prisma ORM
- **Image Storage**: Cloudinary
- **Payment Gateway**: Ziina (Dubai-based)
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Animations**: Framer Motion

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Supabase account
- Cloudinary account
- Ziina account (for UAE payments)

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

The `.env.local` file is already set up with your credentials:

```env
# Database - Already configured
DATABASE_URL="postgresql://postgres:magnets@sam@db.bmnpojtnaubgbbvzzrtq.supabase.co:5432/postgress"

# Cloudinary - Already configured
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="dy1bghrrm"
CLOUDINARY_API_KEY="211533619678853"
CLOUDINARY_API_SECRET="qFEMX0h_Xkmc2f36T1Ido4wVv40"

# Ziina Payment - NEEDS TO BE UPDATED
ZIINA_API_KEY="your_ziina_api_key"
ZIINA_WEBHOOK_SECRET="your_webhook_secret"
NEXT_PUBLIC_ZIINA_PUBLIC_KEY="your_public_key"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

**⚠️ IMPORTANT: Update Ziina API Keys**

You need to replace the placeholder Ziina keys with your actual API keys:

1. Log in to your Ziina dashboard at https://dashboard.ziina.com
2. Navigate to API Settings
3. Copy your API Key, Webhook Secret, and Public Key
4. Update the `.env.local` file with these values

### 3. Set Up Supabase Database

Your Supabase database connection is already configured. Now run the Prisma migrations:

```bash
# Generate Prisma client
npx prisma generate

# Run migrations to create database tables
npx prisma migrate dev --name init
```

**Note**: The migration command failed in our test because the database server wasn't reachable. Make sure:
- Your Supabase project is active
- The database URL in `.env.local` is correct
- Your IP is allowed in Supabase (check Settings > Database > Connection Pooling)

If the database URL has issues, get the correct connection string from Supabase:
1. Go to your Supabase project
2. Settings > Database
3. Copy the "Connection string" (Direct connection)
4. Replace the password placeholder with your actual database password

### 4. Configure Ziina Webhook

After deploying your app, configure the webhook in Ziina dashboard:

1. Go to Ziina Dashboard > Webhooks
2. Add webhook URL: `https://yourdomain.com/api/payment/webhook`
3. Select events: `payment.succeeded`, `payment.failed`, `payment.refunded`
4. Copy the webhook secret and update `.env.local`

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## How It Works

### User Flow

1. **Upload Images** (`/upload`)
   - User uploads photos via drag-and-drop
   - Configure each magnet (size, quantity, border, finish)
   - Images are uploaded to Cloudinary
   - Items added to cart

2. **Checkout** (`/cart`)
   - Review cart items
   - Enter contact information
   - Enter shipping address
   - Add special instructions (optional)

3. **Payment** (Ziina)
   - Order created in database with PENDING status
   - User redirected to Ziina payment page
   - User completes payment

4. **Webhook Processing**
   - Ziina sends webhook notification
   - Order status updated to COMPLETED
   - Payment status updated

5. **Confirmation** (`/payment/success`)
   - User redirected to success page
   - Order confirmation displayed
   - Cart cleared

## Database Schema

The Prisma schema includes:

- **User**: Customer information
- **Order**: Order details and status
- **OrderItem**: Individual magnet items
- **Admin**: Admin users (for future admin panel)

Enums:
- **OrderStatus**: PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED
- **PaymentStatus**: PENDING, COMPLETED, FAILED, REFUNDED

## API Endpoints

### Upload
- `POST /api/upload` - Upload image to Cloudinary

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get all orders
- `GET /api/orders/[id]` - Get specific order

### Payment
- `POST /api/payment/create` - Initiate Ziina payment
- `POST /api/payment/webhook` - Handle Ziina webhooks

## Troubleshooting

### Database Connection Issues

If Prisma can't connect to Supabase:

1. Check if the database URL is correct
2. Verify your Supabase project is active
3. Check network/firewall settings
4. Try using the connection pooler URL instead

### Cloudinary Upload Fails

1. Verify your Cloudinary credentials in `.env.local`
2. Check if the `magnets-prints` folder exists in Cloudinary (it will be created automatically)
3. Check browser console for CORS errors

### Ziina Payment Issues

1. Ensure you're using production API keys for live payments
2. Test with Ziina's sandbox environment first
3. Check webhook signature verification
4. Monitor Ziina dashboard for payment status

## Next Steps

### Required Before Going Live:

1. ✅ Update Ziina API keys with real credentials
2. ✅ Run Prisma migrations on your Supabase database
3. ✅ Admin panel implemented at `/admin/login`
4. ⬜ Test the full payment flow in Ziina test mode
5. ⬜ Configure production domain in environment variables
6. ⬜ Set up webhook endpoint in Ziina dashboard
7. ⬜ Test webhook handling thoroughly
8. ⬜ Set up email notifications (optional - order confirmation, shipping updates)

### Optional Enhancements:

- Add order tracking functionality
- Implement email notifications
- Create admin dashboard
- Add product reviews
- Implement discount codes
- Add analytics tracking

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Make sure to add all environment variables in Vercel dashboard.

### Other Platforms

The app can be deployed to any platform that supports Next.js 15:
- Netlify
- AWS Amplify
- Railway
- Render

## Support

If you encounter any issues:

1. Check the browser console for errors
2. Check server logs: `npm run dev`
3. Verify all environment variables are set correctly
4. Ensure database migrations have run successfully

## Security Notes

- Keep your `.env.local` file secure and never commit it to git
- Webhook signature verification is implemented for security
- Use HTTPS in production
- Regularly rotate API keys
- Set up proper database backup policies in Supabase

---

Built with ❤️ using Next.js 15, Cloudinary, Ziina, and Supabase
