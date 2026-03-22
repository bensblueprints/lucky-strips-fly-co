# Fishing Guide Website Template

## Quick Start Guide for Building Fishing Guide Websites

This template provides everything needed to build a professional fishing guide website with booking, payments, and admin dashboard.

---

## 1. Project Setup

### Clone the template
```bash
# Clone from lucky-strips-fly-co as base
git clone https://github.com/bensblueprints/lucky-strips-fly-co.git [new-guide-name]
cd [new-guide-name]

# Remove old git history and start fresh
rm -rf .git
git init
git remote add origin https://github.com/bensblueprints/[new-guide-name].git
```

### Install dependencies
```bash
npm install
```

### Environment variables
Create `.env.local`:
```env
# Neon DB
DATABASE_URL=postgresql://[user]:[password]@[host]/[database]?sslmode=require
NEON_API_KEY=napi_xxxxxxxxxxxx

# Stripe
STRIPE_SECRET_KEY=sk_live_xxxxxxxxxxxx
STRIPE_PUBLISHABLE_KEY=pk_live_xxxxxxxxxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxx

# App
NEXT_PUBLIC_SITE_URL=https://[site-name].netlify.app
ADMIN_EMAIL=[admin-email]
ADMIN_PASSWORD_HASH=[bcrypt-hash]
```

---

## 2. Customization Checklist

### Business Information
Update these files with client details:

- [ ] `src/components/Header.tsx` - Logo, business name
- [ ] `src/components/Footer.tsx` - Contact info, social links
- [ ] `src/app/page.tsx` - Hero text, rivers, services
- [ ] `src/app/trips/page.tsx` - Trip packages and pricing
- [ ] `src/app/about/page.tsx` - Guide bio and story
- [ ] `src/app/contact/page.tsx` - Contact info, map location
- [ ] `public/images/` - Replace all images

### Color Palette
Update `tailwind.config.ts` with brand colors:
```js
// Example: Change gold to blue for saltwater guides
colors: {
  primary: {
    50: '#f0f7fa',
    500: '#5b95a8',
    600: '#4a7f91',
  }
}
```

### Trip Types
Modify `src/app/trips/page.tsx`:
```typescript
const trips = [
  {
    id: "inshore-full-day",
    name: "Full Day Inshore Trip",
    duration: "8 Hours",
    price: 600,
    guests: 2,
    description: "Target redfish, trout, and flounder...",
    includes: ["All tackle", "Licenses", "Lunch", "Photos"],
  },
  // Add more trips...
];
```

---

## 3. Pages Overview

### Public Pages

| Page | Route | Purpose |
|------|-------|---------|
| Home | `/` | Landing page with hero, featured trips, testimonials |
| Trips | `/trips` | All trip packages with pricing and FAQs |
| About | `/about` | Guide story, credentials, conservation |
| Gallery | `/gallery` | Photo gallery with filters and lightbox |
| Contact | `/contact` | Contact form, phone, email, map |
| Book | `/book` | Booking form with trip selection |

### Admin Pages

| Page | Route | Purpose |
|------|-------|---------|
| Dashboard | `/admin` | Overview, stats, recent bookings |
| Bookings | `/admin/bookings` | Calendar view, manage bookings |
| Customers | `/admin/customers` | Customer database |
| Invoices | `/admin/invoices` | Create/send invoices |
| Settings | `/admin/settings` | Stripe connect, deposit settings |

---

## 4. Database Setup (Neon DB)

### Create database
1. Go to https://console.neon.tech
2. Create new project
3. Copy connection string to `.env.local`

### Run migrations
```bash
npm run db:migrate
```

### Database schema
```sql
-- Core tables
customers (id, email, name, phone, created_at)
bookings (id, customer_id, trip_type, trip_date, party_size, total_amount,
          deposit_amount, deposit_paid, balance_paid, status, notes, created_at)
payments (id, booking_id, amount, payment_type, stripe_payment_id, status, created_at)
invoices (id, booking_id, amount, due_date, sent_at, paid_at, status)
settings (id, key, value, updated_at)
```

---

## 5. Stripe Integration

### Connect Stripe
1. Create Stripe account for client
2. Get API keys from Stripe Dashboard
3. Add to `.env.local`

### Deposit Settings
Configure in admin dashboard:
- Deposit type: percentage or flat
- Deposit amount: 25-50% or $100-200
- Auto-send invoice for balance

### Payment Flow
1. Customer selects trip and date
2. System calculates deposit
3. Stripe Checkout for deposit
4. Confirmation email sent
5. Invoice for remaining balance sent
6. Balance collected before trip

---

## 6. Design Guidelines

### Typography
- Headlines: Playfair Display (serif)
- Body: Instrument Sans (sans-serif)

### Spacing
- Section padding: `py-16 md:py-24`
- Container max-width: `max-w-7xl`

### Animation Performance
```jsx
// DO: Simple fade animations
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.4 }}
>

// DON'T: Parallax or scroll-linked
const { scrollYProgress } = useScroll(); // AVOID
```

### Image Optimization
- Use Next.js Image component
- Hero images: priority loading
- Gallery: lazy loading
- Format: WebP preferred

---

## 7. Deployment

### Netlify Setup
1. Create site in Netlify
2. Link to GitHub repo
3. Set environment variables
4. Deploy

### Deploy Command
```bash
# Get authorization code 777 from Ben first!
NETLIFY_AUTH_TOKEN="nfp_VRPQQLqfaomspyfugrJ2FwGJnDUu2JpRc284" netlify deploy --prod
```

### DNS (Cloudflare)
```
A     @    75.2.60.5 (proxied)
CNAME www  [site-name].netlify.app (proxied)
```

---

## 8. Maintenance

### Regular Updates
- Keep dependencies updated
- Monitor Stripe webhook logs
- Backup database weekly
- Check SSL cert expiry

### Support Contacts
- Ben: ben@justfeatured.com
- Netlify: app.netlify.com
- Stripe: dashboard.stripe.com
- Neon: console.neon.tech

---

## 9. Example Clients

### Freshwater Guides
- Trout fishing (tailwaters, mountain streams)
- Bass fishing (lakes, rivers)
- Musky/pike (northern lakes)

### Saltwater Guides
- Inshore (redfish, trout, flounder)
- Offshore (tuna, marlin, mahi)
- Flats (tarpon, bonefish, permit)

### Specialty
- Fly fishing only
- Multi-day trips
- Lodging packages
- Tournament fishing

---

## 10. Files to Update Per Client

```
src/
├── app/
│   ├── page.tsx           # Hero, rivers, testimonials
│   ├── trips/page.tsx     # Trip packages, pricing
│   ├── about/page.tsx     # Guide story
│   ├── contact/page.tsx   # Contact info
│   └── gallery/page.tsx   # Photo categories
├── components/
│   ├── Header.tsx         # Logo, nav
│   └── Footer.tsx         # Contact, social
public/
├── images/
│   ├── logo.png          # Client logo
│   ├── hero.jpg          # Main hero image
│   ├── gallery-*.jpg     # Gallery photos
│   └── guide.jpg         # Guide photo
.env.local                 # API keys, DB
tailwind.config.ts         # Brand colors
```

---

## Quick Reference

| Task | Command |
|------|---------|
| Dev server | `npm run dev` |
| Build | `npm run build` |
| Deploy | `netlify deploy --prod` |
| DB migrate | `npm run db:migrate` |
| Type check | `npm run type-check` |

---

*Last updated: March 2026*
*Template version: 1.0.0*
