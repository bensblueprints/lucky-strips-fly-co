import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-02-25.clover",
  typescript: true,
});

export const TRIP_PRODUCTS = {
  "half-day": {
    name: "Half Day Float Trip",
    description: "4.5 hours of guided fly fishing on the Smith River",
    prices: {
      1: 27500, // $275 in cents
      2: 37500, // $375 in cents
    },
  },
  "full-day": {
    name: "Full Day Float Trip",
    description: "7-8 hours of guided fly fishing with lunch included",
    prices: {
      1: 40000, // $400 in cents
      2: 50000, // $500 in cents
    },
  },
} as const;

export type TripType = keyof typeof TRIP_PRODUCTS;
export type PartySize = 1 | 2;
