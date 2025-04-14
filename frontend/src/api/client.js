import axios from 'axios';

// Get the API URL from environment variables
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Create a base API client
const apiClient = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000 // 10 seconds timeout
});

// Response interceptor for API calls
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Define custom error messages based on status code
    const customErrors = {
      404: 'Resource not found',
      500: 'Internal server error. Please try again later.',
      401: 'Unauthorized. Please log in.',
      403: 'Access forbidden',
      default: 'An error occurred. Please try again.'
    };

    // Override axios error message
    const status = error.response ? error.response.status : null;
    error.message = status ? (customErrors[status] || customErrors.default) : 'Network error. Please check your connection.';
    
    // Log errors in development but not in production
    if (import.meta.env.DEV) {
      console.error('API Error:', error);
    }
    
    return Promise.reject(error);
  }
);

export default apiClient; 