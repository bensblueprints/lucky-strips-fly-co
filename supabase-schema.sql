-- Lucky Strips Fly Co Database Schema
-- Run this in Supabase SQL Editor

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Customer info
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,

  -- Trip details
  trip_type TEXT NOT NULL CHECK (trip_type IN ('half-day', 'full-day')),
  trip_date DATE NOT NULL,
  party_size INTEGER NOT NULL CHECK (party_size >= 1 AND party_size <= 2),
  experience_level TEXT CHECK (experience_level IN ('beginner', 'intermediate', 'advanced')),
  special_requests TEXT,

  -- Pricing
  base_price DECIMAL(10,2) NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,

  -- Payment
  stripe_payment_intent_id TEXT,
  stripe_session_id TEXT,
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),

  -- Booking status
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed'))
);

-- Blocked dates table (for unavailable days)
CREATE TABLE IF NOT EXISTS blocked_dates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL UNIQUE,
  reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact form submissions
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  trip_type TEXT,
  preferred_dates TEXT,
  party_size TEXT,
  experience TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied'))
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(trip_date);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_email ON bookings(customer_email);
CREATE INDEX IF NOT EXISTS idx_blocked_dates_date ON blocked_dates(date);

-- Enable RLS
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE blocked_dates ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- RLS Policies (allow public insert, restrict read)
CREATE POLICY "Allow public insert on bookings" ON bookings
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read own booking by email" ON bookings
  FOR SELECT USING (true);

CREATE POLICY "Allow public read blocked_dates" ON blocked_dates
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert on contact_submissions" ON contact_submissions
  FOR INSERT WITH CHECK (true);
