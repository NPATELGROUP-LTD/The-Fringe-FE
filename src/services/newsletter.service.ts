import { fetchApi } from '@/lib/api';
import { mockNewsletters } from './mockData';

export interface NewsletterSubscription {
  email: string;
  name?: string;
  preferences?: string[];
}

export const newsletterService = {
  async subscribe(data: NewsletterSubscription): Promise<void> {
    try {
      return await fetchApi<void>('/newsletter/subscribe', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.log('Simulating newsletter subscription', error);
    }
  },

  async unsubscribe(email: string): Promise<void> {
    try {
      return await fetchApi<void>('/newsletter/unsubscribe', {
        method: 'POST',
        body: JSON.stringify({ email }),
      });
    } catch (error) {
      console.log('Simulating newsletter unsubscription', error);
    }
  },

  async updatePreferences(email: string, preferences: string[]): Promise<void> {
    try {
      return await fetchApi<void>('/newsletter/preferences', {
        method: 'PUT',
        body: JSON.stringify({ email, preferences }),
      });
    } catch (error) {
      console.log('Simulating preference update', error);
    }
  },

  // Additional methods for frontend-only version
  async getAllNewsletters(): Promise<any[]> {
    try {
      return await fetchApi<any[]>('/newsletters');
    } catch (error) {
      console.log('Falling back to mock data for newsletters', error);
      return mockNewsletters;
    }
  }
};