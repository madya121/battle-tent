import styled from 'styled-components';
import { Centered } from '../../components/basics';

export const LayoutContainer = styled(Centered)`
  background-image: linear-gradient(141deg,#1294a2 35%,#0a4861 75%);
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
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;
  padding: 16px;
`;

export const OpponentAvatar = styled.div`
  display: inline-block;
  height: 32px;
  width: 32px;
  border-radius: 50%;
  border: 2px solid white;
  padding: 16px;
`;
export const OpponentInfo = styled.div`
  display: flex;
  justify-content: flex-start;
`;
