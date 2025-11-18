# Email Notifications Setup Guide

This application uses [Resend](https://resend.com) to send email notifications when new orders are placed.

## Why Resend?

- **Simple API** - Easy to integrate and use
- **Reliable** - Built for developers with 99.9% uptime
- **Free Tier** - 3,000 emails/month for free
- **No Credit Card Required** - For the free tier
- **Modern** - Clean dashboard and great developer experience

## Setup Instructions

### 1. Create a Resend Account

1. Go to [https://resend.com](https://resend.com)
2. Click "Get Started" or "Sign Up"
3. Sign up with your email or GitHub account
4. Verify your email address

### 2. Get Your API Key

1. Log in to your Resend dashboard
2. Navigate to **API Keys** in the sidebar
3. Click **"Create API Key"**
4. Give it a name (e.g., "Magnets and Prints Production")
5. Select permissions: **"Sending access"**
6. Click **"Create"**
7. **Copy the API key** (it starts with `re_`)

### 3. Add API Key to Your Project

1. Open your `.env` file
2. Add or update the following line:
```env
RESEND_API_KEY="re_your_actual_api_key_here"
```

### 4. Verify Domain (For Production)

For production, you'll want to send emails from your own domain:

1. Go to **Domains** in Resend dashboard
2. Click **"Add Domain"**
3. Enter your domain (e.g., `magnetsandprints.com`)
4. Add the DNS records to your domain provider:
   - Add TXT record for SPF
   - Add CNAME records for DKIM
   - Add MX record (optional)
5. Wait for verification (usually takes a few minutes)

### 5. Update Sender Email

Once your domain is verified, update the sender email in:

`app/api/notifications/order/route.ts`

Change:
```typescript
from: 'Magnets & Prints <orders@magnetsandprints.com>',
```

To your verified domain:
```typescript
from: 'Magnets & Prints <orders@yourdomain.com>',
```

## Testing Email Notifications

### Development Testing

For development, Resend allows sending from their domain without verification:

1. Make sure `RESEND_API_KEY` is set in `.env`
2. Make sure `ORDER_NOTIFICATION_EMAIL` is set to your test email
3. Place a test order
4. Check your email inbox (and spam folder)

### What Gets Sent

When an order is placed, an email notification is sent to `ORDER_NOTIFICATION_EMAIL` with:

- Order number
- Total amount
- Customer information (name, email, phone)
- Shipping address
- Special instructions (if any)
- List of ordered items with details
- Link to admin dashboard

## Configuration Options

### Environment Variables

```env
# Required
RESEND_API_KEY="re_your_api_key"

# Email address to receive order notifications
ORDER_NOTIFICATION_EMAIL="magnetsandprints@gmail.com"

# Your app URL (for links in emails)
NEXT_PUBLIC_APP_URL="https://yourdomain.com"
```

### Customizing Email Template

The email template is in: `app/api/notifications/order/route.ts`

You can customize:
- Email subject
- HTML content
- Styling
- Information included

## Troubleshooting

### Email Not Sending

1. **Check API Key**: Verify it's correct in `.env`
2. **Check Logs**: Look for errors in terminal/Vercel logs
3. **Verify Domain**: Ensure domain is verified (for production)
4. **Check Spam**: Email might be in spam folder
5. **Rate Limits**: Free tier has limits (3,000/month)

### Email Goes to Spam

1. **Verify Domain**: Use a verified domain instead of Resend's
2. **Add SPF/DKIM**: Make sure DNS records are correct
3. **Content**: Avoid spam trigger words
4. **Sender Reputation**: Build up sending history gradually

### Common Errors

**"API key is invalid"**
- Double-check your API key in `.env`
- Make sure there are no extra spaces
- Generate a new key if needed

**"Domain not verified"**
- You must use a verified domain for production
- Or use Resend's onboarding domain for testing

**"Rate limit exceeded"**
- Free tier: 3,000 emails/month
- Upgrade plan if needed

## Resend Dashboard

Monitor your emails in the Resend dashboard:

- **Emails**: See all sent emails and their status
- **Logs**: View detailed logs and errors
- **Analytics**: Track delivery rates
- **API Keys**: Manage your keys
- **Domains**: Manage verified domains

## Alternative: Testing Without Resend

If you don't want to set up Resend right now:

1. Comment out the email notification code in `app/api/orders/route.ts`:
```typescript
// Send email notification (don't await - fire and forget)
/*
if (process.env.ORDER_NOTIFICATION_EMAIL) {
  fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/notifications/order`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ order, user: dbUser }),
  }).catch(() => {
    // Silently fail - order is already created
  });
}
*/
```

2. Orders will still be created and saved
3. You can view them in the admin dashboard
4. Enable email notifications later when ready

## Cost

- **Free Tier**: 3,000 emails/month
- **Pro Tier**: $20/month for 50,000 emails
- **More Info**: [https://resend.com/pricing](https://resend.com/pricing)

For most small businesses, the free tier is sufficient!

## Support

- **Resend Docs**: [https://resend.com/docs](https://resend.com/docs)
- **Resend Support**: Email support@resend.com
- **Community**: Discord community available

---

**Quick Start Checklist:**

- [ ] Create Resend account
- [ ] Get API key
- [ ] Add `RESEND_API_KEY` to `.env`
- [ ] Set `ORDER_NOTIFICATION_EMAIL` to your email
- [ ] Test by placing an order
- [ ] Verify domain for production (optional but recommended)
- [ ] Update sender email to your domain

That's it! Your email notifications are ready to go! 📧
