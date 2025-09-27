import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()
    
    // Simple demo credentials for students
    const validCredentials = [
      { email: 'student@thefringe.com', password: 'student123' },
      { email: 'john@example.com', password: 'student123' },
      { email: 'demo@student.com', password: 'demo123' }
    ]
    
    const isValid = validCredentials.some(
      cred => cred.email === email && cred.password === password
    )
    
    if (isValid) {
      // Generate simple session token
      const token = 'student_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
      
      return NextResponse.json({
        success: true,
        token,
        user: {
          email,
          role: 'student'
        }
      })
    } else {
      return NextResponse.json(
        { error: 'Invalid credentials. Try student@thefringe.com / student123' },
        { status: 401 }
      )
    }
  } catch (error) {
    console.error('Student login error:', error)
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    )
  }
}