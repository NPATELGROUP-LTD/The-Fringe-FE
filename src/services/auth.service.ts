import { fetchApi, apiConfig } from '@/lib/api';
import { mockUsers } from './mockData';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'admin';
}

export interface AuthResponse {
  user: User;
  token: string;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // If no API is configured, short-circuit to mock mode directly
    if (!apiConfig.baseURL) {
      // match email case-insensitively
      const user = mockUsers.find((u) => u.email.toLowerCase() === credentials.email.toLowerCase());
      if (!user) throw new Error('Invalid credentials');
      // In mock data we store a plaintext password (only for local/dev). Validate it.
      // NOTE: This is NOT secure and should never be used in production.
      if ((user as any).password && (user as any).password !== credentials.password) {
        throw new Error('Invalid credentials');
      }

      // Return a user object without the password field
      const { password, ...safeUser } = user as any;

      return {
        user: safeUser,
        token: 'mock-jwt-token-' + Date.now(),
      };
    }

    try {
      return await fetchApi<AuthResponse>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });
    } catch (error) {
      console.log('Falling back to mock auth', error);
      // In mock mode, simulate login with mock users
      const user = mockUsers.find((u) => u.email.toLowerCase() === credentials.email.toLowerCase());
      if (!user) throw new Error('Invalid credentials');
      if ((user as any).password && (user as any).password !== credentials.password) {
        throw new Error('Invalid credentials');
      }

      const { password, ...safeUser } = user as any;

      return {
        user: safeUser,
        token: 'mock-jwt-token-' + Date.now(),
      };
    }
  },

  async register(data: LoginCredentials & { name: string }): Promise<AuthResponse> {
    try {
      return await fetchApi<AuthResponse>('/auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.log('Simulating registration', error);
      // In mock mode, create a new user
      const newUser = {
        id: 'user-' + Date.now(),
        email: data.email,
        name: data.name,
        role: 'student' as const
      };
      
      return {
        user: newUser,
        token: 'mock-jwt-token-' + Date.now()
      };
    }
  },

  async getCurrentUser(): Promise<User> {
    try {
      return await fetchApi<User>('/auth/me');
    } catch (error) {
      console.log('Falling back to mock user data', error);
      // In mock mode, return the first mock user
      const { password, ...safeUser } = mockUsers[0] as any;
      return safeUser;
    }
  },

  async logout(): Promise<void> {
    try {
      return await fetchApi<void>('/auth/logout', {
        method: 'POST',
      });
    } catch (error) {
      console.log('Simulating logout', error);
    }
  },

  async resetPassword(email: string): Promise<void> {
    try {
      return await fetchApi<void>('/auth/reset-password', {
        method: 'POST',
        body: JSON.stringify({ email }),
      });
    } catch (error) {
      console.log('Simulating password reset', error);
    }
  },
};