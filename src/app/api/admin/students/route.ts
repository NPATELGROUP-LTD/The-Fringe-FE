import { NextRequest, NextResponse } from 'next/server'

// Mock students data
let students = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    course: 'Hair Styling',
    enrollmentDate: '2024-01-15',
    progress: 85,
    status: 'active'
  },
  {
    id: '2',
    name: 'Emily Chen',
    email: 'emily@example.com',
    course: 'Makeup Artistry',
    enrollmentDate: '2024-01-10',
    progress: 92,
    status: 'completed'
  },
  {
    id: '3',
    name: 'Jessica Miller',
    email: 'jessica@example.com',
    course: 'Nail Art',
    enrollmentDate: '2024-01-08',
    progress: 45,
    status: 'active'
  },
  {
    id: '4',
    name: 'Amanda Rodriguez',
    email: 'amanda@example.com',
    course: 'Skin Care',
    enrollmentDate: '2024-01-05',
    progress: 67,
    status: 'paused'
  }
]

export async function GET() {
  try {
    return NextResponse.json({ students })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch students' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, course, password } = await request.json()
    
    // Check if email already exists
    const existingStudent = students.find(s => s.email === email)
    if (existingStudent) {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 400 }
      )
    }
    
    // Create new student
    const newStudent = {
      id: (students.length + 1).toString(),
      name,
      email,
      course,
      enrollmentDate: new Date().toISOString().split('T')[0],
      progress: 0,
      status: 'active' as const
    }
    
    students.push(newStudent)
    
    // In a real app, you would also create the student account with the password
    console.log(`New student account created: ${email} with password: ${password}`)
    
    return NextResponse.json({ 
      success: true, 
      student: newStudent 
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to add student' },
      { status: 500 }
    )
  }
}