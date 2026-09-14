# FITZENIX Marketing Website

Official marketing site for FITZENIX — gym-management SaaS with Owner, Trainer, and Member apps.

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Razorpay (server-verified checkout)

## Setup

```bash
npm install
cp .env.example .env.local
```

Fill in Razorpay keys in `.env.local`:

- `NEXT_PUBLIC_RAZORPAY_KEY_ID` — safe for the browser
- `RAZORPAY_KEY_SECRET` — server only, never expose

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Pricing

All plan prices live in `src/config/pricing.ts`. The frontend only sends `planId`; the server calculates amount and currency.

## Payment flow

1. User selects a plan
2. Confirmation modal
3. `POST /api/payment/create-order`
4. Razorpay Checkout
5. `POST /api/payment/verify` (HMAC signature check)
6. Success / failure UI

## Scripts

- `npm run dev` — development
- `npm run build` — production build
- `npm run start` — start production server
- `npm run lint` — ESLint
