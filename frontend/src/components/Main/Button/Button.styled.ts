import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { btnProps } from "types/types";
import { motion } from "framer-motion";

export const BtnBox = styled(motion.div)<{ prop: btnProps }>`
  /* border: solid red; */
  display: flex;
  flex-direction: row;
  background-color: ${(props) => props.prop.color};
  width: ${(props) => props.prop.width};
  height: 5rem;
  /* margin: 0.5rem 0.5rem 0 0; */
  border-radius: 0.3rem;
  transition: all 0.2s;
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

export const Title = styled.div`
  font-size: 0.9rem;
  font-weight: 600;
`;

export const Content = styled.div`
  font-size: 0.8rem;
`;
