import { NextRequest, NextResponse } from 'next/server'

// Mock courses data
let courses = [
  {
    id: '1',
    title: 'Professional Hair Styling',
    description: 'Master the art of professional hair styling with our comprehensive course covering cutting-edge techniques and industry best practices.',
    duration: '8 weeks',
    price: 799,
    maxStudents: 15,
    currentStudents: 12,
    status: 'active',
    instructor: 'Maria Rodriguez',
    modules: 12
  },
  {
    id: '2',
    title: 'Advanced Makeup Artistry',
    description: 'Learn professional makeup techniques for various occasions including bridal, fashion, and theatrical makeup.',
    duration: '10 weeks',
    price: 899,
    maxStudents: 12,
    currentStudents: 8,
    status: 'active',
    instructor: 'Sarah Johnson',
    modules: 15
  },
  {
    id: '3',
    title: 'Nail Art & Design',
    description: 'Creative nail art course covering basic to advanced techniques including gel, acrylic, and decorative designs.',
    duration: '6 weeks',
    price: 599,
    maxStudents: 20,
    currentStudents: 0,
    status: 'draft',
    instructor: 'Lisa Chen',
    modules: 8
  },
  {
    id: '4',
    title: 'Skin Care Specialist',
    description: 'Comprehensive skin care program covering facial treatments, product knowledge, and skin analysis.',
    duration: '12 weeks',
    price: 1299,
    maxStudents: 10,
    currentStudents: 5,
    status: 'active',
    instructor: 'Dr. Emily White',
    modules: 20
  }
]

export async function GET() {
  try {
    return NextResponse.json({ courses })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch courses' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, description, duration, price, maxStudents, instructor } = await request.json()
    
    // Create new course
    const newCourse = {
      id: (courses.length + 1).toString(),
      title,
      description,
      duration,
      price,
      maxStudents,
      currentStudents: 0,
      status: 'draft' as const,
      instructor,
      modules: 0 // Will be updated when modules are added
    }
    
    courses.push(newCourse)
    
    return NextResponse.json({ 
      success: true, 
      course: newCourse 
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create course' },
      { status: 500 }
    )
  }
}