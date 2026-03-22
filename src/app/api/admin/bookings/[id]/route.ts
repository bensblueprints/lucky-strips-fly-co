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

    const bookings = await sql`
      SELECT
        b.*,
        c.name as customer_name,
        c.email as customer_email,
        c.phone as customer_phone
      FROM bookings b
      LEFT JOIN customers c ON b.customer_id = c.id
      WHERE b.id = ${id}
    `;

    if (bookings.length === 0) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    // Get related payments
    const payments = await sql`
      SELECT * FROM payments
      WHERE booking_id = ${id}
      ORDER BY created_at DESC
    `;

    // Get related invoices
    const invoices = await sql`
      SELECT * FROM invoices
      WHERE booking_id = ${id}
      ORDER BY created_at DESC
    `;

    return NextResponse.json({
      booking: bookings[0],
      payments,
      invoices
    });
  } catch (error) {
    console.error('Booking fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch booking' },
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

    // Build dynamic update query
    const updates: string[] = [];
    const values: Record<string, unknown> = { id: parseInt(id) };

    if (data.status !== undefined) {
      updates.push('status');
      values.status = data.status;
    }
    if (data.depositPaid !== undefined) {
      updates.push('deposit_paid');
      values.deposit_paid = data.depositPaid;
    }
    if (data.balancePaid !== undefined) {
      updates.push('balance_paid');
      values.balance_paid = data.balancePaid;
    }
    if (data.notes !== undefined) {
      updates.push('notes');
      values.notes = data.notes;
    }

    if (updates.length === 0) {
      return NextResponse.json({ error: 'No updates provided' }, { status: 400 });
    }

    // Simple update for status
    if (data.status) {
      await sql`
        UPDATE bookings
        SET status = ${data.status}
        WHERE id = ${id}
      `;
    }

    if (data.depositPaid !== undefined) {
      await sql`
        UPDATE bookings
        SET deposit_paid = ${data.depositPaid}
        WHERE id = ${id}
      `;
    }

    if (data.balancePaid !== undefined) {
      await sql`
        UPDATE bookings
        SET balance_paid = ${data.balancePaid}
        WHERE id = ${id}
      `;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Booking update error:', error);
    return NextResponse.json(
      { error: 'Failed to update booking' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    // Delete related records first
    await sql`DELETE FROM payments WHERE booking_id = ${id}`;
    await sql`DELETE FROM invoices WHERE booking_id = ${id}`;
    await sql`DELETE FROM bookings WHERE id = ${id}`;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Booking delete error:', error);
    return NextResponse.json(
      { error: 'Failed to delete booking' },
      { status: 500 }
    );
  }
}
