import { NextRequest, NextResponse } from "next/server";
import { stripe, TRIP_PRODUCTS, TripType, PartySize } from "@/lib/stripe";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

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

    // Get deposit settings from database
    const settings = await sql`
      SELECT key, value FROM settings
      WHERE key IN ('deposit_type', 'deposit_value')
    `;

    let depositType = 'percentage';
    let depositValue = 25;

    for (const row of settings) {
      if (row.key === 'deposit_type') depositType = row.value;
      if (row.key === 'deposit_value') depositValue = parseFloat(row.value);
    }

    const totalAmount = price / 100; // Convert from cents
    const depositAmount = depositType === 'percentage'
      ? (totalAmount * depositValue / 100)
      : Math.min(depositValue, totalAmount);

    // Create or get customer in our database
    let customerId: number;
    const existingCustomer = await sql`
      SELECT id FROM customers WHERE email = ${customerEmail}
    `;

    if (existingCustomer.length > 0) {
      customerId = existingCustomer[0].id;
      await sql`
        UPDATE customers
        SET name = ${customerName}, phone = ${customerPhone || null}
        WHERE id = ${customerId}
      `;
    } else {
      const newCustomer = await sql`
        INSERT INTO customers (name, email, phone)
        VALUES (${customerName}, ${customerEmail}, ${customerPhone || null})
        RETURNING id
      `;
      customerId = newCustomer[0].id;
    }

    // Create booking in our database
    const notes = [
      experienceLevel ? `Experience: ${experienceLevel}` : '',
      specialRequests ? `Requests: ${specialRequests}` : '',
    ].filter(Boolean).join('\n');

    const booking = await sql`
      INSERT INTO bookings (
        customer_id,
        trip_type,
        trip_date,
        party_size,
        total_amount,
        deposit_amount,
        notes,
        status
      ) VALUES (
        ${customerId},
        ${trip.name},
        ${tripDate},
        ${partySize},
        ${totalAmount},
        ${depositAmount},
        ${notes || null},
        'pending'
      )
      RETURNING id
    `;

    const bookingId = booking[0].id;

    // Create invoice for remaining balance
    const balanceAmount = totalAmount - depositAmount;
    if (balanceAmount > 0) {
      const dueDate = new Date(tripDate);
      dueDate.setDate(dueDate.getDate() - 7);

      await sql`
        INSERT INTO invoices (booking_id, amount, due_date, status)
        VALUES (${bookingId}, ${balanceAmount}, ${dueDate.toISOString().split('T')[0]}, 'draft')
      `;
    }

    // Format the date for display
    const formattedDate = new Date(tripDate).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    // Create Stripe Checkout Session for deposit
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${trip.name} - Deposit`,
              description: `Deposit for ${trip.name}\n\nDate: ${formattedDate}\nParty Size: ${partySize} ${partySize === 1 ? "person" : "people"}\n\nTotal Trip: $${totalAmount.toFixed(2)}\nDeposit: $${depositAmount.toFixed(2)}\nBalance Due: $${balanceAmount.toFixed(2)}`,
              images: [`${siteUrl}/images/hero.jpg`],
            },
            unit_amount: Math.round(depositAmount * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${siteUrl}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/book?cancelled=true`,
      customer_email: customerEmail,
      metadata: {
        bookingId: String(bookingId),
        tripType,
        partySize: String(partySize),
        tripDate,
        customerName,
        customerPhone: customerPhone || "",
        experienceLevel: experienceLevel || "",
        specialRequests: specialRequests || "",
        depositAmount: String(depositAmount),
        totalAmount: String(totalAmount),
      },
      payment_intent_data: {
        metadata: {
          bookingId: String(bookingId),
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
