import { App } from 'antd';
import { AxiosError } from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import axiosInstance from '../axios';
import { toastObject, messageObject } from '@utils/formatters';
import {
  IPagination,
  IMasterpieceMusic,
  IMasterpieceMusicRequest
} from '@interfaces/index';

// CREATE
// ================================================================
const createMusicMasterpiece = async (payload: IMasterpieceMusicRequest) => {
  const { data } = await axiosInstance.post('/music/masterpieces', payload);
  return data;
};
export const useMutationCreateMusicMasterpiece = () => {
  const queryClient = useQueryClient();
  const { message, notification } = App.useApp();

  return useMutation(createMusicMasterpiece, {
    onMutate: () => {
      message.open(
        messageObject(
          'loading',
          'Ajout...',
          'useMutationCreateMusicMasterpiece'
        )
      );
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries(['music', 'masterpieces']);

      message.success(
        messageObject(
          'success',
          "Ajouté aux chefs d'oeuvres",
          'useMutationCreateMusicMasterpiece'
        )
      );
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 401)
        message.error(
          messageObject(
            'error',
            'Veuillez vous connecter ou créer un compte.',
            'useMutationCreateMusicMasterpiece'
          )
        );
      else
        message.error(
          messageObject(
            'error',
            `Une erreur est survenue. Code : ${
              error.response ? error.response.status : error.message
            }`,
            'useMutationCreateMusicMasterpiece'
          )
        );
    }
  });
};

// ================================================================
// RETRIEVE
// ================================================================
const getMusicMasterpieces = async (
  pageNumber?: number,
  userId?: number
): Promise<IPagination<IMasterpieceMusic[]>> => {
  let params;
  if (!!userId) params = { user_id: userId, page: pageNumber };
  else params = { page: pageNumber };

  const { data } = await axiosInstance.get('/music/masterpieces', {
    params
  });
  return data;
};
export const useQueryMusicMasterpieces = (
  pageNumber?: number,
  userId?: number
) => {
  const { notification } = App.useApp();

  return useQuery(
    ['music', 'masterpieces', pageNumber, userId],
    () => getMusicMasterpieces(pageNumber, userId),
    {
      // Stale 5min
      staleTime: 60_000 * 5,
      onError: (error: AxiosError) =>
        notification.error(
          toastObject(
            'error',
            'Impossible de récupérer les données',
            `Une erreur est survenue. Code : ${
              error.response ? error.response.status : error.message
            }`
          )
        )
    }
  );
};
// ================================================================

// DELETE
// ================================================================
const deleteMusicMasterpiece = async (id: string): Promise<any> => {
  await axiosInstance.delete('/music/masterpieces', {
    params: {
      id: id
    }
  });
};
export const useMutationDeleteMusicMasterpiece = () => {
  const queryClient = useQueryClient();
  const { message, notification } = App.useApp();

  return useMutation(deleteMusicMasterpiece, {
    onMutate: () => {
      message.open(
        messageObject(
          'loading',
          'Suppression...',
          'useMutationDeleteMusicMasterpiece'
        )
      );
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries(['music', 'masterpieces']);
      message.success(
        messageObject(
          'success',
          "Chef d'oeuvre supprimé",
          'useMutationDeleteMusicMasterpiece'
        )
      );
    },
    onError: (error: AxiosError) => {
      message.error(
        messageObject(
          'error',
          `Une erreur est survenue. Code : ${
            error.response ? error.response.status : error.message
          }`,
          'useMutationDeleteMusicMasterpiece'
        )
      );
    }
  });
};
// ================================================================
