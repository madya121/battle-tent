import React from 'react';
import { render } from '@testing-library/react';
import Lobby from './Lobby';

describe('Lobby screen', () => {
  it('should render', () => {
    const { asFragment } = render(<Lobby />);
    expect(asFragment()).toMatchSnapshot();
  });
});
