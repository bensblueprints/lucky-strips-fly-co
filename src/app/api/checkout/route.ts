import { NextRequest, NextResponse } from "next/server";
import { stripe, TRIP_PRODUCTS, TripType, PartySize } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      tripType,
      partySize,
      tripDate,
      customerName,
      customerEmail,
      customerPhone,
      experienceLevel,
      specialRequests,
    } = body;

    // Validate inputs
    if (!tripType || !partySize || !tripDate || !customerName || !customerEmail) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const trip = TRIP_PRODUCTS[tripType as TripType];
    if (!trip) {
      return NextResponse.json({ error: "Invalid trip type" }, { status: 400 });
    }

    const size = partySize as PartySize;
    const price = trip.prices[size];
    if (!price) {
      return NextResponse.json({ error: "Invalid party size" }, { status: 400 });
    }

    // Format the date for display
    const formattedDate = new Date(tripDate).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: trip.name,
              description: `${trip.description}\n\nDate: ${formattedDate}\nParty Size: ${partySize} ${partySize === 1 ? "person" : "people"}`,
              images: [`${siteUrl}/images/hero.jpg`],
            },
            unit_amount: price,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${siteUrl}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/book?cancelled=true`,
      customer_email: customerEmail,
      metadata: {
        tripType,
        partySize: String(partySize),
        tripDate,
        customerName,
        customerPhone: customerPhone || "",
        experienceLevel: experienceLevel || "",
        specialRequests: specialRequests || "",
      },
      payment_intent_data: {
        metadata: {
          tripType,
          partySize: String(partySize),
          tripDate,
          customerName,
          customerEmail,
        },
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
