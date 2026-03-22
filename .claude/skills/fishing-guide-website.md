# Fishing Guide Website Builder Skill

## Overview
This skill helps you build and deploy professional fishing guide websites with booking systems, Stripe payments, and admin dashboards.

## Project Template
- **Tech Stack**: Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion
- **Database**: Neon DB (PostgreSQL)
- **Payments**: Stripe Connect
- **Hosting**: Netlify
- **Design**: Premium "Heritage Outdoors Luxury" aesthetic

## Deployment Info
- **Netlify Account**: Root Access (token: nfp_VRPQQLqfaomspyfugrJ2FwGJnDUu2JpRc284)
- **GitHub Account**: bensblueprints
- **Site URL**: https://lucky-strips-flyfishing.netlify.app
- **Site ID**: cdc5a728-977f-46c8-8a2a-5c3119c3d268

## Color Palette (Fishing Guide Theme)
```css
/* Gold/Bronze - Primary accent */
gold-50: #fdfbf7
gold-100: #f9f3e3
gold-200: #f0e4c3
gold-300: #e5d19c
gold-400: #d4b56e
gold-500: #c4994a  /* Primary */
gold-600: #b07f33
gold-700: #93662b
gold-800: #7a5328
gold-900: #664525

/* Earth Tones - Background/Text */
earth-50: #faf9f7
earth-100: #f3f1ed
earth-200: #e5e1d9
earth-300: #d2ccc0
earth-400: #b5aa99
earth-500: #998c79
earth-600: #7d7062
earth-700: #665a4f
earth-800: #544a41  /* Dark text */
earth-900: #463e36
earth-950: #2a2520  /* Darkest */

/* River Blues - Accent */
river-50: #f0f7fa
river-500: #5b95a8
river-600: #4a7f91
river-700: #3d6978
```

## Trip Pricing Structure
### Smith River Trout Trips
| Trip | 1 Person | 2 People |
|------|----------|----------|
| Full Day (7-8 hrs) | $375 | $475 |
| Half Day (4-5 hrs) | $300 | $375 |

### New River Smallmouth Trips
| Trip | 1 Person | 2 People |
|------|----------|----------|
| Full Day (7-8 hrs) | $400 | $500 |

### Additional Services
- Casting Instruction: $75/hour

## Required Pages
1. **Home** - Hero, rivers overview, featured trips, testimonials, CTA
2. **Trips** - All trip packages with pricing, FAQs
3. **About** - Guide story, credentials, conservation focus
4. **Gallery** - Photo gallery with lightbox, category filters
5. **Contact** - Contact form, phone, email, map
6. **Book** - Booking form with Stripe checkout
7. **Admin Dashboard** (protected):
   - Bookings calendar view
   - Customer management
   - Invoice creation (deposit + balance)
   - Payment tracking
   - Stripe Connect settings

## Admin Features
1. **Stripe Connect** - For collecting deposits
2. **Deposit Options**:
   - Percentage (e.g., 25%, 50%)
   - Flat fee (e.g., $100)
3. **Invoice System**:
   - Send invoice for remaining balance
   - Track paid/unpaid status
4. **Calendar View** - See all bookings at a glance

## Database Schema (Neon DB)
```sql
-- Customers
CREATE TABLE customers (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Bookings
CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  customer_id INTEGER REFERENCES customers(id),
  trip_type VARCHAR(100) NOT NULL,
  trip_date DATE NOT NULL,
  party_size INTEGER DEFAULT 1,
  total_amount DECIMAL(10,2) NOT NULL,
  deposit_amount DECIMAL(10,2),
  deposit_paid BOOLEAN DEFAULT FALSE,
  balance_paid BOOLEAN DEFAULT FALSE,
  status VARCHAR(50) DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Payments
CREATE TABLE payments (
  id SERIAL PRIMARY KEY,
  booking_id INTEGER REFERENCES bookings(id),
  amount DECIMAL(10,2) NOT NULL,
  payment_type VARCHAR(50), -- deposit, balance, full
  stripe_payment_id VARCHAR(255),
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Invoices
CREATE TABLE invoices (
  id SERIAL PRIMARY KEY,
  booking_id INTEGER REFERENCES bookings(id),
  amount DECIMAL(10,2) NOT NULL,
  due_date DATE,
  sent_at TIMESTAMP,
  paid_at TIMESTAMP,
  status VARCHAR(50) DEFAULT 'draft'
);

-- Settings
CREATE TABLE settings (
  id SERIAL PRIMARY KEY,
  key VARCHAR(100) UNIQUE NOT NULL,
  value TEXT,
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## Animation Guidelines (Performance)
- Use simple fade-in animations (opacity + translateY)
- Avoid parallax scroll effects (causes jank)
- Use `viewport={{ once: true }}` on all whileInView
- Keep animation duration under 0.5s
- Use CSS `animate-bounce` instead of JS for scroll indicator
- Minimize nested motion components

## Deployment Checklist
1. Verify site ID matches: `cdc5a728-977f-46c8-8a2a-5c3119c3d268`
2. Run `npm run build` - must complete without errors
3. Get authorization code 777 from Ben
4. Deploy: `NETLIFY_AUTH_TOKEN="nfp_VRPQQLqfaomspyfugrJ2FwGJnDUu2JpRc284" netlify deploy --prod`
5. Push to GitHub: `bensblueprints/lucky-strips-fly-co`

## Contact Information (Client)
- **Business**: Lucky Strips Fly Co. LLC
- **Phone**: (276) 732-0517
- **Email**: luckystripsflyco@gmail.com
- **Location**: Smith River, Bassett, Virginia
- **Social**: @luckystripsflyco (Facebook, Instagram)
