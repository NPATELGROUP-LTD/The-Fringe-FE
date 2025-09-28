import { fetchApi } from '@/lib/api';
import { mockCourses } from './mockData';

export interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  price: number;
  image: string;
  instructor: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  topics: string[];
  enrollmentStatus: 'open' | 'closed' | 'in-progress';
}

export interface EnrollmentData {
  courseId: string;
  userId: string;
  paymentDetails?: any;
}

export const coursesService = {
  async getAllCourses(): Promise<Course[]> {
    try {
      return await fetchApi<Course[]>('/courses');
    } catch (error) {
      console.log('Falling back to mock data for courses', error);
      return mockCourses;
    }
  },

  async getCourseById(id: string): Promise<Course> {
    try {
      return await fetchApi<Course>(`/courses/${id}`);
    } catch (error) {
      console.log('Falling back to mock data for course details', error);
      const course = mockCourses.find(c => c.id === id);
      if (!course) throw new Error('Course not found');
      return course;
    }
  },

  async enrollInCourse(data: EnrollmentData): Promise<void> {
    try {
      return await fetchApi<void>('/courses/enroll', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.log('Simulating course enrollment with mock data', error);
      // In mock mode, we just simulate success
      return;
    }
  },

  async getMyCourses(userId: string): Promise<Course[]> {
    try {
      return await fetchApi<Course[]>(`/courses/user/${userId}`);
    } catch (error) {
      console.log('Falling back to mock data for user courses', error);
      // In mock mode, return a subset of courses as enrolled
      return mockCourses.slice(0, 2);
    }
  },

  async getCourseProgress(courseId: string, userId: string): Promise<number> {
    try {
      return await fetchApi<number>(`/courses/${courseId}/progress/${userId}`);
    } catch (error) {
      console.log('Falling back to mock data for course progress', error);
      // In mock mode, return a random progress between 0-100
      return Math.floor(Math.random() * 100);
    }
  },
};