import React, { useState, useRef } from 'react';
import * as S from './Modal.styled';
import { isButtonElement } from 'react-router-dom/dist/dom';

type OwnProps = {
  imoji: string;
  content: string;
  modalState: boolean;
};

const Modal = (props: OwnProps) => {
  const { imoji, content, modalState } = props;
  const [modalOpen, setModalOpen] = useState<boolean>(modalState);
  const modalRef = useRef<HTMLDivElement>(null);

  const showModal = () => setModalOpen(true);
  const closeModal = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e.currentTarget.id);
    // if (e.currentTarget)
    // setModalOpen(false);
  };

  return (
    <S.GreyBackground id="greyBg" onClick={closeModal}>
      <S.ModalContainer>
        <S.ModalContent>
          <div className="imojiContainer">
            <p>{imoji}</p>
          </div>
          {content.split('.').map((item) =>
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
          <S.ModalBtn id="closeBtn" result={false}>
            아니오
          </S.ModalBtn>
          <S.ModalBtn id="closeBtn" result={true}>
            네
          </S.ModalBtn>
        </div>
      </S.ModalContainer>
    </S.GreyBackground>
  );
};

export default Modal;
