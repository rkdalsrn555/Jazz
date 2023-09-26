import { motion, AnimatePresence } from 'framer-motion';
import styled from '@emotion/styled';

export const ItemWrap = styled(motion.li)`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  margin-top: -1px;
  background: white;
  overflow: hidden;

  h1 {
    padding: 22px 30px 21px 30px;
    font-size: 15px;
    z-index: 1;
    opacity: 0.9;
  }
`;

export const Img = styled(motion.div)`
  width: 40px;
  height: 40px;
  overflow: hidden;
  border-radius: 50%;
  margin: 0 30px 0 0;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    vertical-align: bottom;
  }
`;

export const SubWrap = styled(motion.div)`
  font-size: 15px;
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #a3a3e1;

  div {
    padding: 10px 20px;
    text-align: left;
  }

  :last-child {
    border-radius: 0 0 20px 20px;
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const QuestionStyle = styled.div`
  display: flex;
  gap: 10%;

  & h1 {
    font-weight: 800;
  }
`;

export const ContentStyle = styled.div`
  display: flex;
  gap: 10%;

  & h1 {
    font-weight: 800;
  }
`;
