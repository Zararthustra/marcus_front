import { App } from 'antd';
import { AxiosError } from 'axios';
import { useQuery } from '@tanstack/react-query';

import axiosInstance from './axios';
import { ICommunity } from '@interfaces/index';
import { toastObject, messageObject } from '@utils/formatters';

// RETRIEVE
// ================================================================
export const getUser = async (userId: number): Promise<ICommunity> => {
  const { data } = await axiosInstance.get(`/users/${userId}`);
  return data;
};
export const useQueryUser = (userId: number) => {
  const { notification, message } = App.useApp();

  return useQuery(['user', userId], () => getUser(userId), {
    // Stale 5min
    staleTime: 60_000 * 5,
    onError: (error: AxiosError) => {
      if (error.response?.status === 404)
        message.error(messageObject('error', "Cet utilisateur n'existe pas."));
      else
        notification.error(
          toastObject(
            'error',
            'Impossible de récupérer les données',
            `Une erreur est survenue. Code : ${
              error.response ? error.response.status : error.message
            }`
          )
        );
    }
  });
};
// ================================================================
