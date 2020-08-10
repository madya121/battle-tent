import styled from 'styled-components';
import { Centered } from '../../components/basics';
import { GymLocation, getLocationBackground } from '../../constants/location';

export const LayoutContainer = styled(Centered) <{ location: GymLocation }>`
  background-color: #0c6479;
  background-image: linear-gradient(141deg,#1294a2 35%,#0a4861 75%);
  background-image: url(${props => getLocationBackground(props.location)});
  background-size: cover;
  background-position: center;
  height: 100vh;
  color: white;
`;

export const TopArea = styled.header`
  display: flex;
  justify-self: flex-start;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;
  padding: 16px;
`;

export const MainArea = styled.main`
  position: relative;
  height: 100%;
  width: 100%;
`;

export const BottomArea = styled.footer`
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;
  padding: 16px;
`;

export const OpponentInfo = styled.div`
  display: flex;
  justify-content: flex-start;
`;
