# Production Deployment Checklist

## Pre-Deployment

### Environment Variables
- [ ] Update `NEXT_PUBLIC_APP_URL` to production domain
- [ ] Set `ZIINA_TEST_MODE="false"` for live payments
- [ ] Verify all Supabase credentials are correct
- [ ] Verify all Cloudinary credentials are correct
- [ ] Verify all Ziina credentials are correct
- [ ] Change `ADMIN_PASSWORD` to a strong, unique password
- [ ] Ensure `.env` is in `.gitignore`

### Database
- [ ] Run `npx prisma db push` on production database
- [ ] Test database connection
- [ ] Verify all tables are created correctly
- [ ] Set up database backups in Supabase

### Payment Integration
- [ ] Switch Ziina to production API keys
- [ ] Test payment flow in test mode first
- [ ] Configure webhook URL in Ziina dashboard: `https://yourdomain.com/api/payment/webhook`
- [ ] Select webhook events: `payment.succeeded`, `payment.failed`, `payment.refunded`
- [ ] Verify webhook signature validation is working
- [ ] Test successful payment flow
- [ ] Test failed payment flow
- [ ] Test cancelled payment flow

### Security
- [ ] Enable HTTPS/SSL certificate
- [ ] Review admin authentication
- [ ] Verify API routes are properly protected
- [ ] Test webhook signature verification
- [ ] Review CORS settings
- [ ] Scan for exposed secrets in code

### Code Quality
- [ ] All console logs removed ✅
- [ ] No TODO comments in production code
- [ ] Error handling implemented for all API routes
- [ ] Test file removed ✅
- [ ] README updated ✅

### Testing
- [ ] Test image upload functionality
- [ ] Test cart add/remove/update
- [ ] Test complete checkout flow
- [ ] Test payment success redirect
- [ ] Test payment cancel redirect
- [ ] Test admin login
- [ ] Test admin dashboard
- [ ] Test order status updates
- [ ] Test mobile responsiveness
- [ ] Test on different browsers (Chrome, Safari, Firefox)

### Performance
- [ ] Optimize images (Next.js Image component configured ✅)
- [ ] Enable caching headers
- [ ] Test page load speeds
- [ ] Verify Cloudinary image optimization

## Deployment

### Vercel Deployment
- [ ] Connect GitHub repository to Vercel
- [ ] Configure environment variables in Vercel dashboard
- [ ] Set production domain
- [ ] Deploy to production
- [ ] Verify deployment successful
- [ ] Test production URL

### Post-Deployment
- [ ] Test complete user flow on production
- [ ] Verify Ziina webhook is receiving events
- [ ] Check database for test orders
- [ ] Monitor error logs
- [ ] Set up uptime monitoring
- [ ] Configure custom domain (if applicable)

## Monitoring

### Setup Monitoring Tools
- [ ] Set up error tracking (Sentry, LogRocket, etc.)
- [ ] Set up analytics (Google Analytics, Plausible, etc.)
- [ ] Monitor payment gateway dashboard
- [ ] Set up alerts for failed payments
- [ ] Monitor database performance in Supabase

### Regular Maintenance
- [ ] Backup database regularly
- [ ] Monitor server costs
- [ ] Review error logs weekly
- [ ] Update dependencies monthly
- [ ] Rotate API keys quarterly

## Support

### Customer Support Setup
- [ ] Add contact email to footer
- [ ] Create FAQ page (optional)
- [ ] Set up customer support email
- [ ] Add terms of service
- [ ] Add privacy policy
- [ ] Add refund policy

## Legal & Compliance

- [ ] Add privacy policy
- [ ] Add terms of service
- [ ] Add shipping policy
- [ ] Add return/refund policy
- [ ] Ensure GDPR compliance (if applicable)
- [ ] Add cookie consent banner (if required)

## Marketing

- [ ] Set up social media links
- [ ] Configure SEO metadata
- [ ] Add Open Graph tags
- [ ] Create sitemap.xml
- [ ] Submit to Google Search Console
- [ ] Set up email marketing (optional)

## Admin Access

### Admin Panel Setup
- [ ] Create admin account via first login
- [ ] Test admin login at `/admin/login`
- [ ] Verify all orders are visible
- [ ] Test order status updates
- [ ] Test payment status updates
- [ ] Document admin procedures for team

### Admin Credentials
- Email: (from `ADMIN_EMAIL` env var)
- Password: (from `ADMIN_PASSWORD` env var)
- **⚠️ Change default password immediately after first login**

## Emergency Contacts

- **Hosting**: Vercel Support
- **Database**: Supabase Support
- **Payment**: Ziina Support
- **CDN**: Cloudinary Support

## Rollback Plan

If something goes wrong:
1. Revert to previous deployment in Vercel
2. Check error logs
3. Verify environment variables
4. Test database connection
5. Contact support if needed

---

## Final Checks

Before going live:
- [ ] All checklist items completed
- [ ] Test order placed successfully
- [ ] Payment processed correctly
- [ ] Order appears in admin dashboard
- [ ] Customer receives confirmation
- [ ] Database updated correctly

**Go Live Date**: _________________

**Deployed By**: _________________

**Notes**:
_________________________________________
_________________________________________
_________________________________________
