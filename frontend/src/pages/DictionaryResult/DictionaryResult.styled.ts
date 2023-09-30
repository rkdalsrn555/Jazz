import { themeProps } from '@emotion/react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const Container = styled.div`
  /* border: solid; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 5rem);
  gap: 1rem;
`;

export const Title = styled.div<{ theme: themeProps }>`
  /* border: solid red; */
  flex: 0.3;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  width: 80%;
  font-weight: 900;
  font-size: 1.5rem;
  color: ${(props) => props.theme.font.deep};
`;

export const SearchInput = styled.div<{ theme: themeProps }>`
  /* border: solid green; */
  display: flex;
  flex-direction: row;
  width: 80%;
`;

export const ResultContainer = styled.div`
  /* border: solid blue; */
  flex: 3;
  width: 80%;
`;

export const ResultInnerContainer = styled.div<{ theme: themeProps }>`
  /* border: solid red; */
  border-radius: 0.4rem;
  display: flex;
  height: 95%;
  background-color: ${(props) => props.theme.bg.light};
  box-shadow: inset 0.5px 1px 5px 0px ${(props) => props.theme.bg.shadow};
  /* overflow-y: scroll; */
  transition: all 0.2s;
  color: ${(props) => props.theme.font.deep};
`;

export const ReturnContainer = styled.div`
  /* border: solid blue; */
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: calc(100vh - 15rem);
  height: 100%;
  overflow-y: scroll;
  gap: 1rem;
  padding: 1rem 0.5rem 1rem 1rem;
`;

export const InnerReturnContainer = styled.div<{ theme: themeProps }>`
  /* border: solid green; */
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 0.4rem;
  box-shadow: 0.5px 1px 5px 0px ${(props) => props.theme.bg.shadow};
  gap: 1rem;
  padding: 1rem;
`;

export const Word = styled.div``;

export const Definition = styled.div``;
