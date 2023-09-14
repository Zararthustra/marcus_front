import axios, { AxiosInstance } from 'axios';

import { getLS } from '@services/localStorageService';

const devURL = 'http://192.168.1.44:8000/api';
const prodURL = 'https://planifit.pythonanywhere.com/api';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.MODE === 'production' ? prodURL : devURL,
  headers: {
    'Content-Type': 'application/json'
  }
});

axiosInstance.interceptors.request.use(
  function (config) {
    const token = getLS('accessToken');
    if (token) config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosInstance;
