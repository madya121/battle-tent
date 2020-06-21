import React from 'react';
import { render } from '@testing-library/react';
import Room from './Room';

describe('Room screen', () => {
  it('should render', () => {
    const { asFragment } = render(<Room />);
    expect(asFragment()).toMatchSnapshot();
  });
});
