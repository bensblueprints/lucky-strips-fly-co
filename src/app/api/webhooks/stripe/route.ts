import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { neon } from '@neondatabase/serverless';
import Stripe from 'stripe';

const sql = neon(process.env.DATABASE_URL!);

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const bookingId = session.metadata?.bookingId;
        const depositAmount = session.metadata?.depositAmount;

        if (bookingId) {
          // Update booking status to confirmed and mark deposit as paid
          await sql`
            UPDATE bookings
            SET deposit_paid = true, status = 'confirmed'
            WHERE id = ${parseInt(bookingId)}
          `;

          // Record the payment
          await sql`
            INSERT INTO payments (
              booking_id,
              amount,
              payment_type,
              stripe_payment_id,
              status
            ) VALUES (
              ${parseInt(bookingId)},
              ${parseFloat(depositAmount || '0')},
              'deposit',
              ${session.payment_intent as string},
              'completed'
            )
          `;

          // Send invoice for remaining balance
          const invoices = await sql`
            SELECT id FROM invoices
            WHERE booking_id = ${parseInt(bookingId)}
            AND status = 'draft'
          `;

          if (invoices.length > 0) {
            await sql`
              UPDATE invoices
              SET status = 'sent', sent_at = NOW()
              WHERE id = ${invoices[0].id}
            `;
          }

          console.log(`Booking ${bookingId} confirmed, deposit paid`);
        }
        break;
      }

      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log(`PaymentIntent ${paymentIntent.id} succeeded`);
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const bookingId = paymentIntent.metadata?.bookingId;

        if (bookingId) {
          // Keep booking as pending if payment fails
          console.log(`Payment failed for booking ${bookingId}`);
        }
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook handler error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}
