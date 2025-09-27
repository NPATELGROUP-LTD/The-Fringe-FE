// Shared types used across all applications

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface Student {
  id: string;
  email: string;
  name: string;
  phone?: string;
  enrollmentDate: Date;
  status: StudentStatus;
  assignedCourseId?: string;
  certificateUrl?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: CourseType;
  isPublic: boolean;
  duration: string;
  price?: number;
  thumbnail?: string;
  status: CourseStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  category: ServiceCategory;
  price?: number;
  duration?: string;
  image?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Enums
export enum UserRole {
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
  STUDENT = 'STUDENT'
}

export enum StudentStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  GRADUATED = 'GRADUATED',
  SUSPENDED = 'SUSPENDED'
}

export enum CourseType {
  PUBLIC = 'PUBLIC',
  ACADEMY = 'ACADEMY',
  PROFESSIONAL = 'PROFESSIONAL',
  MASTERCLASS = 'MASTERCLASS'
}

export enum CourseStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DRAFT = 'DRAFT',
  ARCHIVED = 'ARCHIVED'
}

export enum ServiceCategory {
  HAIR_STYLING = 'HAIR_STYLING',
  HAIR_COLORING = 'HAIR_COLORING',
  MAKEUP = 'MAKEUP',
  NAIL_ART = 'NAIL_ART',
  SKINCARE = 'SKINCARE',
  SPECIAL_OCCASION = 'SPECIAL_OCCASION'
}

// Authentication
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  token?: string;
  user?: {
    email: string;
    role: UserRole;
  };
  error?: string;
}
