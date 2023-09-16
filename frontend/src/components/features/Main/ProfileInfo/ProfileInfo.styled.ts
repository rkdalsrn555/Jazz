import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const OuterContainer = styled.div`
  /* border: solid blue; */
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  gap: 1rem;
`;

export const Block = styled.div`
  border: solid red;
  display: flex;
  flex-direction: column;
  width: 45%;
  height: 45%;
`;

export const BlockTitle = styled.div``;

export const BlockContent = styled.div``;
