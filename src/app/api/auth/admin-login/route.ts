import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()
    
    // Simple demo credentials - in production, use proper authentication
    const validCredentials = [
      { email: 'admin@thefringe.com', password: 'admin123' },
      { email: 'demo@thefringe.com', password: 'demo123' }
    ]
    
    const isValid = validCredentials.some(
      cred => cred.email === email && cred.password === password
    )
    
    if (isValid) {
      // Generate simple session token (in production, use proper JWT)
      const token = 'admin_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
      
      return NextResponse.json({
        success: true,
        token,
        user: {
          email,
          role: 'admin'
        }
      })
    } else {
      return NextResponse.json(
        { error: 'Invalid email or password. Try admin@thefringe.com / admin123' },
        { status: 401 }
      )
    }
  } catch (error) {
    console.error('Admin login error:', error)
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    )
  }
}