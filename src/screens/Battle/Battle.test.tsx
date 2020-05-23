import React from 'react';
import { render } from '@testing-library/react';
import Battle from './Battle';

describe('Battle screen', () => {
  it('should render', () => {
    const { asFragment } = render(<Battle />);
    expect(asFragment()).toMatchSnapshot();
  });
});
