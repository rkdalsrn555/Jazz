import { color } from 'framer-motion';
import styled from '@emotion/styled';

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 450px;
  background: transparent;
  z-index: 99;
`;

export const UserCharactorContainer = styled.div<{ bgColor: string }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 300px;

  & img {
    z-index: 99;
  }

  & .linearGradient {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background: ${(props) => `radial-gradient(
      90.44% 90.27% at 49.89% 50.86%,
      ${props.bgColor} 0%,
      ${props.bgColor} 3%,
      rgba(140, 200, 220, 0) 55%,
      rgba(140, 200, 220, 0) 100%
    );`};
  }
`;

export const UserContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  padding-top: 20px;
  font-size: 24px;

  & h2,
  h3 {
    margin: 0;
  }
`;