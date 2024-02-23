import { App } from 'antd';
import axios, { AxiosError, AxiosInstance } from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  IRelease,
  IMovieResult,
  ITVResults,
  IPersonMovies,
  IPersonTVs,
  IPersonSearch
} from '@interfaces/index';
import { toastObject, messageObject } from '@utils/formatters';

const tmdbInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_TMDB_URL,
  params: { api_key: import.meta.env.VITE_TMDB_API_KEY, language: 'fr-FR' }
});

const getLastWeek = () => {
  var today = new Date();
  var lastWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 7
  );
  return lastWeek;
};

// Cinema
const getCinemaReleases = async (): Promise<IRelease<IMovieResult>> => {
  const { data } = await tmdbInstance.get('/discover/movie', {
    params: {
      append_to_response: 'videos,images',
      include_image_language: 'fr, null',
      'release_date.gte': getLastWeek(),
      region: 'FR',
      watch_region: 'FR',
      language: 'fr-FR',
      with_release_type: '2,3'
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
    params: {
      with_networks: 213,
      'air_date.gte': getLastWeek(),
      language: 'fr-FR',
      watch_region: 'FR'
    }
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
    params: {
      with_networks: 2739,
      'air_date.gte': getLastWeek(),
      language: 'fr-FR',
      watch_region: 'FR'
    }
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
    params: {
      with_networks: 1024,
      'air_date.gte': getLastWeek(),
      language: 'fr-FR',
      watch_region: 'FR'
    }
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

// Search Person
export const searchPerson = async (
  personName: string
): Promise<IRelease<IPersonSearch>> => {
  const { data } = await tmdbInstance.get('/search/person', {
    params: { query: personName }
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

// Person Movies
const getPersonMovies = async (personId: number): Promise<IPersonMovies> => {
  const { data } = await tmdbInstance.get(`person/${personId}/movie_credits`, {
    params: {
      append_to_response: 'videos,images',
      include_image_language: 'fr, null'
    }
  });
  return data;
};
export const useQueryPersonMovies = (personId: number) => {
  const { notification } = App.useApp();

  return useQuery(
    ['movie', 'person', personId],
    () => getPersonMovies(personId),
    {
      // Stale 5min
      enabled: !!personId,
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

// Person TVs
const getPersonTVs = async (personId: number): Promise<IPersonTVs> => {
  const { data } = await tmdbInstance.get(`person/${personId}/tv_credits`, {
    params: {
      append_to_response: 'videos,images',
      include_image_language: 'fr, null'
    }
  });
  return data;
};
export const useQueryPersonTVs = (personId: number) => {
  const { notification } = App.useApp();

  return useQuery(['tv', 'person', personId], () => getPersonTVs(personId), {
    // Stale 5min
    enabled: !!personId,
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
