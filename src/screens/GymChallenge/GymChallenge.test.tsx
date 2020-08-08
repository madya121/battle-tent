import React from 'react';
import { render } from '@testing-library/react';
import GymChallenge from './GymChallenge';

describe('GymChallenge screen', () => {
  it('should render', () => {
    const { asFragment } = render(
      <GymChallenge />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
