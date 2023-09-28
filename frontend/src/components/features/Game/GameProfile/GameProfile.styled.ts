import { keyframes, css } from '@emotion/react';
import styled from '@emotion/styled';

export const GameProfileContainerOut = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  height: 400px;
  border-radius: 16px;
  background: rgba(0, 0, 0);
  color: #fff;
  font-size: 32px;
  font-weight: bold;
  line-height: 230px;
  text-align: center;
  padding: 10px;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: -3px;
    left: -3px;
    width: calc(100% + 6px);
    height: calc(100% + 6px);
    border-radius: 16px;
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
    line-height: 35px;
    margin: 0;
    font-size: 24px;
  }

  & h3 {
    line-height: 35px;
    margin: 0;
    font-size: 24px;
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

export const UserCharactorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const UserContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const HeartGuageContainer = styled.div`
  height: 40%;
  margin-top: -15%;
`;
