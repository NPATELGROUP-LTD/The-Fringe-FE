import { fetchApi } from '@/lib/api';
import { mockServices } from './mockData';

export interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  image: string;
  features: string[];
  category: string;
}

export interface ServiceBooking {
  serviceId: string;
  userId: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export const servicesService = {
  async getAllServices(): Promise<Service[]> {
    try {
      return await fetchApi<Service[]>('/services');
    } catch (error) {
      console.log('Falling back to mock data for services', error);
      return mockServices;
    }
  },

  async getServiceById(id: string): Promise<Service> {
    try {
      return await fetchApi<Service>(`/services/${id}`);
    } catch (error) {
      console.log('Falling back to mock data for service details', error);
      const service = mockServices.find(s => s.id === id);
      if (!service) throw new Error('Service not found');
      return service;
    }
  },

  async bookService(booking: Omit<ServiceBooking, 'status'>): Promise<ServiceBooking> {
    try {
      return await fetchApi<ServiceBooking>('/services/book', {
        method: 'POST',
        body: JSON.stringify(booking),
      });
    } catch (error) {
      console.log('Simulating booking creation with mock data', error);
      return {
        ...booking,
        status: 'pending'
      };
    }
  },

  async getMyBookings(userId: string): Promise<ServiceBooking[]> {
    try {
      return await fetchApi<ServiceBooking[]>(`/services/bookings/${userId}`);
    } catch (error) {
      console.log('Falling back to mock data for bookings', error);
      return []; // Return empty bookings for mock
    }
  },

  async cancelBooking(bookingId: string): Promise<void> {
    try {
      return await fetchApi<void>(`/services/bookings/${bookingId}/cancel`, {
        method: 'POST',
      });
    } catch (error) {
      console.log('Simulating booking cancellation', error);
    }
  },
};