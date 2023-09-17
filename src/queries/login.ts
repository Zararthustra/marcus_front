import { App } from 'antd';
import { AxiosError } from 'axios';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import {
  getLS,
  setAccessToken,
  setLS,
  setRefreshToken
} from '@services/localStorageService';
import axiosInstance from './axios';
import { messageObject, toastObject } from '@utils/formatters';
import { ILoginRequest, ILoginResponse } from '@interfaces/index';

// Login
const login = async (payload: ILoginRequest) => {
  const { data } = await axiosInstance.post<ILoginResponse>(`/token/`, payload);
  return data;
};
export const useMutationLogin = () => {
  const navigate = useNavigate();
  const { notification } = App.useApp();

  return useMutation(login, {
    onSuccess: (response) => {
      setAccessToken(response.access);
      setRefreshToken(response.refresh);
      try {
        const token = jwt_decode<any>(response.access);
        setLS('name', token.name);
        setLS('userId', token.user_id);

        notification.success(
          toastObject(
            'success',
            'Connexion réussie',
            `Bienvenue ${token.name} !`
          )
        );
        navigate(`/`);
      } catch (error) {
        console.log('JWT Error:', error);
        notification.error(
          toastObject(
            'error',
            'Problème de connexion',
            `Une erreur est survenue, veuillez vous reconnecter`
          )
        );
      }
    },
    onError: (error) =>
      notification.error(
        toastObject(
          'error',
          'Connexion impossible',
          'Email ou mot de passe incorrect.'
        )
      )
  });
};

// Reconnect
const reconnect = async (refreshToken: string) => {
  const { data } = await axiosInstance.post<ILoginResponse>(`/token/refresh/`, {
    refresh: refreshToken
  });
  return data;
};
export const useMutationReconnect = () => {
  const navigate = useNavigate();
  const { notification } = App.useApp();

  return useMutation(reconnect, {
    onSuccess: (response) => {
      setAccessToken(response.access);
      setRefreshToken(response.refresh);
      try {
        const token = jwt_decode<any>(response.access);
        setLS('name', token.name);
        setLS('userId', token.user_id);
        notification.success(
          toastObject(
            'success',
            'Reconnexion réussie',
            `Heureux de vous revoir ${token.name} !`
          )
        );
        navigate(`/`);
      } catch (error) {
        console.log('JWT Error:', error);
        notification.error(
          toastObject(
            'error',
            'Problème de connexion',
            `Une erreur est survenue, veuillez vous reconnecter`
          )
        );
      }
    },
    onError: (error) =>
      notification.error(
        toastObject(
          'error',
          'Problème de connexion',
          `Une erreur est survenue, veuillez vous reconnecter`
        )
      )
  });
};

// Register
const register = async (payload: ILoginRequest) => {
  const { data } = await axiosInstance.post(`/register`, payload);
  return data;
};
export const useMutationRegister = () => {
  const navigate = useNavigate();
  const { notification, message } = App.useApp();

  return useMutation(register, {
    onMutate: () => {
      message.open(
        messageObject(
          'loading',
          'Création de votre compte...',
          'useMutationRegister'
        )
      );
    },
    onSuccess: (response) => {
      message.success(
        messageObject(
          'success',
          'Compte créé, vous pouvez vous connecter.',
          'useMutationRegister'
        )
      );
      navigate('/login');
    },
    onError: (error: AxiosError) => {
      message.error(
        messageObject(
          'error',
          `Une erreur est survenue. Code : ${error.response?.status}`,
          'useMutationRegister'
        )
      );
      if (error.response?.status === 400)
        notification.error(
          toastObject(
            'error',
            'Compte existant',
            'Veuillez choisir un autre nom de compte'
          )
        );
    }
  });
};
