import { themeProps } from '@emotion/react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const Container = styled.div`
  /* border: solid green; */
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  min-height: calc(100vh - 5rem);
  height: 100%;
  position: relative;
  width: 100%;
  min-width: fit-content;
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

export const PageName = styled.div<{ theme: themeProps }>`
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
  color: ${(props) => props.theme.font.deep};
  transition: all 0.2s;
`;

export const CompanyName = styled.div<{ theme: themeProps }>`
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
  color: ${(props) => props.theme.font.deep};
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
  /* border: solid blue; */
  flex: 8;
  display: flex;
  flex-direction: row;
  min-height: 100%;
  max-width: 73rem !important;
  padding: 2rem;
`;

export const ReturnContainer = styled.div`
  /* border: solid white; */
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-items: center;
  width: 100%;
  gap: 1rem;
`;

export const RightTitleContainer = styled.div`
  /* border: solid red; */
  flex: 1.1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

export const RightTitle = styled.div<{ theme: themeProps }>`
  font-weight: 900;
  font-size: 1.7rem;
  color: ${(props) => props.theme.font.deep};
`;

export const RightSubTitle = styled.div<{ theme: themeProps }>`
  color: ${(props) => props.theme.font.deep};
  font-weight: 600;
  font-size: 1.3rem;
`;

export const RightInnerContainer = styled.div<{ theme: themeProps }>`
  /* border: solid blue; */
  flex: 8;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 1rem;
  height: fit-content;
  max-height: 30rem;
  overflow-y: scroll;
  box-shadow: inset 0.5px 1px 5px 0px ${(props) => props.theme.bg.shadow};
  border-radius: 0.4rem;
  padding: 1rem;
`;

export const EachBlock = styled.div<{ theme: themeProps }>`
  /* border: solid 1px white; */
  display: flex;
  flex-direction: column;
  width: 30%;
  min-width: 20rem;
  height: 7rem;
  color: ${(props) => props.theme.font.deep};
  background-color: ${(props) => props.theme.bg.light};
  box-shadow: 0.5px 1px 5px 0px ${(props) => props.theme.bg.shadow};
  padding: 1.3rem;
  border-radius: 0.4rem;
  transition: all 0.2s;
`;

export const BlockTitle = styled.div`
  /* border: solid yellow; */
  font-weight: 900;
  font-size: 1.2rem;
  white-space: normal;
  word-break: normal;
`;

export const BlockValue = styled.div`
  /* border: solid green; */
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  font-size: 1.3rem;
`;

export const NoStatement = styled.div<{ theme: themeProps }>`
  /* border: solid red; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  color: ${(props) => props.theme.font.deep};
  gap: 1rem;
  min-width: fit-content;
`;

export const NoStatementTitle = styled.div`
  font-weight: 900;
  font-size: 3rem;
`;

export const NoStatementContent = styled.div`
  /* border: solid blue; */
  font-size: 1.5rem;
  width: 34rem;
`;
