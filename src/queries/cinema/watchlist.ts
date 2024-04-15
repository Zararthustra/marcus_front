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
const addWatchlists = async (payload: IMasterpieceRequest) => {
  const { data } = await axiosInstance.post('/watchlists', payload);
  return data;
};
export const useMutationAddWatchlist = () => {
  const queryClient = useQueryClient();
  const { message, notification } = App.useApp();

  return useMutation(addWatchlists, {
    onMutate: () => {
      message.open(
        messageObject('loading', 'Ajout...', 'useMutationCreateWatchlist')
      );
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries(['watchlists']);

      message.success(
        messageObject(
          'success',
          'Ajouté à ma watchlist',
          'useMutationCreateWatchlist'
        )
      );
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 401)
        message.error(
          messageObject(
            'error',
            'Veuillez vous connecter ou créer un compte.',
            'useMutationCreateWatchlist'
          )
        );
      else
        message.error(
          messageObject(
            'error',
            `Une erreur est survenue. Code : ${
              error.response ? error.response.status : error.message
            }`,
            'useMutationCreateWatchlist'
          )
        );
    }
  });
};
// ================================================================

// RETRIEVE
// ================================================================
const getWatchlists = async (
  pageNumber?: number,
  userId?: number,
  tag?: string
): Promise<IPagination<IMasterpiece[]>> => {
  const params = {
    ...(!!pageNumber && { page: pageNumber }),
    ...(!!userId && { user_id: userId }),
    ...(!!tag && { tag: tag })
  };

  const { data } = await axiosInstance.get('/watchlists', {
    params
  });
  return data;
};
export const useQueryWatchlists = (
  pageNumber?: number,
  userId?: number,
  tag?: string
) => {
  const { notification } = App.useApp();

  return useQuery(
    ['watchlists', pageNumber, userId, tag],
    () => getWatchlists(pageNumber, userId, tag),
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
const delWatchlists = async (movieId: number): Promise<any> => {
  await axiosInstance.delete(`/watchlists`, {
    params: {
      movie_id: movieId
    }
  });
};
export const useMutationDelWatchlist = () => {
  const queryClient = useQueryClient();
  const { message, notification } = App.useApp();

  return useMutation(delWatchlists, {
    onMutate: () => {
      message.open(
        messageObject('loading', 'Suppression...', 'useMutationDeleteWatchlist')
      );
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries(['watchlists']);
      message.success(
        messageObject(
          'success',
          'Supprimé de ma watchlist',
          'useMutationDeleteWatchlist'
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
          'useMutationDeleteWatchlist'
        )
      );
    }
  });
};
// ================================================================
