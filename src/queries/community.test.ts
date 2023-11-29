import { expect, test, describe, assertType } from 'vitest';

import { getUsers } from '@queries/community';
import { communityMock } from '@mocks/community';
import { ICommunity } from '@interfaces/community.interface';

describe('Community', () => {
  test('GET Users \t schema', async () => {
    const users = await getUsers();
    expect(users).toStrictEqual(communityMock);
  });
  test('GET Users \t type', async () => {
    const users = await getUsers();
    assertType<ICommunity[]>(users);
  });
});
