import { themeProps } from '@emotion/react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const Container = styled.div`
  border: solid;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 5rem);
  gap: 1rem;
`;

export const Title = styled.div`
  /* border: solid red; */
  flex: 0.3;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  width: 50%;
  font-weight: 900;
  font-size: 1.5rem;
`;

export const ResultContainer = styled.div`
  /* border: solid blue; */
  flex: 3;
  width: 50%;
`;

export const ResultInnerContainer = styled.div<{ theme: themeProps }>`
  border-radius: 0.4rem;
  display: flex;
  height: 95%;
  background-color: ${(props) => props.theme.bg.light};
  box-shadow: inset 0.5px 1px 5px 0px ${(props) => props.theme.bg.shadow};
  overflow-y: scroll;
  transition: all 0.2s;
`;
