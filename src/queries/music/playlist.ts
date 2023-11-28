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
const createMusicPlaylist = async (payload: IMasterpieceMusicRequest) => {
  const { data } = await axiosInstance.post('/music/playlists', payload);
  return data;
};
export const useMutationCreateMusicPlaylist = () => {
  const queryClient = useQueryClient();
  const { message, notification } = App.useApp();

  return useMutation(createMusicPlaylist, {
    onMutate: () => {
      message.open(
        messageObject('loading', 'Ajout...', 'useMutationCreateMusicPlaylist')
      );
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries(['music', 'playlist']);

      message.success(
        messageObject(
          'success',
          'Ajouté à la playlist',
          'useMutationCreateMusicPlaylist'
        )
      );
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 401)
        message.error(
          messageObject(
            'error',
            'Veuillez vous connecter ou créer un compte.',
            'useMutationCreateMusicPlaylist'
          )
        );
      else
        message.error(
          messageObject(
            'error',
            `Une erreur est survenue. Code : ${
              error.response ? error.response.status : error.message
            }`,
            'useMutationCreateMusicPlaylist'
          )
        );
    }
  });
};

// ================================================================
// RETRIEVE
// ================================================================
const getMusicPlaylist = async (
  pageNumber?: number,
  userId?: number
): Promise<IPagination<IMasterpieceMusic[]>> => {
  let params;
  if (!!userId) params = { user_id: userId, page: pageNumber };
  else params = { page: pageNumber };

  const { data } = await axiosInstance.get('/music/playlists', {
    params
  });
  return data;
};
export const useQueryMusicPlaylist = (pageNumber?: number, userId?: number) => {
  const { notification } = App.useApp();

  return useQuery(
    ['music', 'playlist', pageNumber, userId],
    () => getMusicPlaylist(pageNumber, userId),
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
const deleteMusicPlaylist = async (id: string): Promise<any> => {
  await axiosInstance.delete('/music/playlists', {
    params: {
      id: id
    }
  });
};
export const useMutationDeleteMusicPlaylist = () => {
  const queryClient = useQueryClient();
  const { message, notification } = App.useApp();

  return useMutation(deleteMusicPlaylist, {
    onMutate: () => {
      message.open(
        messageObject(
          'loading',
          'Suppression...',
          'useMutationDeleteMusicPlaylist'
        )
      );
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries(['music', 'playlist']);
      message.success(
        messageObject(
          'success',
          'Supprimé de la playlist',
          'useMutationDeleteMusicPlaylist'
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
          'useMutationDeleteMusicPlaylist'
        )
      );
    }
  });
};
// ================================================================
