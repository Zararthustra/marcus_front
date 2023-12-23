import jwt_decode from 'jwt-decode';
import axios, { AxiosInstance } from 'axios';

import { getLS } from '@services/localStorageService';

const devURL = 'http://localhost:8000/api';
const prodURL = 'https://planifit.pythonanywhere.com/api';
export const baseURL = import.meta.env.MODE === 'production' ? prodURL : devURL;

const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
});

axiosInstance.interceptors.request.use(
  function (config) {
    const token = getLS('accessToken');
    const dummyToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAzNDI5NTU2LCJpYXQiOjE3MDMzNDMxNTYsImp0aSI6ImYzZDIyODcyZWJkMTQwMGJhYzhkMmI0ZDkzNGM3ZGIzIiwidXNlcl9pZCI6MSwibmFtZSI6ImFydGh5In0.WpkPlHp3kQudneeL-LfZlwAK4oInYk0ZOF8VRvu-Yzc';
    const now = Math.floor(Date.now() / 1000);
    const expTokenTimestamp = jwt_decode<any>(!!token ? token : dummyToken).exp;
    const isExpiredToken = expTokenTimestamp < now;

    if (!!token && !isExpiredToken)
      config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosInstance;
