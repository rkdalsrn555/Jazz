import styled from '@emotion/styled';
import { themeProps } from '@emotion/react';
import { motion } from 'framer-motion';

export const Container = styled.div`
  /* border: solid red; */
  flex: 1;
  display: flex;
`;

export const TimerReturnContainer = styled.div<{ theme: themeProps }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.font.text};
`;

export const TimerTitle = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 0.8rem;
`;

export const TimerContent = styled.div`
  font-weight: 900;
`;
