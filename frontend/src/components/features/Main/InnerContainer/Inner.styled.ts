import { themeProps } from '@emotion/react';
import styled from '@emotion/styled';
import { innerContainerProps } from 'types/types';
import { motion } from 'framer-motion';

export const Container = styled.div<{
  feature: innerContainerProps;
  theme: themeProps;
}>`
  /* border: solid red; */
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  border-radius: 0.3rem;
  width: ${(props) => props.feature.width};
  height: ${(props) => props.feature.height};
  min-width: ${(props) => props.feature.minWidth};
  min-height: ${(props) => props.feature.minHeight};
  background-color: ${(props) => props.feature.backgroundColor};
  transition: all 0.2s;
  box-shadow: 0.5px 1px 5px 0px ${(props) => props.theme.bg.shadow};
  padding: 0.7rem 1rem 0.7rem 1rem;
`;

export const ProfileHeaderContainer = styled.div`
  /* border: solid green; */
  display: flex;
  flex-direction: column;
`;

export const ProfileHeader = styled.div`
  /* border: solid blue; */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Line = styled.div`
  display: block;
  width: 100%;
  height: 0.2px;
  background-color: grey;
  /* margin-top: 0.8rem; */
`;

export const ProfileHeaderRight = styled.div`
  /* border: solid red; */
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  width: fit-content;
`;

export const DiamondContainer = styled.div<{ theme: themeProps }>`
  /* border: solid green; */
  border-radius: 100rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: ${(props) => props.theme.font.deep};
  background-color: ${(props) => props.theme.bg.mid};
  padding: 0.3rem 1rem 0.3rem 1rem;
  font-weight: bold;
  font-size: 1.2rem;
  gap: 1rem;
  width: fit-content;
  transition: all 0.2s;
  /* box-shadow: inset 0.5px 1px 5px 0px ${(props) =>
    props.theme.bg.shadow} !important; */
  box-shadow: inset 0.5px 1px 5px 0px ${(props) => props.theme.bg.shadow};
`;

export const Title = styled.div<{ theme: themeProps }>`
  /* border: solid black; */
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: large;
  font-weight: 600;
  padding-left: 0.8rem;
  height: 3rem;
  color: ${(props) => props.theme.font.deep};
`;

export const ContentContainer = styled.div`
  /* border: solid purple; */
  flex-direction: column;
  justify-content: space-around;
  display: flex;
  height: 80%;
`;

export const Img = styled.img`
  width: 1.5rem;
  height: 1.5rem;
`;

export const Blank = styled.div`
  /* border: solid green; */
  width: 20%;
`;
