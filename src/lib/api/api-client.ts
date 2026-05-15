import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
  withCredentials: true, // Crucial for Http-only cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor for handling errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;
      if (status === 401) {
        // Handle unauthorized (e.g., redirect to login)
        console.error('Unauthorized access - redirecting to login');
        window.location.href = '/login';
      } else if (status === 403) {
        console.error('Forbidden access');
      } else if (status >= 500) {
        console.error('Server error - please try again later');
      }
    }
    return Promise.reject(error);
  }
);

export default api;
