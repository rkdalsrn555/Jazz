import { themeProps } from '@emotion/react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const Container = styled.div`
  /* border: solid green; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 10rem);
`;

export const Title = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-weight: 900;
  font-size: 1.5rem;
`;

export const Img = styled.img`
  /* border: solid red; */
  width: 70%;
  margin-bottom: 2rem;
`;

export const SearchInput = styled.div<{ theme: themeProps }>`
  /* border: solid green; */
  display: flex;
  flex-direction: row;
  width: 50%;
`;
