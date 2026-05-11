import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
  withCredentials: true, // Crucial for Http-only cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor for handling errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401/403/500 errors here
    if (error.response?.status === 401) {
      // Redirect to login or trigger token refresh
    }
    return Promise.reject(error);
  }
);

export default api;
