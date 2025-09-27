import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Mock dashboard data - in a real app, this would come from your database
    const dashboardData = {
      stats: {
        totalStudents: 45,
        activeCourses: 8,
        totalServices: 12,
        newsletterSubscribers: 156
      },
      recentActivity: [
        {
          type: 'student',
          description: 'New student Sarah Johnson enrolled in Hair Styling course',
          timeAgo: '2 hours ago'
        },
        {
          type: 'course',
          description: 'Makeup Artistry course updated with new module',
          timeAgo: '5 hours ago'
        },
        {
          type: 'newsletter',
          description: '3 new newsletter subscribers',
          timeAgo: '1 day ago'
        },
        {
          type: 'service',
          description: 'Bridal Package service added',
          timeAgo: '2 days ago'
        }
      ]
    }

    return NextResponse.json(dashboardData)
  } catch (error) {
    console.error('Dashboard API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    )
  }
}