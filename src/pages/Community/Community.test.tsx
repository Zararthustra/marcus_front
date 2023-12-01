import { HttpResponse, http } from 'msw';
import { expect, test, describe } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import Community from './Community';
import { endpoint } from '@mocks/api';
import { server } from '../../setupTest';

describe('Page Community', () => {
  test('Success: Is present in DOM', async () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Community />
        </BrowserRouter>
      </QueryClientProvider>
    );
    const element = await screen.findByTestId('community');
    expect(element).toBeInTheDocument();
  });

  test('Error: Is not present in DOM', async () => {
    // Override endpoint to throw error
    server.use(
      http.get(endpoint('/users'), () => {
        return HttpResponse.error();
      })
    );
    // Remove error logs
    const queryClient = new QueryClient({
      logger: {
        log: (...args) => null,
        warn: (...args) => null,
        error: (...args) => null
      }
    });
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Community />
        </BrowserRouter>
      </QueryClientProvider>
    );

    const element = screen.queryByTestId('community');
    expect(element).toBeNull();
    const noData = await screen.findByTestId('no-data');
    expect(noData).toBeInTheDocument();
  });
});
