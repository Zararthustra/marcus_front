import { App } from 'antd';
import { AxiosError } from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import axiosInstance from '../axios';
import { toastObject, messageObject } from '@utils/formatters';
import {
  IVote,
  IPagination,
  IVoteMusicRequest,
  IVoteMusic
} from '@interfaces/index';

// CREATE
// ================================================================
const createMusicVote = async (payload: IVoteMusicRequest) => {
  const { data } = await axiosInstance.post('/music/votes', payload);
  return data;
};
export const useMutationCreateMusicVote = () => {
  const queryClient = useQueryClient();
  const { message, notification } = App.useApp();

  return useMutation(createMusicVote, {
    onMutate: () => {
      message.open(
        messageObject('loading', 'Ajout...', 'useMutationCreateMusicVote')
      );
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries(['music', 'votes']);
      queryClient.invalidateQueries(['artist', 'votes']);

      message.success(
        messageObject(
          'success',
          'À Voté ! Merci pour votre contribution.',
          'useMutationCreateMusicVote'
        )
      );
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 401)
        message.error(
          messageObject(
            'error',
            'Veuillez vous connecter ou créer un compte.',
            'useMutationCreateMusicVote'
          )
        );
      else
        message.error(
          messageObject(
            'error',
            `Une erreur est survenue. Code : ${
              error.response ? error.response.status : error.message
            }`,
            'useMutationCreateMusicVote'
          )
        );
    }
  });
};

// ================================================================
// RETRIEVE
// ================================================================
const getMusicVotes = async (
  pageNumber?: number,
  userId?: number
): Promise<IPagination<IVoteMusic[]>> => {
  let params;
  if (!!userId) params = { user_id: userId, page: pageNumber };
  else params = { page: pageNumber };

  const { data } = await axiosInstance.get('/music/votes', {
    params
  });
  return data;
};
export const useQueryMusicVotes = (pageNumber?: number, userId?: number) => {
  const { notification } = App.useApp();

  return useQuery(
    ['music', 'votes', pageNumber, userId],
    () => getMusicVotes(pageNumber, userId),
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
const getArtistVotes = async (
  artistId: string
): Promise<IPagination<IVoteMusic[]>> => {
  const { data } = await axiosInstance.get('/music/votes', {
    params: { artist_id: artistId }
  });
  return data;
};
export const useQueryArtistVotes = (artistId: string) => {
  const { notification } = App.useApp();

  return useQuery(
    ['artist', 'votes', artistId],
    () => getArtistVotes(artistId),
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
const deleteMusicVote = async (id: string): Promise<any> => {
  await axiosInstance.delete('/music/votes', {
    params: {
      id: id
    }
  });
};
export const useMutationDeleteMusicVote = () => {
  const queryClient = useQueryClient();
  const { message, notification } = App.useApp();

  return useMutation(deleteMusicVote, {
    onMutate: () => {
      message.open(
        messageObject('loading', 'Suppression...', 'useMutationDeleteMusicVote')
      );
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries(['music', 'votes']);
      message.success(
        messageObject('success', 'Vote supprimé', 'useMutationDeleteMusicVote')
      );
    },
    onError: (error: AxiosError) => {
      message.error(
        messageObject(
          'error',
          `Une erreur est survenue. Code : ${
            error.response ? error.response.status : error.message
          }`,
          'useMutationDeleteMusicVote'
        )
      );
    }
  });
};
// ================================================================

// UPDATE
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
