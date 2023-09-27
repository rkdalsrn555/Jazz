import { motion, AnimatePresence } from 'framer-motion';
import styled from '@emotion/styled';

export const AccordionButtonContainer = styled.button`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  background: white;
  text-align: left;
`;

export const SubWrap = styled.div`
  position: relative;
  font-size: 15px;
  width: 100%;
  margin: 0;
  display: flex;
  flex-direction: column;
  background-color: #f4f2ff;

  div {
    text-align: left;
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const QuestionStyle = styled.div`
  padding-left: 5%;
  position: absolute;
  top: 15%;
  display: flex;
  align-items: center;
  gap: 10%;

  & h1 {
    font-weight: 800;
  }

  & p {
    width: 80%;
    line-height: 20px;
    color: #212121;
  }
`;

export const ContentStyle = styled.div`
  padding-left: 5%;
  position: absolute;
  top: 60%;
  display: flex;
  align-items: center;
  gap: 10%;

  & h1 {
    font-weight: 800;
  }
`;

export const FavoriteLiContainer = styled.div`
  display: flex;
  align-items: center;
  padding-left: 5%;

  & .liContent {
    display: flex;
    align-items: center;
    gap: 5%;
  }

  & .arrow {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 5%;
  }

  & h1 {
    font-size: 16px;
    padding: 28px 10px;
  }
`;
