import { App } from 'antd';
import { AxiosError } from 'axios';
import { useQuery } from '@tanstack/react-query';

import axiosInstance from './axios';
import { ICommunity } from '@interfaces/index';
import { toastObject, messageObject } from '@utils/formatters';

// RETRIEVE
// ================================================================
export const getUsers = async (): Promise<ICommunity[]> => {
  const { data } = await axiosInstance.get('/users');
  return data;
};
export const useQueryCommunity = () => {
  const { notification } = App.useApp();

  return useQuery(['users'], () => getUsers(), {
    // Stale 5min
    staleTime: 60_000 * 5,
    onError: (error: AxiosError) =>
      notification.error(
        toastObject(
          'error',
          'Impossible de récupérer les données',
          `Vérifiez votre connexion internet ou contactez l'administrateur. Code : ${
            error.response ? error.response.status : error.message
          }`
        )
      )
  });
};
// ================================================================
