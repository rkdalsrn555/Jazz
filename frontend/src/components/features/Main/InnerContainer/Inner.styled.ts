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

export const DiamondContainer = styled.div`
  /* border: solid green; */
  border-radius: 100rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #dbe5ff;
  padding: 0.3rem 1rem 0.3rem 1rem;
  font-weight: bold;
  font-size: 1.2rem;
  gap: 2rem;
  width: fit-content;
`;

export const Title = styled.div`
  /* border: solid black; */
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: large;
  font-weight: 600;
  padding-left: 0.8rem;
  height: 3rem;
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

export const RankHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 1rem;
`;

export const RankHeader = styled.div`
  /* border: solid black; */
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: fit-content;
`;

export const RankHeaderUpper = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
`;

export const RankHeaderBottom = styled.div`
  /* border: solid green; */
  display: flex;
  flex-direction: row;
  /* justify-content: center; */
  align-items: center;
  min-width: 20rem;
  gap: 0.5rem;
  padding-left: 0.5rem;
`;

export const RankSort = styled(motion.button)`
  /* border: solid blue; */
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0 0.3rem 0 0.3rem;
  color: grey;
  &:hover {
    cursor: pointer;
    color: darkgrey;
  }
`;

export const RankTimerContainer = styled.div<{ theme: themeProps }>`
  /* border: solid red; */
  display: flex;
  flex-direction: row;
  width: 40%;
  height: 125%;
  border-radius: 0.4rem;
  position: absolute;
  /* top: 0.5rem; */
  right: 1rem;
  box-shadow: inset 0.5px 1px 5px 0px ${(props) => props.theme.bg.shadow};
  background-color: ${(props) => props.theme.bg.mid};
  transition: all 0.2s;
`;

export const TimerReturnContainer = styled.div<{ theme: themeProps }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.font.text};
`;

export const TimerTitle = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 0.8rem;
`;

export const TimerContent = styled.div`
  font-weight: 900;
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
`;

export const RankTitle = styled.div`
  /* border: solid green; */
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-weight: 600;
`;

export const RankContent = styled.div`
  /* border: solid blue; */
  display: flex;
  flex-direction: column;
  height: calc(100% - 2rem);
  overflow-y: scroll;
  box-shadow: inset 0.5px 1px 5px 0px grey;
  border-radius: 0.5rem;
  padding-top: 0.5rem;
`;

export const RankEach = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 0.5rem;
`;

export const RankEachContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;