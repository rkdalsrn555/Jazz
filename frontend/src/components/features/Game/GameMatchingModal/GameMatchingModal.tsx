import React, { useEffect } from 'react';
import * as S from './GameMatchingModal.styled';
import { AnimatePresence } from 'framer-motion';
import VsImg from '../../../../assets/img/Game/vs.png';
import QuestionImg from '../../../../assets/img/Game/question.png';
import MatchingProfile from '../MatchingProfile/MatchingProfile';
import { ReactComponent as CloseIcon } from '../../../../assets/svgs/Game/close.svg';
import LoadingBar from '../LoadingBar/LoadingBar';
import { userApis } from 'hooks/api/userApis';
import { useNavigate } from 'react-router-dom';

import StompJs from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import axios from 'axios';
import Enlarge from 'components/Effect/Enlarge/Enlarge';

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
  const navigate = useNavigate();

  //////////////////////게임 로직/////////////////////////////////////
  // const tryMatch = async () => await userApis.get(`/game/join`);
  // const getGameInfo = async () => await userApis.get(`/game/play`);
  const cancleMatching = async () => await userApis.get(`/game/cancel`);

  useEffect(() => {
    // if (isToggled) {
    //   tryMatch()
    //     .then((res) => {
    //       console.log('매칭성공!');
    //       getGameInfo()
    //         .then((res) => {
    //           console.log(res);
    //         })
    //         .catch((err) => {
    //           console.log(err);
    //         });
    //     })
    //     .catch((err) => {
    //       console.log('매칭실패!');
    //     });
    //   console.log('요청보냈다!');
    // }
    if (isToggled) {
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
              onClick={() => {
                cancleMatching()
                  .then((res) => {
                    closeModal();
                  })
                  .catch((err) => {
                    alert('매칭 취소에 실패하였습니다, 다시 취소해주세요');
                  });
              }}
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
                <Enlarge>
                  <S.AcceptButton
                    onClick={() => {
                      navigate('/battle-game');
                    }}
                  >
                    대결 수락
                  </S.AcceptButton>
                </Enlarge>
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
