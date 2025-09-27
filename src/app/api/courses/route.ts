import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const isPublic = searchParams.get('public');

    const where: any = { status: 'ACTIVE' };

    if (category && category !== 'ALL') {
      where.category = category;
    }

    if (isPublic === 'true') {
      where.isPublic = true;
    }

    const courses = await prisma.course.findMany({
      where,
      include: {
        modules: true,
        _count: {
          select: { students: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ courses });
  } catch (error) {
    console.error('Courses fetch error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    const course = await prisma.course.create({
      data: {
        title: data.title,
        description: data.description,
        category: data.category,
        isPublic: data.isPublic,
        duration: data.duration,
        price: data.price ? parseFloat(data.price) : null,
        thumbnail: data.thumbnail,
        createdById: data.createdById
      }
    });

    return NextResponse.json({ course });
  } catch (error) {
    console.error('Course creation error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}