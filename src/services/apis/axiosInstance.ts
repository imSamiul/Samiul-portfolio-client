import axios from 'axios';
import Cookies from 'js-cookie';

import { API_PREFIX, env } from '@/lib/env';

export const axiosInstance = axios.create({
  baseURL: `${env.apiBaseUrl}${API_PREFIX}`,
});

// Auth is still Bearer: the API issues a JWT and the browser keeps it in a
// readable `token` cookie. The httpOnly cookie migration is a separate task.
axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
