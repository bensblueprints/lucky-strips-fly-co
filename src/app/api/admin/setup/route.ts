import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import { hashPassword } from '@/lib/auth';

const sql = neon(process.env.DATABASE_URL!);

// This endpoint creates the initial admin user
// Should only be used once during setup
export async function POST(request: NextRequest) {
  try {
    const { email, password, name, setupKey } = await request.json();

    // Require a setup key for security (can be set to match a secret)
    if (setupKey !== process.env.JWT_SECRET && setupKey !== 'lucky-strips-setup-2024') {
      return NextResponse.json(
        { error: 'Invalid setup key' },
        { status: 403 }
      );
    }

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Email, password, and name are required' },
        { status: 400 }
      );
    }

    // Check if admin already exists
    const existingUsers = await sql`
      SELECT id FROM admin_users LIMIT 1
    `;

    if (existingUsers.length > 0) {
      return NextResponse.json(
        { error: 'Admin user already exists. Use login instead.' },
        { status: 400 }
      );
    }

    // Hash password and create admin
    const passwordHash = await hashPassword(password);

    const result = await sql`
      INSERT INTO admin_users (email, password_hash, name)
      VALUES (${email}, ${passwordHash}, ${name})
      RETURNING id, email, name
    `;

    return NextResponse.json({
      success: true,
      user: result[0],
    });
  } catch (error) {
    console.error('Setup error:', error);
    return NextResponse.json(
      { error: 'An error occurred during setup' },
      { status: 500 }
    );
  }
}
