import { expect, test, describe, assertType } from 'vitest';

import { getUser } from '@queries/user';
import { login, reconnect, register } from '@queries/login';
import { ICommunity, ILoginResponse } from '@interfaces/index';
import { userMock, loginRequestMock, loginResponseMock } from '@mocks/index';

describe('User', () => {
  test('GET User', async () => {
    const user = await getUser(1);
    expect(user).toStrictEqual(userMock);
    assertType<ICommunity>(user);
  });
  test('POST Register \t', async () => {
    const registerResponse = await register(loginRequestMock);
    expect(registerResponse).toStrictEqual({
      message: 'User created successfully'
    });
    assertType<{ message: string }>(registerResponse);
  });
  test('POST Login \t token', async () => {
    const loginResponse = await login(loginRequestMock);
    expect(loginResponse).toStrictEqual(loginResponseMock);
    assertType<ILoginResponse>(loginResponse);
  });
  test('POST Reconnect \t refresh token', async () => {
    const reconnectResponse = await reconnect(loginResponseMock.refresh);
    expect(reconnectResponse).toStrictEqual(loginResponseMock);
    assertType<ILoginResponse>(reconnectResponse);
  });
});
