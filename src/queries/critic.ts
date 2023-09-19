import { App } from 'antd';
import { AxiosError } from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  ICritic,
  ICriticRequest,
  IMovieCritic,
  IPagination
} from '@interfaces/index';
import axiosInstance from './axios';
import { toastObject, messageObject } from '@utils/formatters';

// CREATE
// ================================================================
const createCritic = async (payload: ICriticRequest) => {
  const { data } = await axiosInstance.post('/critics', payload);
  return data;
};
export const useMutationCreateCritic = () => {
  const queryClient = useQueryClient();
  const { message, notification } = App.useApp();

  return useMutation(createCritic, {
    onMutate: () => {
      message.open(
        messageObject('loading', 'Ajout...', 'useMutationCreateCritic')
      );
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries(['critics']);

      message.success(
        messageObject(
          'success',
          'Critique ajoutée. Merci pour votre contribution !',
          'useMutationCreateCritic'
        )
      );
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 401)
        message.error(
          messageObject(
            'error',
            'Veuillez vous connecter ou créer un compte.',
            'useMutationCreateCritic'
          )
        );
      else
        message.error(
          messageObject(
            'error',
            `Une erreur est survenue. Code : ${
              error.response ? error.response.status : error.message
            }`,
            'useMutationCreateCritic'
          )
        );
    }
  });
};
// ================================================================

// RETRIEVE
// ================================================================
const getCritics = async (
  pageNumber: number,
  userId?: number
): Promise<IPagination<ICritic[]>> => {
  let params;
  if (!!userId) params = { user_id: userId, page: pageNumber };
  else params = { page: pageNumber };

  const { data } = await axiosInstance.get('/critics', {
    params
  });
  return data;
};
export const useQueryCritics = (pageNumber: number, userId?: number) => {
  const { notification } = App.useApp();

  return useQuery(
    ['critics', pageNumber, userId],
    () => getCritics(pageNumber, userId),
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

// ================================================================
const getMovieCritics = async (
  movieId: string
): Promise<{ data: IMovieCritic[] }> => {
  const { data } = await axiosInstance.get(`/critics?movie_id=${movieId}`);
  return data;
};
export const useQueryMovieCritics = (movieId: string) => {
  const { notification } = App.useApp();

  return useQuery(['critics', movieId], () => getMovieCritics(movieId), {
    // Stale 5min
    staleTime: 60_000 * 5,
    onError: (error: AxiosError) =>
      notification.error(
        toastObject(
          'error',
          'Impossible de récupérer les données',
          `Vérifiez votre connexion internet ou contactez l'administrateur. Code: ${
            error.response ? error.response.status : error.message
          }`
        )
      )
  });
};
// ================================================================

// DELETE
// ================================================================
const deleteCritic = async (movieId: number): Promise<any> => {
  await axiosInstance.delete('/critics', {
    params: {
      movie_id: movieId
    }
  });
};
export const useMutationDeleteCritic = () => {
  const queryClient = useQueryClient();
  const { message, notification } = App.useApp();

  return useMutation(deleteCritic, {
    onMutate: () => {
      message.open(
        messageObject('loading', 'Suppression...', 'useMutationDeleteCritic')
      );
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries(['critics']);
      message.success(
        messageObject(
          'success',
          'Critique supprimée',
          'useMutationDeleteCritic'
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
          'useMutationDeleteCritic'
        )
      );
    }
  });
};
// ================================================================

// UPDATE
// ================================================================
// const update = async ({ payload, id }: { payload: any; id: number }) => {
//   const { data } = await axiosInstance.patch(`/endpoint/${id}`, payload);
//   return data;
// };
// export const useMutationUpdate = () => {
//   const queryClient = useQueryClient();
//   const { message, notification } = App.useApp();

//   return useMutation(update, {
//     onMutate: () => {
//       message.open(
//         messageObject(
//           'loading',
//           'Modification en cours...',
//           'useMutationUpdate'
//         )
//       );
//     },
//     onSuccess: (response) => {
//       queryClient.invalidateQueries(['someQuery']);
//       message.success(
//         messageObject('success', 'Modification réussie', 'useMutationUpdate')
//       );
//     },
//     onError: (error) => {
//       message.error(
//         messageObject('error', 'Une erreur est survenue', 'useMutationUpdate')
//       );
//       notification.error(
//         toastObject(
//           'error',
//           'Modification échouée',
//           "Vérifiez votre connexion internet ou contactez l'administrateur"
//         )
//       );
//     }
//   });
// };
// ================================================================
