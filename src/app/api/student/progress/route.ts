import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { moduleId, progress, watchTime } = await request.json()
    
    // Mock progress update - in a real app, this would update the database
    console.log(`Progress updated for module ${moduleId}: ${progress}% (${watchTime}s watched)`)
    
    // Simulate saving to database
    const updatedProgress = {
      moduleId,
      progress,
      watchTime,
      lastUpdated: new Date().toISOString()
    }
    
    return NextResponse.json({ 
      success: true, 
      progress: updatedProgress 
    })
  } catch (error) {
    console.error('Progress update error:', error)
    return NextResponse.json(
      { error: 'Failed to update progress' },
      { status: 500 }
    )
  }
}