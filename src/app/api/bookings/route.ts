import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const {
      name,
      email,
      phone,
      tripType,
      tripDate,
      partySize,
      notes
    } = data;

    if (!name || !email || !tripType || !tripDate) {
      return NextResponse.json(
        { error: 'Name, email, trip type, and date are required' },
        { status: 400 }
      );
    }

    // Get trip pricing
    const tripPrices: Record<string, Record<number, number>> = {
      'smith-river-full-day': { 1: 375, 2: 475 },
      'smith-river-half-day': { 1: 300, 2: 375 },
      'new-river-full-day': { 1: 400, 2: 500 },
      'casting-instruction': { 1: 75, 2: 150 },
    };

    const guests = Math.min(Math.max(parseInt(partySize) || 1, 1), 2);
    const basePrice = tripPrices[tripType]?.[guests] || 375;

    // Get deposit settings
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

    const depositAmount = depositType === 'percentage'
      ? (basePrice * depositValue / 100)
      : Math.min(depositValue, basePrice);

    // Create or get customer
    let customerId: number;
    const existingCustomer = await sql`
      SELECT id FROM customers WHERE email = ${email}
    `;

    if (existingCustomer.length > 0) {
      customerId = existingCustomer[0].id;
      // Update name/phone if provided
      await sql`
        UPDATE customers
        SET name = ${name}, phone = ${phone || null}
        WHERE id = ${customerId}
      `;
    } else {
      const newCustomer = await sql`
        INSERT INTO customers (name, email, phone)
        VALUES (${name}, ${email}, ${phone || null})
        RETURNING id
      `;
      customerId = newCustomer[0].id;
    }

    // Create booking
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
        ${tripType},
        ${tripDate},
        ${guests},
        ${basePrice},
        ${depositAmount},
        ${notes || null},
        'pending'
      )
      RETURNING id
    `;

    // Create invoice for remaining balance
    const balanceAmount = basePrice - depositAmount;
    if (balanceAmount > 0) {
      const dueDate = new Date(tripDate);
      dueDate.setDate(dueDate.getDate() - 7); // Due 7 days before trip

      await sql`
        INSERT INTO invoices (booking_id, amount, due_date, status)
        VALUES (${booking[0].id}, ${balanceAmount}, ${dueDate.toISOString().split('T')[0]}, 'draft')
      `;
    }

    return NextResponse.json({
      success: true,
      bookingId: booking[0].id,
      totalAmount: basePrice,
      depositAmount: depositAmount,
      balanceAmount: balanceAmount,
    });
  } catch (error) {
    console.error('Booking error:', error);
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}
