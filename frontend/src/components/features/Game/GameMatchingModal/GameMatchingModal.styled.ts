import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const GreyBackground = styled.div`
  background: #aaaaaa2e;
  width: 100vw;
  height: 100vh;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
`;

export const ModalContainer = styled(motion.div)`
  position: absolute;
  top: 12%;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
  width: 1156px;
  height: 731px;
  box-shadow: 5px 5px 30px 10px #fff;
  border-radius: 12px;
  text-align: center;
  padding: 24px 32px;
  background-color: rgba(0, 0, 0, 0.8);

  & .closeIcon {
    position: absolute;
    top: 38px;
    right: 38px;
    fill-opacity: 0.5;
  }

  & .closeIcon:hover {
    fill-opacity: 1;
  }
`;

export const ModalContent = styled.div`
  display: flex;
  align-items: center;
  gap: 100px;
  margin-bottom: 30px;
`;

export const AcceptButton = styled.button`
  width: 370px;
  height: 70px;
  padding: 18px 32px;
  border-radius: 30px;
  color: #fff;
  font-size: 24px;
  font-weight: 700;
  background: linear-gradient(90deg, #ffe259 15%, #ffa751 85%);
`;
