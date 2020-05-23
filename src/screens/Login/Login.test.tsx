import React from 'react';
import { render } from '@testing-library/react';
import Login from './Login';
import { BrowserRouter } from 'react-router-dom';

describe('Login screen', () => {
  it('should render', () => {
    const { asFragment } = render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
