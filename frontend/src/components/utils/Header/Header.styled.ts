import styled from '@emotion/styled';
import { themeProps } from '@emotion/react';

export const Container = styled.div<{ theme: themeProps }>`
  /* border: solid blue; */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: relative;
  height: 5rem;
  min-height: 3rem;
  box-shadow: 0px 0px 5px 0.1px ${(props) => props.theme.bg.shadow};
`;

export const Blank = styled.div`
  /* border: solid green; */
  width: 20%;
`;

export const Logo = styled.img`
  /* border: solid green; */
  height: 3rem;
`;

export const LogoutBtn = styled.div`
  cursor: pointer;
`;
