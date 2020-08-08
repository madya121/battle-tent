import styled from 'styled-components';
import { Centered } from '../../components/basics';
import TrainerImage from '../../assets/images/trainer/Red.png';
import { GymLocation, getLocationBackground } from '../../constants/gym';

export const LayoutContainer = styled(Centered) <{ location: GymLocation }>`
  background-color: #0c6479;
  background-image: linear-gradient(141deg,#1294a2 35%,#0a4861 75%);
  background-image: url(${props => getLocationBackground(props.location)});
  background-size: cover;
  background-position: center;
  justify-content: flex-start;
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
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  position: relative;
`;

export const BottomArea = styled.footer`
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;
  padding: 16px;
`;

export const TrainerAvatar = styled.div`
  display: inline-block;
  height: 32px;
  width: 32px;
  border-radius: 50%;
  border: 2px solid white;
  padding: 16px;
  z-index: 1;
  
  // set default image
  background-color: #bbb;
  position: relative;
  overflow: hidden;
  &::after {
    content: "";
    position: absolute;
    top: 2px;
    left: 17px;
    width: 100%;
    height: 100%;
    background-image: url(${TrainerImage});
    background-size: 36px;
    background-repeat: no-repeat;
    filter: contrast(0%) grayscale(1) brightness(0.5);
  }
`;
export const OpponentInfo = styled.div`
  display: flex;
  justify-content: flex-start;
`;
