import React, { useState, useRef, useEffect, ReactNode } from 'react';
import * as S from './GameMatchingModal.styled';
import { motion, AnimatePresence } from 'framer-motion';
import VsImg from '../../../../assets/img/Game/vs.png';
import QuestionImg from '../../../../assets/img/Game/question.png';
import MatchingProfile from '../MatchingProfile/MatchingProfile';
import { ReactComponent as CloseIcon } from '../../../../assets/svgs/Game/close.svg';
import LoadingBar from '../LoadingBar/LoadingBar';
import { userApis } from 'hooks/api/userApis';
import { gameApis } from 'hooks/api/gameApis';

import StompJs from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import axios from 'axios';

type Client = {
  level: number;
  nickname: string;
  charactorNumber: 1 | 2 | 3 | 4 | 5;
};

type OwnProps = {
  me: Client;
  other?: Client | null;
  isMatching: boolean;
  isToggled: boolean;
  closeModal: () => void;
};

const GameMatchingModal = (props: OwnProps) => {
  const { me, other, isMatching, isToggled, closeModal } = props;

  //////////////////////게임 로직/////////////////////////////////////
  const tryMatch = async () => await userApis.get(`/game/join`);
  const getGameInfo = async () => await userApis.get(`/game/play`);

  useEffect(() => {
    if (isToggled) {
      tryMatch()
        .then((res) => {
          console.log('매칭성공!');
          getGameInfo()
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log('매칭실패!');
        });
      console.log('요청보냈다!');
    }
  }, [isToggled]);

  useEffect(() => {}, [other]);

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
              onClick={closeModal}
              className="closeIcon"
              width={50}
            ></CloseIcon>
            <S.ModalContent>
              <MatchingProfile
                level={me.level}
                nickname={me.nickname}
                charactorNumber={me.charactorNumber}
              ></MatchingProfile>
              <div className="battleIcon">
                <img src={VsImg} alt="대결" width={100} />
              </div>
              {isMatching ? (
                <MatchingProfile
                  level={other ? other.level : 0}
                  nickname={other ? other.nickname : ''}
                  charactorNumber={other ? other.charactorNumber : 1}
                ></MatchingProfile>
              ) : (
                <div className="questionMark">
                  <img src={QuestionImg} alt="물음표" width={100} />
                </div>
              )}
            </S.ModalContent>
            {isMatching ? (
              <S.loadingAndButtonContainer>
                <S.AcceptButton>대결 수락</S.AcceptButton>
              </S.loadingAndButtonContainer>
            ) : (
              <S.loadingAndButtonContainer>
                <LoadingBar />
              </S.loadingAndButtonContainer>
            )}
          </S.ModalContainer>
        </>
      )}
    </AnimatePresence>
  );
};

export default GameMatchingModal;
