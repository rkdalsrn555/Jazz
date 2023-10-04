import { themeProps } from '@emotion/react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const Container = styled.div<{ theme: themeProps }>`
  border: solid 4px white;
  display: flex;
  height: 40rem;
  width: 100%;
`;
