import axios from 'axios';

// Create an axios instance with the base URL
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000', // Update with your API base URL
});

// Add a request interceptor to include the token in headers
axiosInstance.interceptors.request.use(
  (config) => {
    // Retrieve the current user from local storage
    const storedUser = localStorage.getItem('currentUser');
    
    // Parse the stored user if it exists
    if (storedUser) {
      const user = JSON.parse(storedUser);
      // Check if the token is present and set the Authorization header
      if (user.token) {
        config.headers['Authorization'] = `Bearer ${user.token}`;
      }
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;