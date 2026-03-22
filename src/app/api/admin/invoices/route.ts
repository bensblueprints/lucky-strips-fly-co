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

    const invoices = await sql`
      SELECT
        i.*,
        c.name as customer_name,
        c.email as customer_email,
        b.trip_type
      FROM invoices i
      LEFT JOIN bookings b ON i.booking_id = b.id
      LEFT JOIN customers c ON b.customer_id = c.id
      ORDER BY i.created_at DESC
    `;

    // Update status for overdue invoices
    const today = new Date().toISOString().split('T')[0];
    await sql`
      UPDATE invoices
      SET status = 'overdue'
      WHERE status = 'sent'
        AND due_date < ${today}
    `;

    return NextResponse.json({ invoices });
  } catch (error) {
    console.error('Invoices fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch invoices' },
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

    const { bookingId, amount, dueDate } = await request.json();

    const result = await sql`
      INSERT INTO invoices (booking_id, amount, due_date, status)
      VALUES (${bookingId}, ${amount}, ${dueDate}, 'draft')
      RETURNING id
    `;

    return NextResponse.json({
      success: true,
      invoiceId: result[0].id
    });
  } catch (error) {
    console.error('Invoice create error:', error);
    return NextResponse.json(
      { error: 'Failed to create invoice' },
      { status: 500 }
    );
  }
}
