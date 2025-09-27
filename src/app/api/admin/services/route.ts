import { NextRequest, NextResponse } from 'next/server'

// Mock services data
let services = [
  {
    id: '1',
    name: 'Professional Haircut',
    description: 'Expert haircut with styling consultation and finishing',
    duration: '60 minutes',
    price: 75,
    category: 'Hair',
    status: 'active'
  },
  {
    id: '2',
    name: 'Bridal Makeup',
    description: 'Complete bridal makeup package with trial session',
    duration: '120 minutes',
    price: 200,
    category: 'Bridal',
    status: 'active'
  },
  {
    id: '3',
    name: 'Gel Manicure',
    description: 'Long-lasting gel manicure with nail art options',
    duration: '45 minutes',
    price: 35,
    category: 'Nails',
    status: 'active'
  },
  {
    id: '4',
    name: 'Facial Treatment',
    description: 'Deep cleansing facial with customized skin care',
    duration: '90 minutes',
    price: 110,
    category: 'Skin Care',
    status: 'active'
  }
]

export async function GET() {
  try {
    return NextResponse.json({ services })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, description, duration, price, category } = await request.json()
    
    const newService = {
      id: (services.length + 1).toString(),
      name,
      description,
      duration,
      price,
      category,
      status: 'active' as const
    }
    
    services.push(newService)
    
    return NextResponse.json({ 
      success: true, 
      service: newService 
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to add service' },
      { status: 500 }
    )
  }
}