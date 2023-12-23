import { setupServer } from 'msw/node';
import { cleanup } from '@testing-library/react';
import { beforeAll, afterAll, afterEach, expect, vi } from 'vitest';

// Extend "expect" method with @testing-library/jest-dom methods like "toBeInTheDocument()"
import * as matchers from '@testing-library/jest-dom/matchers';
import '@testing-library/jest-dom';
expect.extend(matchers);

import { handlers } from '@mocks/api';

// Mock server to catch API requests
export const server = setupServer(...handlers);
beforeAll(() => {
  // Mock jwt-decode library
  vi.mock('jwt-decode', () => {
    return {
      default: vi.fn(() => ({ exp: 123 }))
    };
  });
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
afterEach(() => {
  cleanup();
  server.resetHandlers();
});
