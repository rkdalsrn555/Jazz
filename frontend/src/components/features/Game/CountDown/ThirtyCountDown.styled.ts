import { color } from 'framer-motion';
import styled from '@emotion/styled';

export const Container = styled.div`
  position: relative;
  width: 300px;
  height: 150px;
`;

export const ThirtyCountDownContainer = styled.div`
  position: absolute;
  top: 20px;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 229px;
  height: 107px;
  background: linear-gradient(144deg, #28272f 0%, #040404 100%);
  border-radius: 40px;
  text-align: center;

  & p {
    position: absolute;
    left: 0;
    right: 0;
    margin: 0;
    width: 229px;
    height: 107px;
    font-size: 70px;
    font-weight: 700;
    background: linear-gradient(
      245deg,
      #fff,
      #71757e 40%,
      #fff 50%,
      #71757e 90%
    );
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
  }
`;

export const ShineContainer = styled.div`
  position: absolute;
  top: 0;
  position: relative;
  width: 300px;
  height: 150px;
`;

export const BlurShine = styled.div<{
  color: string;
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
  blur?: number;
}>`
  position: absolute;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  bottom: ${(props) => props.bottom};
  width: 200px;
  height: 100px;
  background: ${(props) => `radial-gradient(
      90.44% 90.27% at 49.89% 50.86%,
      ${props.color} 0%,
      ${props.color} 3%,
      rgba(140, 200, 220, 0) 55%,
      rgba(140, 200, 220, 0) 100%
    );`};
  filter: ${(props) => `blur(${props.blur ? props.blur + 'px' : '30px'});`};
`;
