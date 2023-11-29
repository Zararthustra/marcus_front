import { HttpResponse, http } from 'msw';

import { baseURL } from '@queries/axios';
import { communityMock } from '@mocks/community';

const endpoint = (endpoint: string): string => baseURL + endpoint;

export const handlers = [
  http.get(endpoint('/users'), () => {
    return HttpResponse.json(communityMock);
  })
];
