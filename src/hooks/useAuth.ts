import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/auth.service';
import type { User } from '@/services/auth.service';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = document.cookie.split('; ').find(row => row.startsWith('authToken='))?.split('=')[1];
        if (!token) {
          setLoading(false);
          return;
        }

        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        // If there's an error, clear the auth state
        localStorage.removeItem('authToken');
        localStorage.removeItem('userRole');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const { token, user } = await authService.login({ email, password });
    
    // Store auth data in both cookies and localStorage for compatibility
    document.cookie = `authToken=${token}; path=/`;
    document.cookie = `userRole=${user.role}; path=/`;
    localStorage.setItem('authToken', token);
    localStorage.setItem('userRole', user.role);
    
    // Store role-specific session tokens that dashboards expect
    if (user.role === 'admin') {
      localStorage.setItem('admin_session', token);
    } else if (user.role === 'student') {
      localStorage.setItem('student_session', token);
    }
    
    setUser(user);
    
    // Redirect based on user role
    if (user.role === 'admin') {
      router.push('/admin/dashboard');
    } else if (user.role === 'student') {
      router.push('/student/dashboard');
    }
    return user;
  };

  const logout = async () => {
    try {
      await authService.logout();
    } finally {
      // Clear cookies
      document.cookie = 'authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      document.cookie = 'userRole=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      
      // Clear localStorage
      localStorage.removeItem('authToken');
      localStorage.removeItem('userRole');
      localStorage.removeItem('admin_session');
      localStorage.removeItem('student_session');
      
      setUser(null);
      router.push('/login');
    }
  };

  return {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isStudent: user?.role === 'student',
  };
}