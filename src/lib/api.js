import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

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
    apiClient.post('http://localhost:5000/api/auth/signup', { email, password, organization_name }),
  login: (email, password) =>
    apiClient.post('http://localhost:5000/api/auth/login', { email, password }),
};

export const productsAPI = {
  getProducts: (organization_id, search = '') =>
    apiClient.get('http://localhost:5000/api/products', { params: { organization_id, search } }),
  createProduct: (organization_id, data) =>
    apiClient.post('http://localhost:5000/api/products', { organization_id, ...data }),
  updateProduct: (id, organization_id, data) =>
    apiClient.put(`http://localhost:5000/api/products/${id}`, { organization_id, ...data }),
  deleteProduct: (id, organization_id) =>
    apiClient.delete('http://localhost:5000/api/products/${id}', { params: { organization_id } }),
};

export const dashboardAPI = {
  getDashboard: (organization_id) =>
    apiClient.get('http://localhost:5000/api/dashboard', { params: { organization_id } }),
};

export const settingsAPI = {
  getSettings: (organization_id) =>
    apiClient.get('http://localhost:5000/api/settings', { params: { organization_id } }),
  updateSettings: (organization_id, data) =>
    apiClient.put('http://localhost:5000/api/settings', { organization_id, ...data }),
};

export default apiClient;
