import { BrowserRouter } from 'react-router-dom';
import { expect, test, describe, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import NotFound from './NotFound';

describe('Page NotFound', () => {
  test('Is present in DOM', async () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );
    const element = await screen.findByTestId('notfound');
    expect(element).toBeInTheDocument();
  });
});
