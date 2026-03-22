import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import { getSession } from '@/lib/auth';

const sql = neon(process.env.DATABASE_URL!);

export async function GET() {
  try {
    // Check authentication
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get total bookings
    const bookingsResult = await sql`SELECT COUNT(*) as count FROM bookings`;
    const totalBookings = parseInt(bookingsResult[0].count) || 0;

    // Get total customers
    const customersResult = await sql`SELECT COUNT(*) as count FROM customers`;
    const totalCustomers = parseInt(customersResult[0].count) || 0;

    // Get total revenue (from paid payments)
    const revenueResult = await sql`
      SELECT COALESCE(SUM(amount), 0) as total
      FROM payments
      WHERE status = 'completed'
    `;
    const revenue = parseFloat(revenueResult[0].total) || 0;

    // Get pending invoices count
    const invoicesResult = await sql`
      SELECT COUNT(*) as count
      FROM invoices
      WHERE status IN ('draft', 'sent')
    `;
    const pendingInvoices = parseInt(invoicesResult[0].count) || 0;

    // Get recent bookings
    const recentBookings = await sql`
      SELECT
        b.id,
        c.name as customer_name,
        b.trip_type,
        b.trip_date,
        b.status
      FROM bookings b
      LEFT JOIN customers c ON b.customer_id = c.id
      ORDER BY b.created_at DESC
      LIMIT 5
    `;

    return NextResponse.json({
      totalBookings,
      totalCustomers,
      revenue,
      pendingInvoices,
      recentBookings,
    });
  } catch (error) {
    console.error('Stats error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}
