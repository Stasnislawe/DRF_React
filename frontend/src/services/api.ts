import axios from 'axios';
import { API_URL } from '../config';
import { authService } from './auth';

export const api = axios.create({
  baseURL: API_URL,
});

// Интерцепторы для axios
api.interceptors.request.use(
  (config) => {
    const token = authService.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;