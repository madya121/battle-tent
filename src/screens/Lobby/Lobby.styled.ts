import styled from 'styled-components';
import { Centered } from '../../components/basics';
import Background from '../../assets/images/ui/lobby-background.jpg';

export const LayoutContainer = styled(Centered)`
  background-image: linear-gradient(141deg,#ffab63 0%,#46bdca 51%,#4eb2d4 75%);
  background-image: url(${Background});
  height: 100vh;
  color: white;
`;
