import React, { useState, useRef, useEffect, ReactNode } from 'react';
import * as S from './GameMatchingModal.styled';
import { motion, AnimatePresence } from 'framer-motion';
import VsImg from '../../../../assets/img/Game/vs.png';
import QuestionImg from '../../../../assets/img/Game/question.png';
import MatchingProfile from '../MatchingProfile/MatchingProfile';
import { ReactComponent as CloseIcon } from '../../../../assets/svgs/Game/close.svg';
import LoadingBar from '../LoadingBar/LoadingBar';

type Client = {
  level: number;
  nickname: string;
  charactor: string;
  bgColor: string;
};

type OwnProps = {
  // isToggled: boolean;
  // setIsToggled: React.Dispatch<React.SetStateAction<boolean>>;
  me: Client;
  other: Client | null;
  isMatching: boolean;
};

const GameMatchingModal = (props: OwnProps) => {
  const { me, other, isMatching } = props;
  const [isToggled, setIsToggled] = useState<boolean>(true);

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
            <CloseIcon
              onClick={() => {
                setIsToggled(!isToggled);
              }}
              className="closeIcon"
            ></CloseIcon>
            <S.ModalContent>
              <MatchingProfile
                level={me.level}
                nickname={me.nickname}
                charactor={me.charactor}
                bgColor={me.bgColor}
              ></MatchingProfile>
              <div>
                <img src={VsImg} alt="대결" />
              </div>
              {isMatching ? (
                <MatchingProfile
                  level={other ? other.level : 0}
                  nickname={other ? other.nickname : ''}
                  charactor={other ? other.charactor : ''}
                  bgColor={other ? other.bgColor : ''}
                ></MatchingProfile>
              ) : (
                <div style={{ width: '300px' }}>
                  <img src={QuestionImg} alt="물음표" />
                </div>
              )}
            </S.ModalContent>
            {isMatching ? (
              <S.AcceptButton>대결 수락</S.AcceptButton>
            ) : (
              <LoadingBar />
            )}
          </S.ModalContainer>
        </>
      )}
    </AnimatePresence>
  );
};

export default GameMatchingModal;
