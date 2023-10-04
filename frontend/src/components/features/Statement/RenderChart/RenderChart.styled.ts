import { themeProps } from '@emotion/react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const Container = styled.div`
  /* border: solid red; */
  display: flex;
  width: 100%;
`;

export const ChartContainer = styled.div`
  /* border: solid white; */
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  overflow: hidden;
`;

export const ChartSelectBottonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  gap: 2rem;
`;

export const ChartSelectBtn = styled.button<{ theme: themeProps }>`
  /* border: solid white; */
  border-radius: 0.4rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  min-width: 12rem !important;
  height: 3rem;
  box-shadow: 0.5px 1px 5px 0px ${(props) => props.theme.bg.shadow};
  color: ${(props) => props.theme.font.deep};
  background-color: ${(props) => props.theme.bg.deep};
  font-weight: 600;
  font-size: 0.9rem;
  &:hover {
    cursor: pointer;
    filter: brightness(80%);
  }
`;
