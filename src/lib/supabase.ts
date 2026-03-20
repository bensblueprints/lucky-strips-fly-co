import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type TripType = 'half_day' | 'full_day';

export interface Trip {
  id: string;
  name: string;
  type: TripType;
  description: string;
  price_1_person: number;
  price_2_person: number;
  duration_hours: number;
  includes: string[];
  created_at: string;
}

export interface Booking {
  id: string;
  user_id: string;
  trip_id: string;
  booking_date: string;
  num_guests: number;
  total_price: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  notes?: string;
  payment_id?: string;
  created_at: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  caption?: string;
  featured: boolean;
  created_at: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  created_at: string;
}
