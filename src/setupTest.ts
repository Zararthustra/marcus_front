import { setupServer } from 'msw/node';
import { beforeAll, afterAll, afterEach, vi } from 'vitest';

import { handlers } from '@mocks/api';

// Mock server to catch API requests
const server = setupServer(...handlers);
beforeAll(() => {
  // Mock local storage as a global variable to fit in tests scope
  const localStorageMock: Storage = (function () {
    let store: any = {};

    return {
      getItem(key: string): string {
        return store[key];
      },

      setItem(key: string, value: string) {
        store[key] = value;
      },

      clear() {
        store = {};
      },

      removeItem(key: string) {
        delete store[key];
      },

      getAll() {
        return store;
      },
      length: 0,
      key(index: number): string | null {
        return null;
      }
    };
  })();
  global.localStorage = localStorageMock;

  server.listen({ onUnhandledRequest: 'error' });
});
//  Close server after all tests
afterAll(() => server.close());
// Reset handlers after each test
afterEach(() => server.resetHandlers());
