import { App } from 'antd';
import { AxiosError } from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import axiosInstance from './axios';
import { toastObject, messageObject } from '@utils/formatters';
import { IVote, IPagination, IVoteRequest } from '@interfaces/index';

// CREATE
// ================================================================
const createVote = async (payload: IVoteRequest) => {
  const { data } = await axiosInstance.post('/votes', payload);
  return data;
};
export const useMutationCreateVote = () => {
  const queryClient = useQueryClient();
  const { message, notification } = App.useApp();

  return useMutation(createVote, {
    onMutate: () => {
      message.open(
        messageObject('loading', 'Ajout...', 'useMutationCreateVote')
      );
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries(['votes']);

      message.success(
        messageObject(
          'success',
          'À Voté ! Merci pour votre contribution.',
          'useMutationCreateVote'
        )
      );
    },
    onError: (error: AxiosError) => {
      message.error(
        messageObject(
          'error',
          `Une erreur est survenue. Code : ${error.response?.status}`,
          'useMutationCreateVote'
        )
      );
      if (error.response?.status === 401)
        notification.error(
          toastObject(
            'error',
            'Compte requis',
            'Pour voter, veuillez vous connecter ou créer un compte.'
          )
        );
      else
        notification.error(
          toastObject(
            'error',
            'Ajout impossible',
            `Vérifiez votre connexion internet ou contactez l'administrateur. Code: ${error.response?.status}`
          )
        );
    }
  });
};

// ================================================================
// RETRIEVE
// ================================================================
const getVotes = async (
  pageNumber?: number,
  userId?: number
): Promise<IPagination<IVote[]>> => {
  let params;
  if (!!userId) params = { user_id: userId, page: pageNumber };
  else params = { page: pageNumber };

  const { data } = await axiosInstance.get('/votes', {
    params
  });
  return data;
};
export const useQueryVotes = (pageNumber?: number, userId?: number) => {
  const { notification } = App.useApp();

  return useQuery(
    ['votes', pageNumber, userId],
    () => getVotes(pageNumber, userId),
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
const deleteVote = async (movieId: number): Promise<any> => {
  await axiosInstance.delete('/votes', {
    params: {
      movie_id: movieId
    }
  });
};
export const useMutationDeleteVote = () => {
  const queryClient = useQueryClient();
  const { message, notification } = App.useApp();

  return useMutation(deleteVote, {
    onMutate: () => {
      message.open(
        messageObject('loading', 'Suppression...', 'useMutationDeleteVote')
      );
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries(['votes']);
      message.success(
        messageObject('success', 'Vote supprimé', 'useMutationDeleteVote')
      );
    },
    onError: (error: AxiosError) => {
      message.error(
        messageObject(
          'error',
          `Une erreur est survenue. Code : ${error.response?.status}`,
          'useMutationDeleteVote'
        )
      );
      notification.error(
        toastObject(
          'error',
          'Suppression échouée',
          `Vérifiez votre connexion internet ou contactez l'administrateur. Code: ${error.response?.status}`
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
