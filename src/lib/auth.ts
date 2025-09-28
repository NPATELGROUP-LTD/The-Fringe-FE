/**
 * Frontend Auth Utilities
 * Note: These are placeholder implementations for frontend-only version.
 * In a real application, password hashing should be done on the server side.
 */

// Frontend mock of password hashing - DO NOT USE IN PRODUCTION
export async function hashPassword(password: string): Promise<string> {
  // In frontend-only version, we don't actually hash passwords
  // This is just a placeholder
  return password;
}

// Frontend mock of password verification - DO NOT USE IN PRODUCTION
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  // In frontend-only version, we do a simple comparison
  // This is just a placeholder
  return password === hashedPassword;
}

export function generateTemporaryPassword(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let password = '';
  for (let i = 0; i < 8; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

// Add utility functions for token management
export function getAuthToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('authToken');
  }
  return null;
}

export function setAuthToken(token: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('authToken', token);
  }
}

export function removeAuthToken(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('authToken');
  }
}

export function getUserRole(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('userRole');
  }
  return null;
}

export function setUserRole(role: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('userRole', role);
  }
}

export function removeUserRole(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('userRole');
  }
}

export function isAuthenticated(): boolean {
  return !!getAuthToken();
}

export function clearAuth(): void {
  removeAuthToken();
  removeUserRole();
}