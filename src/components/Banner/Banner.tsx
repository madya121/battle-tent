import styled from 'styled-components';
import BannerBase from '../../assets/images/ui/banner_base.png';

export default styled.div`
  font-family: HeadTextFont;
  color: white;
  font-size: 40px;
  background-image: url(${BannerBase});
  background-size: contain;
  padding: 12px 24px;
  min-width: 200px;
  max-width: 230px;
  background-position: center 4px;
`;
