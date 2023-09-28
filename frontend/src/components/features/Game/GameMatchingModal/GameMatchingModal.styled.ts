import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const GreyBackground = styled.div`
  background: rgba(0, 0, 0, 0.7);
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
  top: 15%;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 70%;
  min-width: 800px;
  max-width: 800px;
  height: 55%;
  max-height: 600px;
  box-shadow: 0px 0px 30px 7px #fff;
  border-radius: 12px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.8);

  & .closeIcon {
    position: absolute;
    top: 2%;
    right: 3%;
    fill-opacity: 0.5;
  }

  & .closeIcon:hover {
    fill-opacity: 1;
  }
`;

export const ModalContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  & .questionMark {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 300px;
    height: 300px;
    margin: 0 auto;
  }
`;

export const AcceptButton = styled.button`
  width: 370px;
  height: 70px;
  padding: 18px 32px;
  border: none;
  border-radius: 30px;
  color: #fff;
  font-size: 24px;
  font-weight: 700;
  background: linear-gradient(90deg, #ffe259 15%, #ffa751 85%);
`;

export const loadingAndButtonContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
