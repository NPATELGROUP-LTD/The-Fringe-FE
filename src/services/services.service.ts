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

  async getServicesByCategory(): Promise<{[key: string]: Service[]}> {
    try {
      const services = await this.getAllServices();
      const servicesByCategory: {[key: string]: Service[]} = {};
      
      services.forEach(service => {
        if (!servicesByCategory[service.category]) {
          servicesByCategory[service.category] = [];
        }
        servicesByCategory[service.category].push(service);
      });
      
      return servicesByCategory;
    } catch (error) {
      console.log('Error grouping services by category', error);
      return {};
    }
  },

  async getFeaturedServicesByCategory(limit: number = 3): Promise<{[key: string]: Service[]}> {
    try {
      const servicesByCategory = await this.getServicesByCategory();
      const featuredServices: {[key: string]: Service[]} = {};
      
      Object.keys(servicesByCategory).forEach(category => {
        featuredServices[category] = servicesByCategory[category].slice(0, limit);
      });
      
      return featuredServices;
    } catch (error) {
      console.log('Error getting featured services by category', error);
      return {};
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