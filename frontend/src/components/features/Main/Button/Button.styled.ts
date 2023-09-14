import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { btnProps } from 'types/types';
import { motion } from 'framer-motion';

export const BtnBox = styled(motion.div)<{ prop: btnProps }>`
  /* border: solid red; */
  display: flex;
  flex-direction: row;
  background-color: ${(props) => props.prop.color};
  width: ${(props) => props.prop.width};
  height: 5rem;
  /* margin: 0.5rem 0.5rem 0 0; */
  border-radius: 0.3rem;
  transition: all 0.1ms;
  position: relative;

  &:hover {
    filter: brightness(95%);
  }
`;

export const BigBtnBox = styled(motion.div)<{ prop: btnProps }>`
  /* border: solid red; */
  display: flex;
  background-color: ${(props) => props.prop.color};
  width: ${(props) => props.prop.width};
  min-height: 6rem;
  border-radius: 0.3rem;
  transition: all 0.1ms;
  position: relative;

  &:hover {
    filter: brightness(95%);
  }
`;

export const InnerBox = styled.div`
  /* border: solid 2px; */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const Text = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
`;

export const BattleText = styled.div`
  /* border: solid green; */
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
`;

export const Title = styled.div`
  font-size: 0.9rem;
  font-weight: 600;
`;

export const Content = styled.div`
  font-size: 0.8rem;
`;

export const BattleTitle = styled.div`
  /* border: solid yellow; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: gold;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  width: 100%;
  /* position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%); */
`;

export const BattleContent = styled.div`
  /* border: solid white; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  width: 100%;
`;

export const ShopTitle = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  position: absolute;
  top: 30%;
  left: 20%;
  transform: translate(-50%, -50%);
`;

export const BattleImg = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.4;
`;
export const ShopImg = styled.div`
  position: absolute;
  top: 60%;
  left: 70%;
  transform: translate(-50%, -50%);
`;

export const AnimDiv = styled.div`
  /* border: solid yellow; */
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 0.3rem;
  width: 100%;
  height: 100%;
  position: absolute;
  overflow-x: hidden;
  overflow-y: hidden;
  z-index: 9999;
  &:hover {
    box-shadow: 0px 0px 5px 2px inset white;
    cursor: pointer;
  }
`;

export const GlowDiv1 = styled.div`
  position: absolute;
  background-color: white;
  transform: rotate(40deg);
  box-shadow: 0px 0px 20px 20px white;
  width: 3%;
  height: 200%;
  -webkit-animation: progressAnim 2s infinite;
  animation-timing-function: linear;
  @-webkit-keyframes progressAnim {
    0% {
      left: -100%;
    }
    100% {
      left: 400%;
    }
  }
`;
export const GlowDiv2 = styled.div`
  position: absolute;
  background-color: white;
  transform: rotate(40deg);
  box-shadow: 0px 0px 20px 20px white;
  width: 3%;
  height: 200%;
  -webkit-animation: progressAnim 1s infinite;
  animation-timing-function: linear;
  @-webkit-keyframes progressAnim {
    0% {
      left: -100%;
    }
    100% {
      left: 400%;
    }
  }
`;
