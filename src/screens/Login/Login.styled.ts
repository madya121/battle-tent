import styled from 'styled-components';
import { Centered } from '../../components/basics';
import BackgroundBlur from '../../assets/images/title-background-blur.jpg';

export const LayoutContainer = styled(Centered)`
  background-image: url(${BackgroundBlur});
  height: 100vh;
`;

export const LogoHeader = styled.header`
  flex: 1;
  display: flex;
  align-items: flex-end;
`;
