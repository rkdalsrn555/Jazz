import styled from '@emotion/styled';
import { themeProps } from '@emotion/react';
import { motion } from 'framer-motion';

export const Container = styled.div``;

export const RankContent = styled.div<{ theme: themeProps }>`
  /* border: solid blue; */
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: scroll;
  box-shadow: inset 0.5px 1px 5px 0px ${(props) => props.theme.bg.shadow};
  color: ${(props) => props.theme.font.deep};
  border-radius: 0.5rem;
  padding-top: 0.5rem;
`;

export const RankEach = styled.div<{ theme: themeProps }>`
  display: flex;
  flex-direction: row;
  margin-bottom: 0.5rem;
  color: ${(props) => props.theme.font.deep};
`;

export const RankEachContent = styled.div<{ theme: themeProps }>`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.font.deep};
`;

export const RankOuterContainer = styled.div<{ theme: themeProps }>`
  /* border: solid yellow; */
  height: calc(100% - 5rem);
`;

export const RankContainerHeader = styled.div`
  /* border: solid red; */
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 0.5rem;
`;

export const RankTitle = styled.div<{ theme: themeProps }>`
  /* border: solid green; */
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-weight: 600;
  color: ${(props) => props.theme.font.deep};
`;

export const RankContainerContent = styled.div<{ theme: themeProps }>`
  /* border: solid red; */
  display: flex;
  flex-direction: column;
  height: calc(100% - 2rem);
  overflow-y: scroll;
  box-shadow: inset 0.5px 1px 5px 0px ${(props) => props.theme.bg.shadow};
  color: ${(props) => props.theme.font.deep} !important;
  border-radius: 0.5rem;
  padding-top: 0.5rem;
`;
