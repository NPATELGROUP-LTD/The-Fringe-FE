// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.thefringe.com',
  ENDPOINTS: {
    // Admin endpoints
    ADMIN: {
      LOGIN: '/admin/auth/login',
      FORGOT_PASSWORD: '/admin/auth/forgot-password',
      CERTIFICATES: {
        LIST: '/admin/certificates',
        UPLOAD: '/admin/certificates/upload',
        REVOKE: '/admin/certificates/revoke',
      },
      STUDENTS: {
        LIST: '/admin/students',
        CREATE: '/admin/students',
        UPDATE: '/admin/students',
        DELETE: '/admin/students',
      },
      SERVICES: {
        LIST: '/admin/services',
        CREATE: '/admin/services',
        UPDATE: '/admin/services',
        DELETE: '/admin/services',
      },
      COURSES: {
        LIST: '/admin/courses',
        CREATE: '/admin/courses',
        UPDATE: '/admin/courses',
        DELETE: '/admin/courses',
      },
      SETTINGS: '/admin/settings',
    },
    // Student endpoints
    STUDENT: {
      LOGIN: '/student/auth/login',
      FORGOT_PASSWORD: '/student/auth/forgot-password',
      DASHBOARD: '/student/dashboard',
      COURSES: '/student/courses',
      CERTIFICATES: '/student/certificates',
      PROFILE: '/student/profile',
      SETTINGS: '/student/settings',
    },
    // Public endpoints
    PUBLIC: {
      SERVICES: '/services',
      COURSES: '/courses',
      CONTACT: '/contact',
      NEWSLETTER: '/newsletter/subscribe',
    }
  }
};

// Helper function to build full API URL
export const buildApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Helper function for API calls with error handling
export const apiCall = async (
  endpoint: string, 
  options: RequestInit = {}
): Promise<any> => {
  const url = buildApiUrl(endpoint);
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

// Helper function for file uploads
export const uploadFile = async (
  endpoint: string,
  formData: FormData,
  onProgress?: (progress: number) => void
): Promise<any> => {
  const url = buildApiUrl(endpoint);
  
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    
    // Track upload progress
    if (onProgress) {
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const progress = (event.loaded / event.total) * 100;
          onProgress(progress);
        }
      });
    }
    
    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const response = JSON.parse(xhr.responseText);
          resolve(response);
        } catch (error) {
          resolve({ success: true });
        }
      } else {
        try {
          const errorResponse = JSON.parse(xhr.responseText);
          reject(new Error(errorResponse.message || `Upload failed with status: ${xhr.status}`));
        } catch (error) {
          reject(new Error(`Upload failed with status: ${xhr.status}`));
        }
      }
    });
    
    xhr.addEventListener('error', () => {
      reject(new Error('Upload failed due to network error'));
    });
    
    xhr.open('POST', url);
    xhr.send(formData);
  });
};