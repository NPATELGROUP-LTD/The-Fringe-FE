import { NextRequest, NextResponse } from 'next/server'

// Mock newsletter subscribers
const subscribers = [
  {
    id: '1',
    email: 'sarah@example.com',
    subscribeDate: '2024-01-15'
  },
  {
    id: '2',
    email: 'emily@example.com',
    subscribeDate: '2024-01-10'
  },
  {
    id: '3',
    email: 'jessica@example.com',
    subscribeDate: '2024-01-08'
  },
  {
    id: '4',
    email: 'amanda@example.com',
    subscribeDate: '2024-01-05'
  },
  {
    id: '5',
    email: 'maria@example.com',
    subscribeDate: '2024-01-03'
  }
]

export async function GET() {
  try {
    return NextResponse.json({ subscribers })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch subscribers' },
      { status: 500 }
    )
  }
}