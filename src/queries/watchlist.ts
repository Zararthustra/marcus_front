import { App } from 'antd';
import { AxiosError } from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  IMasterpiece,
  IMasterpieceRequest,
  IPagination
} from '@interfaces/index';
import axiosInstance from './axios';
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
      message.error(
        messageObject(
          'error',
          `Une erreur est survenue. Code : ${error.response?.status}`,
          'useMutationCreateWatchlist'
        )
      );
      if (error.response?.status === 401)
        notification.error(
          toastObject(
            'error',
            'Compte requis',
            'Veuillez vous connecter ou créer un compte.'
          )
        );
      else
        notification.error(
          toastObject(
            'error',
            'Ajout impossible',
            "Vérifiez votre connexion internet ou contactez l'administrateur"
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
  userId?: number
): Promise<IPagination<IMasterpiece[]>> => {
  let params;
  if (!!userId) params = { user_id: userId, page: pageNumber };
  else params = { page: pageNumber };

  const { data } = await axiosInstance.get('/watchlists', {
    params
  });
  return data;
};
export const useQueryWatchlists = (pageNumber?: number, userId?: number) => {
  const { notification } = App.useApp();

  return useQuery(
    ['watchlists', pageNumber, userId],
    () => getWatchlists(pageNumber, userId),
    {
      // Stale 5min
      staleTime: 60_000 * 5,
      onError: (error) =>
        notification.error(
          toastObject(
            'error',
            'Impossible de récupérer les données',
            "Vérifiez votre connexion internet ou contactez l'administrateur"
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
          `Une erreur est survenue. Code : ${error.response?.status}`,
          'useMutationDeleteWatchlist'
        )
      );
      notification.error(
        toastObject(
          'error',
          'Suppression échouée',
          "Vérifiez votre connexion internet ou contactez l'administrateur"
        )
      );
    }
  });
};
// ================================================================
