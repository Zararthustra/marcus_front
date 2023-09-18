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
      message.error(
        messageObject(
          'error',
          `Une erreur est survenue. Code : ${error.response?.status}`,
          'useMutationCreateMasterpiece'
        )
      );
      if (error.response?.status === 401)
        notification.error(
          toastObject(
            'error',
            'Compte requis',
            "Pour ajouter un chef d'oeuvre, veuillez vous connecter ou créer un compte."
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
const getMasterpieces = async (
  pageNumber?: number,
  userId?: number
): Promise<IPagination<IMasterpiece[]>> => {
  let params;
  if (!!userId) params = { user_id: userId, page: pageNumber };
  else params = { page: pageNumber };

  const { data } = await axiosInstance.get('/masterpieces', {
    params
  });
  return data;
};
export const useQueryMasterpieces = (pageNumber?: number, userId?: number) => {
  const { notification } = App.useApp();

  return useQuery(
    ['masterpieces', pageNumber, userId],
    () => getMasterpieces(pageNumber, userId),
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
          `Une erreur est survenue. Code : ${error.response?.status}`,
          'useMutationDeleteMasterpiece'
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
