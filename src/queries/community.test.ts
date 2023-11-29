import { expect, test, describe, assertType } from 'vitest';

import { communityMock } from '@mocks/index';
import { getUsers } from '@queries/community';
import { ICommunity } from '@interfaces/index';

describe('Community', () => {
  test('GET Users', async () => {
    const users = await getUsers();
    expect(users).toStrictEqual(communityMock);
    assertType<ICommunity[]>(users);
  });
});
