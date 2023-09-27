import styled from '@emotion/styled';
import { themeProps } from '@emotion/react';
import { motion } from 'framer-motion';

export const Container = styled(motion.div)`
  /* border: solid green; */
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap-reverse;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 5rem);
  /* padding: 2rem; */
  /* min-width: 75rem; */
  /* min-height: 30rem; */
`;

export const InnerContainer = styled.div`
  border: solid 5px;
`;

export const LeftContainer = styled.div`
  /* border: solid red; */
  flex: 1.7;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 60%;
  height: calc(100vh - 7rem);
  min-height: 32rem;
  min-width: 43rem;
  gap: 1rem;
  padding: 1rem 0 1rem 0;
`;

export const EtcContainer = styled.div`
  /* border: solid black; */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 95%;
  height: 20%;
  min-width: 42rem;
`;

export const Line = styled.div`
  display: block;
  width: 100%;
  height: 0.2px;
  background-color: grey;
  margin-top: 0.3rem;
`;

export const ButtonGroup = styled.div`
  /* border: solid green; */
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

export const ButtonImg = styled.img`
  width: 4.5rem;
  height: 4.5rem;
`;

export const BattleImg = styled.img`
  width: 6rem;
  height: 6rem;
`;

export const ShopImg = styled.img`
  width: 4rem;
  height: 4rem;
`;
export const RightContainer = styled.div`
  /* border: solid blue; */
  flex: 1.3;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 40%;
  height: calc(100vh - 7rem);
  min-width: 35rem;
  min-height: 32rem;
  gap: 1rem;
  padding: 1rem 0 1rem 0;
`;

export const ProfileContainer = styled.div`
  /* border: solid green; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const ProfileContent = styled.div`
  /* border: solid white; */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const ProfileLeft = styled.div`
  /* border: solid black; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90%;
  width: 45%;
  min-width: fit-content;
`;

export const ProfileLeftPrefix = styled.div<{ theme: themeProps }>`
  font-weight: 600;
  margin-top: 0.5rem;
  color: ${(props) => props.theme.font.deep};
`;

export const ProfileLeftTitle = styled.div<{ theme: themeProps }>`
  font-size: 1.3rem;
  font-weight: 900;
  margin-bottom: 0.5rem;
  color: ${(props) => props.theme.font.deep};
`;

export const Box = styled.div`
  /* border: solid red; */
  position: relative;
  width: 45%;
  max-width: 7rem;
  /* background-color: skyblue; */
  &::after {
    display: block;
    content: '';
    padding-bottom: 100%;
  }
`;
export const ProfileLeftImg = styled.img`
  border: solid green;
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const ProfileRight = styled.div`
  /* border: solid yellow; */
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 100%;
  width: 30%;
`;

export const PieConatiner = styled.div`
  /* border: solid red; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30%;
  height: 100%;
  position: relative;
`;

export const Pie = styled.svg`
  /* border: solid black; */
  display: flex;
  width: fit-content;
  height: 10rem;
  /* padding: 1rem; */
`;

export const PieTitle = styled.text<{ theme: themeProps }>`
  /* border: solid green; */
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  color: ${(props) => props.theme.font.deep};
  font-size: 1rem;
  font-weight: bold;
  top: 46%;
`;

export const PieNumber = styled.text``;

//////////////////////////// 아래는 랭크 관련
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