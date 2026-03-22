import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import { getSession } from '@/lib/auth';

const sql = neon(process.env.DATABASE_URL!);

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const year = searchParams.get('year') || new Date().getFullYear();
    const month = searchParams.get('month') || new Date().getMonth() + 1;

    const bookings = await sql`
      SELECT
        b.id,
        b.customer_id,
        c.name as customer_name,
        c.email as customer_email,
        b.trip_type,
        b.trip_date,
        b.party_size,
        b.total_amount,
        b.deposit_amount,
        b.deposit_paid,
        b.balance_paid,
        b.status,
        b.notes,
        b.created_at
      FROM bookings b
      LEFT JOIN customers c ON b.customer_id = c.id
      WHERE EXTRACT(YEAR FROM b.trip_date) = ${year}
        AND EXTRACT(MONTH FROM b.trip_date) = ${month}
      ORDER BY b.trip_date ASC
    `;

    return NextResponse.json({ bookings });
  } catch (error) {
    console.error('Bookings fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    const {
      customerId,
      tripType,
      tripDate,
      partySize,
      totalAmount,
      depositAmount,
      notes
    } = data;

    const result = await sql`
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
        ${partySize},
        ${totalAmount},
        ${depositAmount},
        ${notes},
        'pending'
      )
      RETURNING id
    `;

    return NextResponse.json({
      success: true,
      bookingId: result[0].id
    });
  } catch (error) {
    console.error('Booking create error:', error);
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}
