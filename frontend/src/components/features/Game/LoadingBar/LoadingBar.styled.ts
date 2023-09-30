import styled from '@emotion/styled';
import { keyframes, css } from '@emotion/react';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;

  & p {
    color: #fff;
    font-size: 16px;
    font-weight: 500;
    margin: 0;
    margin-bottom: 8px;
  }
`;

export const barContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 8px;
  border-radius: 4px;
  background: linear-gradient(45deg, #d668cd, #cd4048);
  overflow: hidden;
`;

export const shineBar = styled.div`
  width: 120px;
  height: 4px;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    #fffdfd 50%,
    rgba(255, 253.59, 253.59, 0.83) 64%,
    rgba(255, 255, 255, 0) 100%
  );
  animation: ${(props) => css`
    ${moveShine} 1s linear infinite
  `};
`;

export const moveShine = keyframes`
 0%{
    transform: translateX(-100px);
 }
 100%{
    transform: translateX(640px);
 }
`;
