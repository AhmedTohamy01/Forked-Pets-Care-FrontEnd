import React from 'react';
import axios from 'axios';
import {
  render, fireEvent, cleanup, waitForElement,
} from './test-utils';
import '@testing-library/jest-dom';
import App from '../containers/App';

afterEach(cleanup);

describe('App', () => {
  axios.get.mockResolvedValueOnce({
    data: {
      logged_in: 'LOGGED_IN',
      user: {
        name: 'Jhon',
        role: 'admin',
      },
    },
  });

  test('user is logged and dashboard shows add services', async () => {
    const { container, getByTestId } = render(<App />);

    const dashboard = await waitForElement(() => getByTestId('HidenDash'));

    expect(dashboard.innerHTML).toMatch('Dashboard');
    fireEvent.click(dashboard);
    fireEvent.click(getByTestId('ServiceAdd'));
    expect(container.innerHTML).toMatch('New Services');
  });
});
