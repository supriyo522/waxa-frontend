import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://waxa-backend.onrender.com/api';

const apiClient = axios.create({
  baseURL: API_URL,
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  signup: (email, password, organization_name) =>
    apiClient.post('https://waxa-backend.onrender.com/api/auth/signup', { email, password, organization_name }),
  login: (email, password) =>
    apiClient.post('https://waxa-backend.onrender.com/api/auth/login', { email, password }),
};

export const productsAPI = {
  getProducts: (organization_id, search = '') =>
    apiClient.get('https://waxa-backend.onrender.com/api/products', { params: { organization_id, search } }),
  createProduct: (organization_id, data) =>
    apiClient.post('https://waxa-backend.onrender.com/api/products', { organization_id, ...data }),
  updateProduct: (id, organization_id, data) =>
    apiClient.put(`https://waxa-backend.onrender.com/api/products/${id}`, { organization_id, ...data }),
  deleteProduct: (id, organization_id) =>
    apiClient.delete('https://waxa-backend.onrender.com/api/products/${id}', { params: { organization_id } }),
};

export const dashboardAPI = {
  getDashboard: (organization_id) =>
    apiClient.get('https://waxa-backend.onrender.com/api/dashboard', { params: { organization_id } }),
};

export const settingsAPI = {
  getSettings: (organization_id) =>
    apiClient.get('https://waxa-backend.onrender.com/api/settings', { params: { organization_id } }),
  updateSettings: (organization_id, data) =>
    apiClient.put('https://waxa-backend.onrender.com/api/settings', { organization_id, ...data }),
};

export default apiClient;
