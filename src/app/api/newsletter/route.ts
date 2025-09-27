import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendWelcomeEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const { email, name } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Check if already subscribed
    const existingSubscriber = await prisma.newsletterSubscriber.findUnique({
      where: { email }
    });

    if (existingSubscriber) {
      if (existingSubscriber.isActive) {
        return NextResponse.json({ error: 'Already subscribed' }, { status: 400 });
      } else {
        // Reactivate subscription
        await prisma.newsletterSubscriber.update({
          where: { email },
          data: { 
            isActive: true,
            unsubscribedAt: null,
            name: name || existingSubscriber.name
          }
        });
      }
    } else {
      // Create new subscription
      await prisma.newsletterSubscriber.create({
        data: {
          email,
          name: name || null
        }
      });
    }

    // Send welcome email
    if (name) {
      await sendWelcomeEmail(email, name);
    }

    return NextResponse.json({ message: 'Successfully subscribed' });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    const subscribers = await prisma.newsletterSubscriber.findMany({
      where: { isActive: true },
      skip,
      take: limit,
      orderBy: { subscribedAt: 'desc' }
    });

    const total = await prisma.newsletterSubscriber.count({
      where: { isActive: true }
    });

    return NextResponse.json({
      subscribers,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Newsletter fetch error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}