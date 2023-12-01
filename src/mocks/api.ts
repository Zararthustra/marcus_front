import { HttpResponse, http } from 'msw';

import { baseURL } from '@queries/axios';
import { communityMock, userMock, loginResponseMock } from '@mocks/index';

export const endpoint = (endpoint: string): string => baseURL + endpoint;

export const handlers = [
  // ============================================ Community
  http.get(endpoint('/users'), () => {
    return HttpResponse.json(communityMock);
  }),
  // ============================================ User
  http.get(endpoint('/users/:userId'), () => {
    return HttpResponse.json(userMock);
  }),
  http.post(endpoint('/token/'), () => {
    return HttpResponse.json(loginResponseMock);
  }),
  http.post(endpoint('/token/refresh/'), () => {
    return HttpResponse.json(loginResponseMock);
  }),
  http.post(endpoint('/register'), () => {
    return HttpResponse.json({
      message: 'User created successfully'
    });
  })
];
