import { App } from 'antd';
import { Buffer } from 'buffer';
import axios, { AxiosError, AxiosInstance } from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';

import { toastObject, messageObject } from '@utils/formatters';
import { ISearchArtist, ISearchTrack } from '@interfaces/index';
import { getLS, setLS } from '@services/localStorageService';
import { useNavigate } from 'react-router-dom';

const spotifyInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SPOTIFY_BASE_URL,
  headers: { Authorization: 'Bearer ' + getLS('spotify_AT') }
});

// Login
// ================================================================
const logSpotify = async (): Promise<any> => {
  const token = Buffer.from(
    import.meta.env.VITE_SPOTIFY_ID + ':' + import.meta.env.VITE_SPOTIFY_SECRET,
    'utf-8'
  ).toString('base64');

  const { data } = await axios.post(
    'https://accounts.spotify.com/api/token',
    { grant_type: 'client_credentials' },
    {
      headers: {
        Authorization: 'Basic ' + token,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  );
  return data;
};
export const useMutationLogSpotify = () => {
  const navigate = useNavigate();
  const { message } = App.useApp();

  return useMutation(logSpotify, {
    onSuccess: (response) => {
      setLS('spotify_AT', response.access_token);
      navigate(0);
    },
    onError: (error: AxiosError) => {
      message.error(
        messageObject(
          'error',
          `Une erreur est survenue. Code : ${
            error.response ? error.response.status : error.message
          }`
        )
      );
    }
  });
};
// ================================================================

// Artist
// ================================================================
const getArtist = async (artist_id: string): Promise<any> => {
  const { data } = await spotifyInstance.get(`artists/${artist_id}`);
  return data;
};
export const useQueryArtist = (artist_id: string) => {
  const { notification } = App.useApp();
  const { mutate: loginSpotify } = useMutationLogSpotify();

  return useQuery(['artist', artist_id], () => getArtist(artist_id), {
    // Stale 5min
    staleTime: 60_000 * 5,
    retry: 1,
    onError: (error: AxiosError) => {
      if ([400, 401].includes(error.response?.status as number)) loginSpotify();

      notification.error(
        toastObject(
          'error',
          'Impossible de récupérer les données',
          `Une erreur est survenue. Code : ${
            error.response ? error.response.status : error.message
          }`
        )
      );
    }
  });
};
// ================================================================

// Artist Albums
// ================================================================
const getArtistAlbums = async (artist_id: string): Promise<any> => {
  const { data } = await spotifyInstance.get(`artists/${artist_id}/albums`);
  return data;
};
export const useQueryArtistAlbums = (artist_id: string) => {
  const { notification } = App.useApp();
  const { mutate: loginSpotify } = useMutationLogSpotify();

  return useQuery(['albums', artist_id], () => getArtistAlbums(artist_id), {
    // Stale 5min
    staleTime: 60_000 * 5,
    retry: 1,
    onError: (error: AxiosError) => {
      if ([400, 401].includes(error.response?.status as number)) loginSpotify();

      notification.error(
        toastObject(
          'error',
          'Impossible de récupérer les données',
          `Une erreur est survenue. Code : ${
            error.response ? error.response.status : error.message
          }`
        )
      );
    }
  });
};
// ================================================================

// Search
// ================================================================
const searchMusic = async (
  query: string,
  type?: 'artist' | 'track'
): Promise<ISearchArtist | ISearchTrack> => {
  const { data } = await spotifyInstance.get(`search`, {
    params: {
      q: query,
      type: type,
      market: 'FR'
    }
  });
  return data;
};
export const useQuerySearch = (query: string, type?: 'artist' | 'track') => {
  const { notification } = App.useApp();
  const { mutate: loginSpotify } = useMutationLogSpotify();

  return useQuery([type, query], () => searchMusic(query, type), {
    // Stale 5min
    staleTime: 60_000 * 5,
    enabled: !!type,
    retry: 1,
    onError: (error: AxiosError) => {
      if ([400, 401].includes(error.response?.status as number)) loginSpotify();

      notification.error(
        toastObject(
          'error',
          'Impossible de récupérer les données',
          `Une erreur est survenue. Code : ${
            error.response ? error.response.status : error.message
          }`
        )
      );
    }
  });
};
// ================================================================
