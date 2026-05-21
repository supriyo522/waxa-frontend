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
    apiClient.post('/auth/signup', { email, password, organization_name }),
  login: (email, password) =>
    apiClient.post('/auth/login', { email, password }),
};

export const productsAPI = {
  getProducts: (organization_id, search = '') =>
    apiClient.get('/products', { params: { organization_id, search } }),
  createProduct: (organization_id, data) =>
    apiClient.post('/products', { organization_id, ...data }),
  updateProduct: (id, organization_id, data) =>
    apiClient.put(`/products/${id}`, { organization_id, ...data }),
  deleteProduct: (id, organization_id) =>
    apiClient.delete(`/products/${id}`, { params: { organization_id } }),
};

export const dashboardAPI = {
  getDashboard: (organization_id) =>
    apiClient.get('/dashboard', { params: { organization_id } }),
};

export const settingsAPI = {
  getSettings: (organization_id) =>
    apiClient.get('/settings', { params: { organization_id } }),
  updateSettings: (organization_id, data) =>
    apiClient.put('/settings', { organization_id, ...data }),
};

export default apiClient;
