export const mockServices = [
  {
    id: "1",
    title: "Classic Hair Styling",
    description: "Experience our signature hair styling service with expert stylists",
    price: 75,
    duration: "60 min",
    image: "/images/services/hair-styling.jpg",
    features: [
      "Consultation",
      "Shampoo and conditioning",
      "Professional styling",
      "Heat protection",
      "Style maintenance tips"
    ],
    category: "HAIR"
  },
  {
    id: "2",
    title: "Luxury Facial Treatment",
    description: "Rejuvenate your skin with our premium facial treatment",
    price: 120,
    duration: "90 min",
    image: "/images/services/facial.jpg",
    features: [
      "Skin analysis",
      "Deep cleansing",
      "Exfoliation",
      "Face massage",
      "Mask treatment"
    ],
    category: "SKIN"
  },
  {
    id: "3",
    title: "Professional Makeup",
    description: "Get picture-perfect makeup for any special occasion",
    price: 95,
    duration: "75 min",
    image: "/images/services/makeup.jpg",
    features: [
      "Skin prep",
      "Full face makeup",
      "False lashes",
      "Setting spray",
      "Touch-up kit"
    ],
    category: "MAKEUP"
  }
  ,
  {
    id: "4",
    title: "Gel Manicure",
    description: "Long-lasting gel manicure with precise shaping and polish",
    price: 45,
    duration: "45 min",
    image: "/images/services/manicure.jpg",
    features: ["Nail shaping", "Cuticle care", "Gel polish", "Hand massage"],
    category: "NAILS"
  },
  {
    id: "5",
    title: "Relaxing Swedish Massage",
    description: "A full-body Swedish massage to relax muscles and improve circulation",
    price: 90,
    duration: "60 min",
    image: "/images/services/swedish-massage.jpg",
    features: ["Aromatherapy options", "Full body massage", "Muscle relaxation", "Stretching"],
    category: "MASSAGE"
  },
  {
    id: "6",
    title: "Hot Stone Therapy",
    description: "Warm stone therapy to relieve deep muscle tension",
    price: 130,
    duration: "75 min",
    image: "/images/services/hot-stone.jpg",
    features: ["Heated stones", "Deep relaxation", "Targeted therapy", "Aftercare tips"],
    category: "SPA"
  },
  {
    id: "7",
    title: "Brow Shaping & Tint",
    description: "Precision brow shaping with tint to frame your face",
    price: 35,
    duration: "30 min",
    image: "/images/services/brow-shaping.jpg",
    features: ["Consultation", "Wax or threading", "Tint application", "Brow styling"],
    category: "BROWS"
  },
  {
    id: "8",
    title: "Full Body Waxing",
    description: "Professional waxing for smooth, long-lasting results",
    price: 110,
    duration: "90 min",
    image: "/images/services/waxing.jpg",
    features: ["Pre-wax prep", "Full body service", "Soothing post-care", "Hygienic supplies"],
    category: "WAXING"
  },
  {
    id: "9",
    title: "Express Haircut",
    description: "Quick and stylish haircut for busy clients",
    price: 40,
    duration: "30 min",
    image: "/images/services/express-haircut.jpg",
    features: ["Consultation", "Precision cut", "Blow-dry (optional)", "Style tips"],
    category: "HAIR"
  },
  {
    id: "10",
    title: "Bridal Makeup Trial",
    description: "A comprehensive trial session to perfect your bridal look",
    price: 150,
    duration: "120 min",
    image: "/images/services/bridal-makeup.jpg",
    features: ["Full trial makeup", "Consultation", "Lash trial", "Photos for reference"],
    category: "MAKEUP"
  },
  {
    id: "11",
    title: "Organic Body Scrub",
    description: "Exfoliating organic body scrub to reveal softer skin",
    price: 70,
    duration: "50 min",
    image: "/images/services/body-scrub.jpg",
    features: ["Full body exfoliation", "Hydrating wrap", "Aromatherapy options"],
    category: "SKIN"
  },
  {
    id: "12",
    title: "Spray Tan Session",
    description: "Natural-looking spray tan with customized shade matching",
    price: 35,
    duration: "25 min",
    image: "/images/services/spray-tan.jpg",
    features: ["Shade consultation", "Even application", "Aftercare instructions"],
    category: "TANNING"
  }
];

export const mockCourses = [
  {
    id: "1",
    title: "Hair Styling Fundamentals",
    description: "Master the basics of professional hair styling",
    duration: "12 weeks",
    price: 1499,
    image: "/images/courses/hair-basics.jpg",
    level: 'beginner' as const,
    instructor: "Sarah Johnson",
    topics: [
      "Hair anatomy and health",
      "Basic cutting techniques",
      "Blow-drying skills",
      "Product knowledge",
      "Client consultation"
    ],
    enrollmentStatus: 'open' as const
  },
  {
    id: "2",
    title: "Advanced Color Techniques",
    description: "Learn professional hair coloring and highlighting",
    duration: "16 weeks",
    price: 2499,
    image: "/images/courses/color-advanced.jpg",
    level: 'advanced' as const,
    instructor: "Michael Chen",
    topics: [
      "Color theory",
      "Balayage techniques",
      "Color correction",
      "Creative coloring",
      "Client assessment"
    ],
    enrollmentStatus: 'open' as const
  },
  {
    id: "3",
    title: "Professional Makeup Artistry",
    description: "Transform your passion into a professional career",
    duration: "10 weeks",
    price: 1999,
    image: "/images/courses/makeup-pro.jpg",
    level: 'intermediate' as const,
    instructor: "Emma Parker",
    topics: [
      "Color theory",
      "Face shapes and features",
      "Bridal makeup",
      "Special effects",
      "Portfolio building"
    ],
    enrollmentStatus: 'open' as const
  }
];

export const mockNewsletters = [
  {
    id: "1",
    title: "Summer Beauty Trends",
    content: "Discover the hottest beauty trends for summer...",
    date: "2025-06-01",
    category: "TRENDS"
  },
  {
    id: "2",
    title: "Hair Care Tips for Winter",
    content: "Keep your hair healthy during cold months...",
    date: "2025-12-01",
    category: "TIPS"
  }
];

export const mockUsers = [
  {
    id: "1",
    email: "admin@thefringe.com",
    role: 'admin' as const,
    name: "Admin User",
    // Mock password for local/testing only
    password: "admin123"
  },
  {
    id: "2",
    email: "student@thefringe.com",
    role: 'student' as const,
    name: "Student User",
    // Mock password for local/testing only
    password: "student123"
  }
];