import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    const where: any = { isActive: true };

    if (category && category !== 'ALL') {
      where.category = category;
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ];
    }

    const services = await prisma.service.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ services });
  } catch (error) {
    console.error('Services fetch error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    const service = await prisma.service.create({
      data: {
        title: data.title,
        description: data.description,
        category: data.category,
        price: data.price ? parseFloat(data.price) : null,
        duration: data.duration,
        image: data.image
      }
    });

    return NextResponse.json({ service });
  } catch (error) {
    console.error('Service creation error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}