import React, { useEffect, useState } from 'react';
import * as S from './GameMatchingModal.styled';
import { AnimatePresence } from 'framer-motion';
import VsImg from '../../../../assets/img/Game/vs.png';
import QuestionImg from '../../../../assets/img/Game/question.png';
import MatchingProfile from '../MatchingProfile/MatchingProfile';
import { ReactComponent as CloseIcon } from '../../../../assets/svgs/Game/close.svg';
import LoadingBar from '../LoadingBar/LoadingBar';
import { userApis } from 'hooks/api/userApis';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import {
  TempGameMessage,
  TempMyGameSession,
  TempUserGameInfo,
} from 'atoms/atoms';
import Enlarge from 'components/Effect/Enlarge/Enlarge';
// import { UserInfo } from 'atoms/atoms';

type Client = {
  level: number;
  nickname: string;
  currentCharactor: 1 | 2 | 3 | 4 | 5;
};

type Clients = {
  me: Client;
  other?: Client | null;
};

type OwnProps = {
  isToggled: boolean;
  closeModal: () => void;
};

const GameMatchingModal = (props: OwnProps) => {
  const { isToggled, closeModal } = props;
  // const Me = useRecoilValue(UserInfo);
  const [isMatching, setIsMatching] = useState<boolean>(false);
  const setTempMySession = useSetRecoilState(TempMyGameSession);
  const setTempGameInfo = useSetRecoilState(TempUserGameInfo);
  const setTempGameMessage = useSetRecoilState(TempGameMessage);
  const gameInfo = useRecoilValue(TempUserGameInfo);
  const [gameRoomId, setGameRoomId] = useState<string>('');
  const navigate = useNavigate();

  //////////////////////게임 로직/////////////////////////////////////
  const tryMatch = async () => await userApis.get(`/game/join`);
  const cancleMatching = async () => await userApis.get(`/game/cancel`);

  useEffect(() => {
    // 모달창이 켜져있으면
    if (isToggled) {
      // 1. tryMatch로 매칭을 시도한다
      // 2. 성공하면 navigate(`/battle-game/${GameInfo.gameRoomId}`) 을 해준다
      tryMatch()
        .then((res) => {
          setGameRoomId(res.data.gameRoomId);
          setIsMatching(true);
          setTempMySession({ mySession: res.data.session });
          setTempGameInfo({
            gameRoomId: res.data.gameRoomId,
            me: {
              level: res.data.me.level,
              nickname: res.data.me.nickname,
              currentCharactor: res.data.me.currentCharacter,
            },
            other: {
              level: res.data.other.level,
              nickname: res.data.other.nickname,
              currentCharactor: res.data.other.currentCharacter,
            },
          });
          setTempGameMessage({
            session: res.data.initGameMessage.session,
            message: res.data.initGameMessage.message,
            messageType: res.data.initGameMessage.messageType,
            round: res.data.initGameMessage.round,
            winner: res.data.initGameMessage.winner,
            user1: {
              session: res.data.initGameMessage.user1.session,
              lives: res.data.initGameMessage.user1.lives,
              checked: res.data.initGameMessage.user1.checked,
            },
            user2: {
              session: res.data.initGameMessage.user2.session,
              lives: res.data.initGameMessage.user2.lives,
              checked: res.data.initGameMessage.user2.checked,
            },
          });
          setTimeout(() => {
            navigate(`/battle-game/${res.data.gameRoomId}`);
          }, 2000);
        })
        .catch((err) => {
          alert('매칭에 실패하였습니다. 다시 게임 대전을 신청해주세요');
          closeModal();
        });
    }
  }, [isToggled]);

  useEffect(() => {}, [gameInfo]);

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
                level={gameInfo.me.level}
                nickname={gameInfo.me.nickname}
                // @ts-ignore
                currentCharactor={gameInfo.me.currentCharactor}
              ></MatchingProfile>
              <div className="battleIcon">
                <img src={VsImg} alt="대결" width={100} />
              </div>
              {isMatching ? (
                <MatchingProfile
                  level={gameInfo.other ? gameInfo.other.level : 0}
                  nickname={gameInfo.other ? gameInfo.other.nickname : ''}
                  // @ts-ignore
                  currentCharactor={
                    gameInfo.other ? gameInfo.other.currentCharactor : 1
                  }
                ></MatchingProfile>
              ) : (
                <div className="questionMark">
                  <img src={QuestionImg} alt="물음표" width={100} />
                </div>
              )}
            </S.ModalContent>
            {isMatching ? (
              <S.loadingAndButtonContainer>
                <LoadingBar content="매칭성공! 2초뒤에 게임이 시작됩니다" />
              </S.loadingAndButtonContainer>
            ) : (
              <S.loadingAndButtonContainer>
                <LoadingBar content="1 : 1 매칭 상대를 찾는 중입니다..." />
              </S.loadingAndButtonContainer>
            )}
          </S.ModalContainer>
        </>
      )}
    </AnimatePresence>
  );
};

export default GameMatchingModal;
