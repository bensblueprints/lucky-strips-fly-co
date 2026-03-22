import { neon } from '@neondatabase/serverless';

const DATABASE_URL = "postgresql://neondb_owner:npg_uWmpT8JMbDl2@ep-green-paper-aj7rfaoh.c-3.us-east-2.aws.neon.tech/neondb?sslmode=require";

const sql = neon(DATABASE_URL);

async function migrate() {
  console.log('Starting migration...');

  // Create customers table
  await sql`
    CREATE TABLE IF NOT EXISTS customers (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) NOT NULL UNIQUE,
      name VARCHAR(255) NOT NULL,
      phone VARCHAR(50),
      created_at TIMESTAMP DEFAULT NOW() NOT NULL
    )
  `;
  console.log('Created customers table');

  // Create bookings table
  await sql`
    CREATE TABLE IF NOT EXISTS bookings (
      id SERIAL PRIMARY KEY,
      customer_id INTEGER REFERENCES customers(id),
      trip_type VARCHAR(100) NOT NULL,
      trip_date DATE NOT NULL,
      party_size INTEGER DEFAULT 1 NOT NULL,
      total_amount NUMERIC(10, 2) NOT NULL,
      deposit_amount NUMERIC(10, 2),
      deposit_paid BOOLEAN DEFAULT FALSE NOT NULL,
      balance_paid BOOLEAN DEFAULT FALSE NOT NULL,
      status VARCHAR(50) DEFAULT 'pending' NOT NULL,
      notes TEXT,
      created_at TIMESTAMP DEFAULT NOW() NOT NULL
    )
  `;
  console.log('Created bookings table');

  // Create payments table
  await sql`
    CREATE TABLE IF NOT EXISTS payments (
      id SERIAL PRIMARY KEY,
      booking_id INTEGER REFERENCES bookings(id),
      amount NUMERIC(10, 2) NOT NULL,
      payment_type VARCHAR(50),
      stripe_payment_id VARCHAR(255),
      status VARCHAR(50) DEFAULT 'pending' NOT NULL,
      created_at TIMESTAMP DEFAULT NOW() NOT NULL
    )
  `;
  console.log('Created payments table');

  // Create invoices table
  await sql`
    CREATE TABLE IF NOT EXISTS invoices (
      id SERIAL PRIMARY KEY,
      booking_id INTEGER REFERENCES bookings(id),
      amount NUMERIC(10, 2) NOT NULL,
      due_date DATE,
      sent_at TIMESTAMP,
      paid_at TIMESTAMP,
      status VARCHAR(50) DEFAULT 'draft' NOT NULL
    )
  `;
  console.log('Created invoices table');

  // Create settings table
  await sql`
    CREATE TABLE IF NOT EXISTS settings (
      id SERIAL PRIMARY KEY,
      key VARCHAR(100) NOT NULL UNIQUE,
      value TEXT,
      updated_at TIMESTAMP DEFAULT NOW() NOT NULL
    )
  `;
  console.log('Created settings table');

  // Create admin_users table
  await sql`
    CREATE TABLE IF NOT EXISTS admin_users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NOT NULL,
      name VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT NOW() NOT NULL,
      last_login_at TIMESTAMP
    )
  `;
  console.log('Created admin_users table');

  // Insert default settings for deposit configuration
  await sql`
    INSERT INTO settings (key, value) VALUES
      ('deposit_type', 'percentage'),
      ('deposit_value', '25'),
      ('stripe_account_id', ''),
      ('stripe_connected', 'false')
    ON CONFLICT (key) DO NOTHING
  `;
  console.log('Inserted default settings');

  console.log('Migration completed successfully!');
}

migrate().catch(console.error);
