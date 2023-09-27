import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const OuterContainer = styled.div`
  /* border: solid blue; */
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  /* padding: 1rem; */
  padding-bottom: 0rem;
  gap: 1rem;
  width: 70%;
  margin-top: 0.5rem;
`;

export const Block = styled.div`
  /* border: solid red; */
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 40%;
  border-radius: 0.3rem;
  border: solid 1px rgba(255, 255, 255, 0.4);
  background-color: rgba(255, 255, 255, 0.5);
`;

export const BlockTitle = styled.div`
  color: #6a6a6a;
  font-weight: bold;
`;

export const BlockContent = styled.div`
  font-weight: 900;
  font-size: 1.4rem;
`;
