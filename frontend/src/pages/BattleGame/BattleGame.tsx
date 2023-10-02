import React, { useState, useEffect, useRef } from 'react';
import { useBeforeunload } from 'react-beforeunload';
import { useRecoilState, useRecoilValue } from 'recoil';
import { TempGameMessage, TempMyGameSession } from '../../atoms/atoms';
import { TempUserGameInfo } from '../../atoms/atoms';
import * as S from './BattleGame.styled';
import GameProfile from 'components/features/Game/GameProfile/GameProfile';
import ThreeCountDown from 'components/features/Game/CountDown/ThreeCountDown';
import ThirtyCountDown from 'components/features/Game/CountDown/ThirtyCountDown';
import { useLocation } from 'react-router-dom';
import { BattleResultType, QuestionBoxProps } from 'types/types';
import * as StompJs from '@stomp/stompjs';
import { QuestionBox } from 'components/features/Quiz/QuestionBox/QuestionBox';

const BattleGame = () => {
  useBeforeunload((event: any) => event.preventDefault()); // 새로고침 막기
  const [mySession, setMySession] = useRecoilState(TempMyGameSession); // 내 세션
  const [gameInfo, setGameInfo] = useRecoilState(TempUserGameInfo); // 게임방 아이디
  const [gameMessage, setGameMessage] = useRecoilState(TempGameMessage); // 게임 메세지
  const location = useLocation();

  ///////////////////////////////////////퀴즈 로직/////////////////////////////////////////////
  const [result, setResult] = useState<BattleResultType>({
    user1Cnt: {
      win: 0,
      lose: 0,
      draw: 0,
    },
    user2Cnt: {
      win: 0,
      lose: 0,
      draw: 0,
    },
  }); // 퀴즈 결과 보낼때 사용
  const [quizList, setQuizList] = useState<QuestionBoxProps[] | null>(null); // 퀴즈 리스트 (1개)
  const [nowQuizNumber, setNowQuizNumber] = useState<number>(0); // 지금 문제 번호
  const [isJudge, setIsJudge] = useState<boolean>(false); // 정답 체크 중일때의 상태
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null); // 정답인지 아닌지 확인
  const [answer, setAnswer] = useState<string | number>(''); // 정답을 담는 상태
  const [isPlaying, setIsPlaying] = useState<boolean>(false); // false 일 때 321 카운트다운
  const startRound = () => setIsPlaying(true);
  const endRound = () => setIsPlaying(false);

  // 다음 문제로 가는 함수
  const nextQuestion = () => {
    setIsJudge(false);
    setNowQuizNumber((prev) => prev + 1);
    setIsCorrect(null);
    setAnswer('');
    setIsPlaying(false);
  };

  // 정답 채점
  const checkAnswer = async () => {
    if (
      // 내가 이미 문제를 체크했다면 return
      mySession.mySession === gameMessage.user1.session &&
      gameMessage.user1.isChecked
    ) {
      return;
    }
    if (
      // 내가 이미 문제를 체크했다면 return
      mySession.mySession === gameMessage.user2.session &&
      gameMessage.user1.isChecked
    ) {
      return;
    }

    if (quizList) {
      // 적은 답과 content의 내용이 일치하면 정답!
      let ans = null;
      let correctAns = null;
      if (typeof answer === 'string') {
        ans = answer.replace(/\s+/g, '');
        correctAns = quizList[0].content[0].replace(/\s+/g, '');
      } else {
        ans = answer;
        correctAns = quizList[0].caseNum;
      }
      if (ans === correctAns) {
        // 정답이면 내가 맞췄다고 펍하기! 다음문제로 넘어가기
        setIsCorrect(true);
        correctAnswerPub();
        nextQuestion();
      } else {
        setIsCorrect(false);
        wrongAnswerPub();
      }
      setIsJudge(true);
      if (quizList[0].content.length === 1) {
        setAnswer(quizList[0].content[0]);
      }
    }
  };

  ////////////////////////////////////////소켓 로직///////////////////////////////////////////
  const [isBattleStart, setIsBattleStart] = useState<boolean>(false); // 소켓 연결 후 계속 true

  const client = useRef<any>({}); // 클라이언트 객체 생성
  // 소켓 연결
  const connect = () => {
    client.current = new StompJs.Client({
      brokerURL: 'ws://localhost:8081/api/game-websocket',
      onConnect: () => subscribe(),
    });
    client.current.activate();
  };

  // 게임룸 구독하기
  const subscribe = () => {
    client.current.subscribe(
      `/sub/game/${location.pathname.split('/')[2]}`,
      // 펍 할때마다 실행되는 함수
      (message: any) => {
        if (message.body) {
          let msg = JSON.parse(message.body);

          if (msg.messageType === 'Quiz') {
            setQuizList([msg]);
          } else {
            setGameMessage(msg);
          }
        } else {
          console.log(message);
        }
      }
    );
  };

  // 정답 pub 보내기
  const correctAnswerPub = () => {
    client.current.publish({
      destination: `/pub/status-message/${location.pathname.split('/')[2]}`,
      body: JSON.stringify({
        session: mySession.mySession,
        message: '정답체크',
        messageType: 'GAME',
        round: `${nowQuizNumber + 1}`,
        user1: {
          session: gameMessage.user1.session,
          lives:
            mySession.mySession === gameMessage.user1.session
              ? gameMessage.user1.lives
              : gameMessage.user1.lives - 1,
          isChecked:
            mySession.mySession === gameMessage.user1.session ? true : false,
        },
        user2: {
          session: gameMessage.user1.session,
          lives:
            mySession.mySession === gameMessage.user2.session
              ? gameMessage.user2.lives
              : gameMessage.user2.lives - 1,
          isChecked:
            mySession.mySession === gameMessage.user2.session ? true : false,
        },
      }),
    });
    setResult({
      user1Cnt: {
        win:
          mySession.mySession === gameMessage.user1.session
            ? result.user1Cnt.win + 1
            : result.user1Cnt.win,
        lose:
          mySession.mySession === gameMessage.user1.session
            ? result.user1Cnt.lose
            : result.user1Cnt.lose + 1,
        draw: result.user1Cnt.draw,
      },
      user2Cnt: {
        win:
          mySession.mySession === gameMessage.user2.session
            ? result.user2Cnt.win + 1
            : result.user2Cnt.win,
        lose:
          mySession.mySession === gameMessage.user2.session
            ? result.user2Cnt.lose
            : result.user2Cnt.lose + 1,
        draw: result.user2Cnt.draw,
      },
    });
  };

  // 오답 pub 보내기
  const wrongAnswerPub = () => {
    client.current.publish({
      destination: `/pub/status-message/${location.pathname.split('/')[2]}`,
      body: JSON.stringify({
        session: mySession.mySession,
        message: '정답체크',
        messageType: 'GAME',
        round: `${nowQuizNumber + 1}`,
        user1: {
          session: gameMessage.user1.session,
          lives:
            mySession.mySession === gameMessage.user1.session
              ? gameMessage.user1.lives - 1
              : gameMessage.user1.lives,
          isChecked:
            mySession.mySession === gameMessage.user1.session ? true : false,
        },
        user2: {
          session: gameMessage.user1.session,
          lives:
            mySession.mySession === gameMessage.user2.session
              ? gameMessage.user2.lives - 1
              : gameMessage.user2.lives,
          isChecked:
            mySession.mySession === gameMessage.user2.session ? true : false,
        },
      }),
    });
    setResult({
      user1Cnt: {
        win: result.user1Cnt.win,
        lose:
          mySession.mySession === gameMessage.user1.session
            ? result.user1Cnt.lose + 1
            : result.user1Cnt.lose,
        draw: result.user1Cnt.draw,
      },
      user2Cnt: {
        win: result.user2Cnt.win,
        lose:
          mySession.mySession === gameMessage.user2.session
            ? result.user2Cnt.lose
            : result.user2Cnt.lose + 1,
        draw: result.user2Cnt.draw,
      },
    });
  };

  // 무승부 pub 보내기
  const tieAnswerPub = () => {
    client.current.publish({
      destination: `/pub/status-message/${location.pathname.split('/')[2]}`,
      body: JSON.stringify({
        session: mySession.mySession,
        message: '정답체크',
        messageType: 'GAME',
        round: `${nowQuizNumber + 1}`,
        user1: {
          session: gameMessage.user1.session,
          lives: gameMessage.user1.lives - 1,
          isChecked: true,
        },
        user2: {
          session: gameMessage.user1.session,
          lives: gameMessage.user2.lives - 1,
          isChecked: true,
        },
      }),
    });
    setResult({
      user1Cnt: {
        win: result.user1Cnt.win,
        lose: result.user1Cnt.lose,
        draw: result.user1Cnt.draw + 1,
      },
      user2Cnt: {
        win: result.user2Cnt.win,
        lose: result.user2Cnt.lose,
        draw: result.user2Cnt.draw + 1,
      },
    });
  };

  // 문제 불러오기
  const questionPub = () => {
    client.current.publish({
      destination: `/pub/quiz-message/${location.pathname.split('/')[2]}`,
    });
  };

  // 연결끊기
  const disconnect = () => {
    client.current.deactivate();
    console.log('웹소켓 연결이 끊어졌습니다');
    setMySession({ mySession: '' });
    setGameInfo({
      gameRoomId: '',
      me: {
        level: 0,
        nickname: '',
        currentCharactor: 1,
      },
      other: {
        level: 0,
        nickname: '',
        currentCharactor: 1,
      },
    });
    setGameMessage({
      session: '',
      message: '',
      messageType: '',
      round: 0,
      user1: {
        session: '',
        lives: 0,
        isChecked: false,
      },
      user2: {
        session: '',
        lives: 0,
        isChecked: false,
      },
    });
  };

  // 첫 렌더링 시 소켓연결
  useEffect(() => {
    setGameInfo({ ...gameInfo, gameRoomId: location.pathname.split('/')[2] });
    connect();
    setIsBattleStart(true);
    return () => disconnect();
  }, []);

  // 게임메세지 변경 시 마다 다시렌더링
  useEffect(() => {}, [gameMessage]);

  // 퀴즈 리스트 불러올때 다시 렌더링
  useEffect(() => {}, [quizList]);

  return (
    <S.Container>
      {isPlaying ? (
        <ThirtyCountDown
          isPlaying={isPlaying}
          startRound={startRound}
          endRound={endRound}
        />
      ) : (
        <div style={{ height: '150px' }}></div>
      )}
      <S.BattleContainer>
        <GameProfile
          heartCntProps={
            gameMessage.user1.session === mySession.mySession
              ? gameMessage.user1.lives
              : gameMessage.user2.lives
          }
          level={gameInfo.me.level}
          nickname={gameInfo.me.nickname}
          // @ts-ignore
          currentCharactor={gameInfo.me.currentCharactor}
        />
        <S.BattleBoard>
          {isBattleStart && !isPlaying ? (
            <ThreeCountDown
              questionPub={questionPub}
              currentRound={gameMessage ? gameMessage?.round : 1}
              trigger={() => {
                setIsPlaying(true);
              }}
            />
          ) : (
            <>
              {quizList ? (
                <QuestionBox
                  quizId={quizList[0].quizId}
                  question={quizList[0].question}
                  content={quizList[0].content}
                  isMulti={quizList[0].isMulti}
                  isBookmark={quizList[0].isBookmark}
                  finiancialType={quizList[0].finiancialType}
                  caseNum={quizList[0].caseNum}
                  kind={quizList[0].kind}
                  questionNumber={nowQuizNumber + 1}
                  answer={answer}
                  setAnswer={setAnswer}
                  isCorrect={isCorrect}
                  isJudge={isJudge}
                />
              ) : (
                '퀴즈를 불러오는 중이에요'
              )}
              <button onClick={checkAnswer}>정답체크하기</button>
            </>
          )}
        </S.BattleBoard>
        <GameProfile
          heartCntProps={
            gameMessage.user1.session === mySession.mySession
              ? gameMessage.user1.lives
              : gameMessage.user2.lives
          }
          level={gameInfo.other.level}
          nickname={gameInfo.other.nickname}
          // @ts-ignore
          currentCharactor={gameInfo.other.currentCharactor}
        />
      </S.BattleContainer>
    </S.Container>
  );
};

export default BattleGame;
