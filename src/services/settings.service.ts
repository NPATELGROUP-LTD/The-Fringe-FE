import { fetchApi } from '@/lib/api';

export interface SiteSettings {
  id: string;
  showPrices: boolean;
  siteName: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  socialMedia: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
  updatedAt: string;
}

// Mock settings for fallback
const mockSettings: SiteSettings = {
  id: '1',
  showPrices: true,
  siteName: 'The Fringe Beauty Academy',
  contactEmail: 'info@thefringe.com',
  contactPhone: '+1 (555) 123-4567',
  address: '123 Beauty Street, City, State 12345',
  socialMedia: {
    facebook: 'https://facebook.com/thefringe',
    instagram: 'https://instagram.com/thefringe',
    twitter: 'https://twitter.com/thefringe'
  },
  updatedAt: new Date().toISOString()
};

export const settingsService = {
  async getSettings(): Promise<SiteSettings> {
    try {
      return await fetchApi<SiteSettings>('/settings');
    } catch (error) {
      console.log('Falling back to mock settings', error);
      return mockSettings;
    }
  },

  async updateSettings(settings: Partial<SiteSettings>): Promise<SiteSettings> {
    try {
      return await fetchApi<SiteSettings>('/settings', {
        method: 'PUT',
        body: JSON.stringify(settings),
      });
    } catch (error) {
      console.log('Simulating settings update with mock data', error);
      return {
        ...mockSettings,
        ...settings,
        updatedAt: new Date().toISOString()
      };
    }
  },

  async togglePriceVisibility(): Promise<SiteSettings> {
    try {
      const currentSettings = await this.getSettings();
      return await this.updateSettings({
        showPrices: !currentSettings.showPrices
      });
    } catch (error) {
      console.log('Error toggling price visibility', error);
      throw error;
    }
  }
};