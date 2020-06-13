import styled from 'styled-components';
import { Centered } from '../../components/basics';
import BackgroundImage from '../../assets/images/title-background.jpg';

export const LayoutContainer = styled(Centered)`
  background-image: url(${BackgroundImage});
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const LogoHeader = styled.header`
  flex: 1;
  display: flex;
  align-items: flex-end;
`;
