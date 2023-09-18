import React, { useState, useRef, useEffect, ReactNode } from 'react';
import * as S from './Modal.styled';
import { motion, AnimatePresence } from 'framer-motion';

type OwnProps = {
  // isToggled: boolean;
  // setIsToggled: React.Dispatch<React.SetStateAction<boolean>>;
  data: {
    title: string;
    message: string;
  };
  children: ReactNode | null;
};

const Modal = (props: OwnProps) => {
  const [isToggled, setIsToggled] = useState<boolean>(true);
  const { data, children } = props;

  return (
    <AnimatePresence>
      {isToggled && (
        <>
          <S.GreyBackground />
          <S.ModalContainer
            initial={{ y: 10, x: '-50%', opacity: 0 }}
            animate={{ y: 50, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
          >
            <S.ModalContent>
              <div className="imojiContainer">
                <p>{data.title}</p>
              </div>
              {data.message.split('.').map((item) =>
                item !== '' ? (
                  <p className="contentText" key={item}>
                    {item}
                  </p>
                ) : (
                  ''
                )
              )}
            </S.ModalContent>
            <div style={{ display: 'flex', gap: '16px' }}>
              <S.ModalBtn
                onClick={() => {
                  setIsToggled((prev) => !prev);
                }}
                result={false}
              >
                아니오
              </S.ModalBtn>
              <S.ModalBtn
                onClick={() => {
                  setIsToggled((prev) => !prev);
                }}
                result={true}
              >
                네
              </S.ModalBtn>
            </div>
          </S.ModalContainer>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;
