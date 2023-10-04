import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBeforeunload } from 'react-beforeunload';
import { useRecoilState } from 'recoil';
import { TempGameMessage, TempMyGameSession } from '../../atoms/atoms';
import { TempUserGameInfo } from '../../atoms/atoms';
import * as S from './BattleGame.styled';
import GameProfile from 'components/features/Game/GameProfile/GameProfile';
import ThreeCountDown from 'components/features/Game/CountDown/ThreeCountDown';
import ThirtyCountDown from 'components/features/Game/CountDown/ThirtyCountDown';
import { useLocation } from 'react-router-dom';
import { BattleResultType, QuestionBoxProps } from 'types/types';
import * as StompJs from '@stomp/stompjs';
import { GameQuestionBox } from 'components/features/Game/GameQuestionBox/GameQuestionBox';
import Judge from 'components/features/Game/Judge/Judge';
import { userApis } from '../../hooks/api/userApis';
import Enlarge from 'components/Effect/Enlarge/Enlarge';

const BattleGame = () => {
  useBeforeunload((event: any) => event.preventDefault()); // 새로고침 막기
  const navigate = useNavigate();
  const [mySession, setMySession] = useRecoilState(TempMyGameSession); // 내 세션
  const [gameInfo, setGameInfo] = useRecoilState(TempUserGameInfo); // 게임방 아이디
  const [initGameMessage, setInitGameMessage] = useRecoilState(TempGameMessage); // 게임 메세지
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
  const [winner, setWinner] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState<boolean>(false); // false 일 때 321 카운트다운
  const [gameMessage, setGameMessage] = useState(initGameMessage);
  const startRound = () => setIsPlaying(true);
  const [finish, setFinish] = useState<boolean>(false);
  const [isWin, setIsWin] = useState<string>('');

  ////////////////////////////////////////소켓 로직///////////////////////////////////////////
  const [isBattleStart, setIsBattleStart] = useState<boolean>(false); // 소켓 연결 후 계속 true
  const client = useRef<any>({}); // 클라이언트 객체 생성
  // 소켓 연결
  const connect = () => {
    client.current = new StompJs.Client({
      brokerURL: 'ws://localhost:8081/api/game-websocket',
      onConnect: subscribe,
    });
    client.current.activate();
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
    setInitGameMessage({
      session: '',
      message: '',
      messageType: '',
      winner: '',
      round: 0,
      user1: {
        session: '',
        lives: 0,
        checked: false,
      },
      user2: {
        session: '',
        lives: 0,
        checked: false,
      },
    });
    navigate('/home');
  };
  // 첫 렌더링 시 소켓연결
  useEffect(() => {
    setGameInfo({ ...gameInfo, gameRoomId: location.pathname.split('/')[2] });
    connect();
    setIsBattleStart(true);
    return () => disconnect();
  }, []);

  // 게임룸 구독하기
  const subscribe = () => {
    client.current.subscribe(
      `/sub/game/${location.pathname.split('/')[2]}`,
      // 펍 할때마다 실행되는 함수
      async (message: any) => {
        if (message.body) {
          let msg = JSON.parse(message.body);
          if (msg.messageType === 'QUIZ') {
            setQuizList([msg]);
          } else if (msg.messageType === 'GAME') {
            setGameMessage(msg);
            // 둘 다 하트가 0개일 때
            if (msg.user1.lives === 0 && msg.user2.lives === 0) {
              setIsJudge(false);
              setTimeout(() => {
                setFinish(true);
                patchResult(99);
              }, 2000);
            }

            // 둘 중 한명의 하트가 0개이면 게임 끝내기!
            if (msg.user1.lives === 0 || msg.user2.lives === 0) {
              setIsJudge(false);
              setTimeout(() => {
                setFinish(true);
                patchResult(
                  mySession.mySession === gameMessage.user1.session
                    ? msg.user1.lives
                    : msg.user2.lives
                );
              }, 2000);
            }
            // 유저가 둘 다 이미 정답을 체크했으면 다음으로 넘어가기
            if (msg.user1.checked && msg.user2.checked) {
              setIsJudge(false);
              setTimeout(() => {
                setIsPlaying(false);
                nextQuestion();
              }, 3000);
              // 유저가 정답을 맞추면 정답 3초 보여주고 바로 다음문제로 넘어가기
            } else if (msg.user1.checked && msg.winner === 'user1') {
              setIsJudge(false);
              setTimeout(() => {
                setIsPlaying(false);
                nextQuestion();
              }, 3000);
            } else if (msg.user2.checked && msg.winner === 'user2') {
              setIsJudge(false);
              setTimeout(() => {
                setIsPlaying(false);
                nextQuestion();
              }, 3000);
            }
          }
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
        message: '정답',
        messageType: 'GAME',
        winner:
          mySession.mySession === gameMessage.user1.session ? 'user1' : 'user2',
        round: `${nowQuizNumber + 1}`,
        user1: {
          session: gameMessage.user1.session,
          lives:
            mySession.mySession === gameMessage.user1.session
              ? gameMessage.user1.lives
              : gameMessage.user1.lives - 1,
          checked:
            mySession.mySession === gameMessage.user1.session
              ? true
              : gameMessage.user1.checked,
        },
        user2: {
          session: gameMessage.user2.session,
          lives:
            mySession.mySession === gameMessage.user2.session
              ? gameMessage.user2.lives
              : gameMessage.user2.lives - 1,
          checked:
            mySession.mySession === gameMessage.user2.session
              ? true
              : gameMessage.user2.checked,
        },
      }),
    });
    setWinner(
      mySession.mySession === gameMessage.user1.session ? 'user1' : 'user2'
    );
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
        message: '오답',
        messageType: 'GAME',
        winner: gameMessage.winner,
        round: `${nowQuizNumber + 1}`,
        user1: {
          session: gameMessage.user1.session,
          lives:
            mySession.mySession === gameMessage.user1.session
              ? gameMessage.user1.lives - 1
              : gameMessage.user1.lives,
          checked:
            mySession.mySession === gameMessage.user1.session
              ? true
              : gameMessage.user1.checked,
        },
        user2: {
          session: gameMessage.user2.session,
          lives:
            mySession.mySession === gameMessage.user2.session
              ? gameMessage.user2.lives - 1
              : gameMessage.user2.lives,
          checked:
            mySession.mySession === gameMessage.user2.session
              ? true
              : gameMessage.user2.checked,
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
    if (mySession.mySession === gameMessage.user1.session) {
      client.current.publish({
        destination: `/pub/status-message/${location.pathname.split('/')[2]}`,
        body: JSON.stringify({
          session: mySession.mySession,
          message: '무승부',
          messageType: 'GAME',
          winner: '',
          round: `${nowQuizNumber + 1}`,
          user1: {
            session: gameMessage.user1.session,
            lives: gameMessage.user1.lives - 1,
            checked: true,
          },
          user2: {
            session: gameMessage.user2.session,
            lives: gameMessage.user2.lives - 1,
            checked: true,
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
    }
  };

  // 문제 불러오기
  const questionPub = (path: string) => {
    if (mySession.mySession === gameMessage.user1.session) {
      client.current.publish({
        destination: `/pub/quiz-message/${path}`,
      });
    }
  };

  // 다음 문제로 가는 함수
  const nextQuestion = () => {
    // setIsJudge(false);
    // setIsPlaying(false);
    setNowQuizNumber((prev) => prev + 1);
    setIsCorrect(null);
    setAnswer('');
    setGameMessage((prev) => {
      prev.winner = '';
      prev.user1.checked = false;
      prev.user2.checked = false;
      return { ...prev };
    });
    setWinner('');
  };

  // 정답 채점
  const checkAnswer = async () => {
    if (
      // 내가 이미 문제를 체크했다면 return
      mySession.mySession === gameMessage.user1.session &&
      gameMessage.user1.checked
    ) {
      return;
    }
    if (
      // 내가 이미 문제를 체크했다면 return
      mySession.mySession === gameMessage.user2.session &&
      gameMessage.user2.checked
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
        if (mySession.mySession === gameMessage.user1.session) {
          setWinner('user1');
        } else {
          setWinner('user2');
        }
      } else {
        setIsCorrect(false);
        wrongAnswerPub();
      }
      setIsJudge(true);
      if (quizList[0].content.length === 1) {
        setAnswer(quizList[0].content[0]);
      } else {
        setAnswer(Number(quizList[0].caseNum));
      }
    }
  };

  // 결과 보내기
  const patchResult = async (lives: number) => {
    await userApis
      .patch(`/game/result?lives=${lives}`)
      .then((res) => {
        if (res.data.result === 1) {
          setIsWin('win');
        } else if (res.data.result === 2) {
          setIsWin('draw');
        } else {
          setIsWin('lose');
        }
      })
      .catch((err) => {});
  };

  // 게임메세지 변경 시 마다 다시렌더링
  useEffect(() => {}, [gameMessage]);
  // 퀴즈 리스트 불러올때 다시 렌더링
  useEffect(() => {}, [quizList]);

  return (
    <S.Container>
      {finish ? (
        <S.ResultContainer>
          <GameProfile
            heartCntProps={
              gameMessage?.user1?.session === mySession.mySession
                ? gameMessage?.user1?.lives
                : gameMessage?.user2?.lives
            }
            level={gameInfo.me.level}
            nickname={gameInfo.me.nickname}
            // @ts-ignore
            currentCharactor={gameInfo.me.currentCharactor}
          />
          {/* @ts-ignore */}
          <Judge state={isWin === '' ? '' : isWin} />
        </S.ResultContainer>
      ) : (
        <>
          {isPlaying && !isJudge ? (
            <ThirtyCountDown
              isPlaying={isPlaying}
              startRound={startRound}
              endRound={() => {
                tieAnswerPub();
                setIsPlaying(false);
              }}
            />
          ) : (
            <div style={{ height: '150px' }}></div>
          )}
          <S.BattleContainer>
            <GameProfile
              heartCntProps={
                gameMessage?.user1?.session === mySession.mySession
                  ? gameMessage?.user1?.lives
                  : gameMessage?.user2?.lives
              }
              level={gameInfo.me.level}
              nickname={gameInfo.me.nickname}
              // @ts-ignore
              currentCharactor={gameInfo.me.currentCharactor}
            />
            <S.BattleBoard>
              {isBattleStart && !isPlaying ? (
                <ThreeCountDown
                  questionPub={() => {
                    questionPub(location.pathname.split('/')[2]);
                  }}
                  currentRound={nowQuizNumber + 1}
                  trigger={() => {
                    setIsPlaying(true);
                  }}
                />
              ) : (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '20px',
                  }}
                >
                  {quizList ? (
                    <GameQuestionBox
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
                  <Enlarge>
                    <S.AnswerBtn onClick={checkAnswer}>
                      정답체크하기
                    </S.AnswerBtn>
                  </Enlarge>
                </div>
              )}
            </S.BattleBoard>
            <GameProfile
              heartCntProps={
                gameMessage?.user1?.session === mySession.mySession
                  ? gameMessage?.user2?.lives
                  : gameMessage?.user1?.lives
              }
              level={gameInfo.other.level}
              nickname={gameInfo.other.nickname}
              // @ts-ignore
              currentCharactor={gameInfo.other.currentCharactor}
            />
          </S.BattleContainer>
        </>
      )}
    </S.Container>
  );
};

export default BattleGame;
