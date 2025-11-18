import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import * as crypto from 'crypto';

// Simple hash function for password comparison
function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Check if admin exists in database
    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    if (!admin) {
      // For first-time setup, check against env variables
      if (
        email === process.env.ADMIN_EMAIL &&
        password === process.env.ADMIN_PASSWORD
      ) {
        // Create admin in database
        const hashedPassword = hashPassword(password);
        const newAdmin = await prisma.admin.create({
          data: {
            email,
            password: hashedPassword,
          },
        });

        // Generate a simple token (in production, use JWT)
        const token = Buffer.from(`${newAdmin.id}:${Date.now()}`).toString('base64');

        return NextResponse.json({
          success: true,
          token,
          admin: { id: newAdmin.id, email: newAdmin.email },
        });
      }

      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Verify password
    const hashedPassword = hashPassword(password);
    if (admin.password !== hashedPassword) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Generate token
    const token = Buffer.from(`${admin.id}:${Date.now()}`).toString('base64');

    return NextResponse.json({
      success: true,
      token,
      admin: { id: admin.id, email: admin.email },
    });
  } catch {
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}
