import { App } from 'antd';
import { AxiosError } from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  IMasterpiece,
  IMasterpieceRequest,
  IPagination
} from '@interfaces/index';
import axiosInstance from '../axios';
import { toastObject, messageObject } from '@utils/formatters';

// CREATE
// ================================================================
const addMasterpieces = async (payload: IMasterpieceRequest) => {
  const { data } = await axiosInstance.post('/masterpieces', payload);
  return data;
};
export const useMutationAddMasterpiece = () => {
  const queryClient = useQueryClient();
  const { message, notification } = App.useApp();

  return useMutation(addMasterpieces, {
    onMutate: () => {
      message.open(
        messageObject('loading', 'Ajout...', 'useMutationCreateMasterpiece')
      );
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries(['masterpieces']);

      message.success(
        messageObject(
          'success',
          "Ajouté aux chefs d'oeuvres",
          'useMutationCreateMasterpiece'
        )
      );
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 401)
        message.error(
          messageObject(
            'error',
            'Veuillez vous connecter ou créer un compte.',
            'useMutationCreateMasterpiece'
          )
        );
      else
        message.error(
          messageObject(
            'error',
            `Une erreur est survenue. Code : ${
              error.response ? error.response.status : error.message
            }`,
            'useMutationCreateMasterpiece'
          )
        );
    }
  });
};
// ================================================================

// RETRIEVE
// ================================================================
const getMasterpieces = async (
  pageNumber?: number,
  userId?: number,
  tag?: string
): Promise<IPagination<IMasterpiece[]>> => {
  const params = {
    ...(!!pageNumber && { page: pageNumber }),
    ...(!!userId && { user_id: userId }),
    ...(!!tag && { tag: tag })
  };

  const { data } = await axiosInstance.get('/masterpieces', {
    params
  });
  return data;
};
export const useQueryMasterpieces = (
  pageNumber?: number,
  userId?: number,
  tag?: string
) => {
  const { notification } = App.useApp();

  return useQuery(
    ['masterpieces', pageNumber, userId, tag],
    () => getMasterpieces(pageNumber, userId, tag),
    {
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
    }
  );
};
// ================================================================

// DELETE
// ================================================================
const delMasterpieces = async (movieId: number): Promise<any> => {
  await axiosInstance.delete(`/masterpieces`, {
    params: {
      movie_id: movieId
    }
  });
};
export const useMutationDelMasterpiece = () => {
  const queryClient = useQueryClient();
  const { message, notification } = App.useApp();

  return useMutation(delMasterpieces, {
    onMutate: () => {
      message.open(
        messageObject(
          'loading',
          'Suppression...',
          'useMutationDeleteMasterpiece'
        )
      );
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries(['masterpieces']);
      message.success(
        messageObject(
          'success',
          "Supprimé des chefs d'oeuvres",
          'useMutationDeleteMasterpiece'
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
          'useMutationDeleteMasterpiece'
        )
      );
    }
  });
};
// ================================================================
