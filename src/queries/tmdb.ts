import { App } from 'antd';
import axios, { AxiosError, AxiosInstance } from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { toastObject, messageObject } from '@utils/formatters';
import { IRelease, IMovieResult, ITVResults } from '@interfaces/index';

const tmdbInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_TMDB_URL,
  params: { api_key: import.meta.env.VITE_TMDB_API_KEY, language: 'fr-FR' }
});

// Cinema
const getCinemaReleases = async (): Promise<IRelease<IMovieResult>> => {
  const { data } = await tmdbInstance.get('/discover/movie', {
    params: {
      append_to_response: 'videos,images',
      include_image_language: 'fr, null'
    }
  });
  return data;
};
export const useQueryCinema = () => {
  const { notification } = App.useApp();

  return useQuery(['cinema'], () => getCinemaReleases(), {
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
  });
};

// Netflix
const getNetflixReleases = async (): Promise<IRelease<ITVResults>> => {
  const { data } = await tmdbInstance.get('/discover/tv', {
    params: { with_networks: 213 }
  });
  return data;
};
export const useQueryNetflix = () => {
  const { notification } = App.useApp();

  return useQuery(['netflix'], () => getNetflixReleases(), {
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
  });
};

// Disney
const getDisneyReleases = async (): Promise<IRelease<ITVResults>> => {
  const { data } = await tmdbInstance.get('/discover/tv', {
    params: { with_networks: 2739 }
  });
  return data;
};
export const useQueryDisney = () => {
  const { notification } = App.useApp();

  return useQuery(['disney'], () => getDisneyReleases(), {
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
  });
};

// Amazon
const getAmazonReleases = async (): Promise<IRelease<ITVResults>> => {
  const { data } = await tmdbInstance.get('/discover/tv', {
    params: { with_networks: 1024 }
  });
  return data;
};
export const useQueryAmazon = () => {
  const { notification } = App.useApp();

  return useQuery(['amazon'], () => getAmazonReleases(), {
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
  });
};

// Search Movie
export const searchMovie = async (
  movieName: string
): Promise<IRelease<IMovieResult>> => {
  const { data } = await tmdbInstance.get('/search/movie', {
    params: { query: movieName }
  });
  return data;
};

// Search TV
export const searchTv = async (
  tvName: string
): Promise<IRelease<ITVResults>> => {
  const { data } = await tmdbInstance.get('/search/tv', {
    params: { query: tvName }
  });
  return data;
};

// Movie by ID
const getMovie = async (movieId: string): Promise<IMovieResult> => {
  const { data } = await tmdbInstance.get(`/movie/${movieId}`, {
    params: {
      append_to_response: 'videos,images,credits,watch/providers',
      include_image_language: 'fr, null'
    }
  });
  return data;
};
export const useQueryMovie = (movieId: string) => {
  const { notification } = App.useApp();

  return useQuery(['movie', movieId], () => getMovie(movieId), {
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
  });
};

// TV by ID
const getTV = async (movieId: string): Promise<ITVResults> => {
  const { data } = await tmdbInstance.get(`/tv/${movieId}`, {
    params: {
      append_to_response: 'videos,images,credits,watch/providers',
      include_image_language: 'fr, null'
    }
  });
  return data;
};
export const useQueryTV = (movieId: string) => {
  const { notification } = App.useApp();

  return useQuery(['tv', movieId], () => getTV(movieId), {
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
  });
};
