import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import { getSession } from '@/lib/auth';

const sql = neon(process.env.DATABASE_URL!);

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    const invoices = await sql`
      SELECT
        i.*,
        c.name as customer_name,
        c.email as customer_email,
        c.phone as customer_phone,
        b.trip_type,
        b.trip_date,
        b.total_amount as booking_total
      FROM invoices i
      LEFT JOIN bookings b ON i.booking_id = b.id
      LEFT JOIN customers c ON b.customer_id = c.id
      WHERE i.id = ${id}
    `;

    if (invoices.length === 0) {
      return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
    }

    return NextResponse.json({ invoice: invoices[0] });
  } catch (error) {
    console.error('Invoice fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch invoice' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const data = await request.json();

    if (data.status) {
      await sql`
        UPDATE invoices
        SET status = ${data.status}
        WHERE id = ${id}
      `;
    }

    if (data.paid_at) {
      await sql`
        UPDATE invoices
        SET paid_at = ${data.paid_at}
        WHERE id = ${id}
      `;

      // Also update booking balance_paid status
      const invoice = await sql`
        SELECT booking_id FROM invoices WHERE id = ${id}
      `;
      if (invoice.length > 0) {
        await sql`
          UPDATE bookings
          SET balance_paid = true
          WHERE id = ${invoice[0].booking_id}
        `;
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Invoice update error:', error);
    return NextResponse.json(
      { error: 'Failed to update invoice' },
      { status: 500 }
    );
  }
}
