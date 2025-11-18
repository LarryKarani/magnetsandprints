# Magnets and Prints 🧲

A modern e-commerce platform for creating and ordering custom photo magnets. Built with Next.js 14, TypeScript, Prisma, and Supabase.

## Features

- 📸 **Custom Photo Upload** - Upload and customize your photos with different sizes, finishes, and borders
- 🛒 **Shopping Cart** - Full-featured cart with quantity management
- 💳 **Payment Integration** - Secure payments via Ziina Payment Gateway
- 👨‍💼 **Admin Dashboard** - Comprehensive order management system
- 📱 **Responsive Design** - Beautiful UI that works on all devices
- ☁️ **Cloud Storage** - Image hosting via Cloudinary
- 🗄️ **PostgreSQL Database** - Powered by Supabase

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL (Supabase)
- **ORM**: Prisma
- **File Upload**: Cloudinary
- **Payment**: Ziina Payment Gateway
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **State Management**: Zustand

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account
- Cloudinary account
- Ziina account

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd magnets-and-prints
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:

Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://[USER]:[PASSWORD]@[HOST]:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://[USER]:[PASSWORD]@[HOST]:5432/postgres"

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"

# Ziina Payment
ZIINA_API_KEY="your_ziina_api_key"
ZIINA_TEST_MODE="true"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
ADMIN_EMAIL="admin@magnetsandprints.com"
ADMIN_PASSWORD="your_secure_password"
```

4. Set up the database:
```bash
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Schema

The application uses the following models:

- **User** - Customer information
- **Order** - Order details and status
- **OrderItem** - Individual items in an order
- **Admin** - Admin user authentication

## Environment Variables Guide

### Database Configuration

For Supabase:
- `DATABASE_URL`: Connection pooler URL (port 6543) for Prisma Client
- `DIRECT_URL`: Direct connection URL (port 5432) for migrations

Get these from: Supabase Dashboard → Settings → Database → Connection String

### Cloudinary Configuration

1. Sign up at [cloudinary.com](https://cloudinary.com)
2. Get your credentials from the Dashboard
3. Enable unsigned uploads for your upload preset

### Ziina Payment Configuration

1. Sign up at [ziina.com](https://ziina.com)
2. Get API credentials from your dashboard
3. Set `ZIINA_TEST_MODE="true"` for testing
4. Set `ZIINA_TEST_MODE="false"` for production

### Admin Configuration

- Set a secure password for `ADMIN_PASSWORD`
- On first login, an admin user will be created automatically

### Email Notifications Configuration

1. Sign up at [resend.com](https://resend.com)
2. Get your API key from the dashboard
3. Set `RESEND_API_KEY` in your `.env` file
4. Set `ORDER_NOTIFICATION_EMAIL` to the email address where you want to receive order notifications

**Features:**
- Automatic email notifications when new orders are placed
- Includes order details, customer info, and shipping address
- Configurable recipient email address

## Admin Panel

Access the admin panel at `/admin/login`

**Features:**
- View all orders
- Update order status
- Update payment status
- View customer details
- View order items and shipping information

**Default credentials:**
- Email: Set in `ADMIN_EMAIL`
- Password: Set in `ADMIN_PASSWORD`

## Project Structure

```
├── app/
│   ├── admin/           # Admin dashboard
│   ├── api/             # API routes
│   ├── cart/            # Shopping cart
│   ├── payment/         # Payment pages
│   ├── upload/          # Photo upload
│   └── page.tsx         # Homepage
├── components/
│   ├── layout/          # Layout components
│   └── ui/              # UI components (shadcn)
├── lib/
│   ├── prisma.ts        # Prisma client
│   ├── store.ts         # Zustand store
│   └── utils.ts         # Utility functions
├── prisma/
│   └── schema.prisma    # Database schema
└── public/              # Static files
```

## API Routes

### Public Routes
- `POST /api/upload` - Upload images to Cloudinary
- `POST /api/orders` - Create new order
- `GET /api/orders/[id]` - Get order details
- `POST /api/payment/create` - Create payment intent
- `POST /api/payment/webhook` - Ziina webhook handler

### Admin Routes (Protected)
- `POST /api/admin/auth` - Admin authentication
- `GET /api/admin/orders` - Get all orders
- `PATCH /api/admin/orders` - Update order status

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Environment Variables for Production

Make sure to update:
- `NEXT_PUBLIC_APP_URL` to your production domain
- `ZIINA_TEST_MODE="false"` for live payments
- Update success/cancel URLs in payment integration

### Database Migration

For production:
```bash
npx prisma db push
```

## Product Sizes & Pricing

- **2" x 2"** - $3.99
- **3" x 3"** - $5.99
- **4" x 4"** - $7.99
- **2" x 6"** - $9.99

All sizes available in:
- Matte or Glossy finish
- With or without border

## Payment Flow

1. Customer adds items to cart
2. Fills checkout form
3. Order created in database
4. Redirected to Ziina payment page
5. After payment:
   - Success → `/payment/success`
   - Cancel/Failure → `/payment/cancelled`
6. Webhook updates order status

## Security

- Admin routes protected with token authentication
- Password hashing for admin users
- Environment variables for sensitive data
- HTTPS required for production
- Webhook signature verification

## Support

For issues or questions, please open an issue on GitHub.

## License

MIT License - feel free to use this project for your own purposes.

---

Made with ❤️ using Next.js and TypeScript
