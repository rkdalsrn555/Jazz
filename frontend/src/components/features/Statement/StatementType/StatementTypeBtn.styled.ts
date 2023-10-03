import { themeProps } from '@emotion/react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const Container = styled.div<{ theme: themeProps }>`
  /* border: solid red; */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 12rem;
  height: 3rem;
  border-radius: 0.5rem;
  box-shadow: 0.5px 1px 5px 1px ${(props) => props.theme.bg.shadow};
  background-color: ${(props) => props.theme.bg.light};
  font-weight: 600;

  &:hover {
    cursor: pointer;
  }
`;

export const Title = styled.div``;