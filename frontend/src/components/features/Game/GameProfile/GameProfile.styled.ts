import { keyframes, css } from '@emotion/react';
import styled from '@emotion/styled';

export const GameProfileContainerOut = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  width: 431px;
  height: 741px;
  background: rgba(0, 0, 0);
  color: #fff;
  font-size: 32px;
  font-weight: bold;
  line-height: 230px;
  text-align: center;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: -3px;
    left: -3px;
    width: calc(100% + 6px);
    height: calc(100% + 6px);
    background: linear-gradient(
      45deg,
      red,
      yellow,
      green,
      blue,
      yellow,
      purple
    );
    z-index: -1;
    background-size: 400%;
    animation: ${(props) => css`
      ${borderBg} 40s linear infinite
    `};
  }

  &:after {
    filter: blur(20px);
  }

  & h2 {
    line-height: 40px;
    margin: 0;
    font-size: 32px;
  }

  & h3 {
    line-height: 40px;
    margin: 0;
    font-size: 32px;
  }
`;

export const borderBg = keyframes`
 0%{
    background-position: 0 0;
 }
 50%{
    background-position: 400% 0;
 }
 100%{
    background-position: 0 0;
 }
`;

export const HeartGuageContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;
