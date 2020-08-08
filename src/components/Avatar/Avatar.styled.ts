import styled from 'styled-components';

export const SmallAvatarContainer = styled.div`
  display: inline-block;
  height: 64px;
  width: 64px;
  border-radius: 50%;
  border: 2px solid white;
  z-index: 1;
  overflow: hidden;
  position: relative;
  background-color: #bbb;
`;

export const Avatar = styled.div<{ src: string; silhouette?: boolean; }>`
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.src});
  background-repeat: no-repeat;
  background-size: cover;
  ${props => props.silhouette &&
    'filter: contrast(0%) grayscale(1) brightness(0.5);'
  }
`;
