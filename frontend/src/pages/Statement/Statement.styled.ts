import { themeProps } from '@emotion/react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const Container = styled.div`
  border: solid green;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  min-height: calc(100vh - 5rem);
  position: relative;
`;

export const LeftContainer = styled.div`
  /* border: solid red; */
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 10rem 4rem 0 4rem;
  height: fit-content;
  max-width: 60rem;
`;

export const PageName = styled.div`
  /* border: solid; */
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 15rem;
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 2rem;
  position: absolute;
  top: 2rem;
  left: 4.2rem;
`;

export const CompanyName = styled.div`
  /* border: solid; */
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 15rem;
  font-size: 1.7rem;
  font-weight: 600;
  margin-bottom: 2rem;
  position: absolute;
  top: 5rem;
  left: 4.2rem;
`;

export const StatementTypeContainer = styled.div`
  /* border: solid green; */
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  /* margin-top: 3rem; */
`;

export const RightContainer = styled.div`
  border: solid blue;
  flex: 8;
  display: flex;
  flex-direction: row;
  min-width: 50rem;
`;

export const ReturnContainer = styled.div`
  border: solid red;
  display: flex;
  width: 100%;
`;


