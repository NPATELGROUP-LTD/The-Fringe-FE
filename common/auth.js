// Shared authentication utilities

const AUTH_TOKEN_KEY = "auth_token";
const USER_ROLE_KEY = "user_role";

// Store authentication token
export function setAuthToken(token) {
  if (typeof window !== "undefined") {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  }
}

// Get authentication token
export function getAuthToken() {
  if (typeof window !== "undefined") {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  }
  return null;
}

// Remove authentication token
export function removeAuthToken() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(USER_ROLE_KEY);
  }
}

// Store user role
export function setUserRole(role) {
  if (typeof window !== "undefined") {
    localStorage.setItem(USER_ROLE_KEY, role);
  }
}

// Get user role
export function getUserRole() {
  if (typeof window !== "undefined") {
    return localStorage.getItem(USER_ROLE_KEY);
  }
  return null;
}

// Check if user is authenticated
export function isAuthenticated() {
  const token = getAuthToken();
  return !!token;
}

// Check if user is admin
export function isAdmin() {
  const role = getUserRole();
  return role === "ADMIN" || role === "SUPER_ADMIN";
}

// Check if user is student
export function isStudent() {
  const role = getUserRole();
  return role === "STUDENT";
}
