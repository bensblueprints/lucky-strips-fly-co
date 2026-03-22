import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import { getSession } from '@/lib/auth';

const sql = neon(process.env.DATABASE_URL!);

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const customers = await sql`
      SELECT
        c.*,
        COUNT(b.id) as booking_count,
        COALESCE(SUM(
          CASE WHEN b.deposit_paid OR b.balance_paid THEN b.total_amount ELSE 0 END
        ), 0) as total_spent
      FROM customers c
      LEFT JOIN bookings b ON c.id = b.customer_id
      GROUP BY c.id
      ORDER BY c.created_at DESC
    `;

    return NextResponse.json({ customers });
  } catch (error) {
    console.error('Customers fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch customers' },
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

    const { name, email, phone } = await request.json();

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    const result = await sql`
      INSERT INTO customers (name, email, phone)
      VALUES (${name}, ${email}, ${phone || null})
      RETURNING id
    `;

    return NextResponse.json({
      success: true,
      customerId: result[0].id
    });
  } catch (error) {
    console.error('Customer create error:', error);
    return NextResponse.json(
      { error: 'Failed to create customer' },
      { status: 500 }
    );
  }
}
