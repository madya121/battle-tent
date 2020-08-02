import styled from 'styled-components';
import { Centered } from '../../components/basics';
import BackgroundImage from '../../assets/images/ui/title-background.jpg';

export const LayoutContainer = styled(Centered)`
  background: url(${BackgroundImage}) no-repeat fixed center;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const LogoHeader = styled.header`
  flex: 1;
  display: flex;
  align-items: flex-end;
`;
