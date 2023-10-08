import { App } from 'antd';
import { AxiosError } from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  ICriticMusic,
  ICriticMusicRequest,
  IMovieCritic,
  IPagination
} from '@interfaces/index';
import axiosInstance from '../axios';
import { toastObject, messageObject } from '@utils/formatters';

// CREATE
// ================================================================
const createMusicCritic = async (payload: ICriticMusicRequest) => {
  const { data } = await axiosInstance.post('/music/critics', payload);
  return data;
};
export const useMutationCreateAlbumCritic = () => {
  const queryClient = useQueryClient();
  const { message, notification } = App.useApp();

  return useMutation(createMusicCritic, {
    onMutate: () => {
      message.open(
        messageObject('loading', 'Ajout...', 'useMutationCreateAlbumCritic')
      );
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries(['music', 'critics']);
      queryClient.invalidateQueries(['artist', 'critics']);

      message.success(
        messageObject(
          'success',
          'Critique ajoutée. Merci pour votre contribution !',
          'useMutationCreateAlbumCritic'
        )
      );
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 401)
        message.error(
          messageObject(
            'error',
            'Veuillez vous connecter ou créer un compte.',
            'useMutationCreateAlbumCritic'
          )
        );
      else
        message.error(
          messageObject(
            'error',
            `Une erreur est survenue. Code : ${
              error.response ? error.response.status : error.message
            }`,
            'useMutationCreateAlbumCritic'
          )
        );
    }
  });
};
// ================================================================

// RETRIEVE
// ================================================================
const getMusicCritics = async (
  pageNumber: number,
  userId?: number
): Promise<IPagination<ICriticMusic[]>> => {
  let params;
  if (!!userId) params = { user_id: userId, page: pageNumber };
  else params = { page: pageNumber };

  const { data } = await axiosInstance.get('/music/critics', {
    params
  });
  return data;
};
export const useQueryMusicCritics = (pageNumber: number, userId?: number) => {
  const { notification } = App.useApp();

  return useQuery(
    ['music', 'critics', pageNumber, userId],
    () => getMusicCritics(pageNumber, userId),
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
const getArtistCritics = async (
  artistId: string
): Promise<IPagination<ICriticMusic[]>> => {
  const { data } = await axiosInstance.get('/music/critics', {
    params: { artist_id: artistId }
  });
  return data;
};
export const useQueryArtistCritics = (artistId: string) => {
  const { notification } = App.useApp();

  return useQuery(
    ['artist', 'critics', artistId],
    () => getArtistCritics(artistId),
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
const deleteMusicCritic = async (id: string): Promise<any> => {
  await axiosInstance.delete('/music/critics', {
    params: {
      id: id
    }
  });
};
export const useMutationDeleteMusicCritic = () => {
  const queryClient = useQueryClient();
  const { message, notification } = App.useApp();

  return useMutation(deleteMusicCritic, {
    onMutate: () => {
      message.open(
        messageObject(
          'loading',
          'Suppression...',
          'useMutationDeleteMusicCritic'
        )
      );
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries(['music', 'critics']);
      message.success(
        messageObject(
          'success',
          'Critique supprimée',
          'useMutationDeleteMusicCritic'
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
          'useMutationDeleteMusicCritic'
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
