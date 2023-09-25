import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useBeforeunload } from 'react-beforeunload';
import * as S from './ShortAnswerQuestionPage.styled';
import { userAccessAtom, userRefreshAtom } from 'atoms/atoms';
import { useRecoilValue } from 'recoil';
import QuizProgressBar from 'components/features/Quiz/QuizProgressBar/QuizProgressBar';
import { QuestionBox } from 'components/features/Quiz/QuestionBox/QuestionBox';
import QuizButton from 'components/features/Quiz/QuizButton/QuizButton';
import { QuestionBoxProps } from 'types/types';
import { QuizData as mockData } from './QuizData';
import Modal from 'components/utils/Modal/Modal';
import Enlarge from 'components/Effect/Enlarge/Enlarge';
import FadeInOut from 'components/Effect/FadeInOut/FadeInOut';

const ShortAnswerQuestionPage = () => {
  // 새로고침 막기
  useBeforeunload((event: any) => event.preventDefault());
  const userAccessToken = useRecoilValue(userAccessAtom);
  const navigate = useNavigate();
  const [isToggled, setIsToggled] = useState<boolean>(false); // 모달 창 toggle
  // 지금 문제 번호
  const [nowQuizNumber, setNowQuizNumber] = useState<number>(0);
  // 퀴즈 리스트 (10개)
  const [quizList, setQuizList] = useState<QuestionBoxProps[] | null>(null);
  // 정답 체크중일때의 상태
  const [isJudge, setIsJudge] = useState<boolean>(false);
  // 정답 개수 세기
  const [answerCnt, setAnswerCnt] = useState<number>(0);
  // 정답을 담는 상태
  const [answer, setAnswer] = useState<string | number>('');
  // 정답인지 아닌지 확인
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  // 즐겨찾기 시 버튼 비활성화
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  // 모달에 띄울 내용
  const [modalData, setModalData] = useState<{
    data: {
      title: string;
      message: string;
    };
    noBtnClick?: () => void | null;
    yesBtnClick?: () => void | null;
  }>({ data: { title: '', message: '' } });

  // 다음 문제로 가는 함수
  const nextQuestion = () => {
    setIsJudge(false);
    setNowQuizNumber((prev) => prev + 1);
    setIsCorrect(null);
    setAnswer('');
  };

  const putTryQuiz = () => {
    if (quizList) {
      axios
        .put(
          `${process.env.REACT_APP_BASE_URL}/quiz/management/${quizList[nowQuizNumber].quizId}`,
          {},
          {
            headers: {
              accessToken: userAccessToken,
            },
          }
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const patchTryQuiz = () => {
    if (quizList) {
      axios
        .patch(
          `${process.env.REACT_APP_BASE_URL}/quiz/correction`,
          {
            quizId: quizList[nowQuizNumber].quizId,
            isCorrect: isCorrect,
          },
          {
            headers: {
              accessToken: userAccessToken,
            },
          }
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const checkAnswer = () => {
    if (quizList) {
      // 적은 답과 content의 내용이 일치하면 정답!
      let ans = null;
      let correctAns = null;
      if (typeof answer === 'string') {
        ans = answer.replace(/\s+/g, '');
        correctAns = quizList[nowQuizNumber].content[
          quizList[nowQuizNumber].caseNum ?? 0
        ].replace(/\s+/g, '');
      } else {
        ans = answer;
        correctAns =
          quizList[nowQuizNumber].content[quizList[nowQuizNumber].caseNum ?? 0];
      }
      if (ans === correctAns) {
        setIsCorrect(true);
        // 정답 갯수 하나 세기
        setAnswerCnt((prev) => prev + 1);
        // 문제 답 적은거 axios 요청 보내기
        // putTryQuiz();
        // patchTryQuiz();
      } else {
        setIsCorrect(false);
        // putTryQuiz();
        // patchTryQuiz();
      }
      setIsJudge(true);
      if (quizList[nowQuizNumber].content.length === 1) {
        setAnswer(
          quizList[nowQuizNumber].content[quizList[nowQuizNumber].caseNum ?? 0]
        );
      }
    }
  };

  const getQuiz = async () => {
    // await axios
    //   .get(`${process.env.REACT_APP_BASE_URL}/quiz/2`, {
    //     headers: {
    //       accessToken: userAccessToken,
    //     },
    //   })
    //   .then((res) => {
    //     setQuizList(res.data);
    //     console.log(res.data);
    //   })
    //   .catch((err) => {
    //     console.log('문제를 불러오지 못했어요');
    //   });
    setQuizList(mockData);
  };

  const patchFavoriteQuiz = async () => {
    setIsDisabled(true);
    if (quizList) {
      if (!quizList[nowQuizNumber].isBookmark) {
        await axios
          .patch(
            `${process.env.REACT_APP_BASE_URL}/quiz/bookmark/registration`,
            {
              quizId: quizList[nowQuizNumber].quizId,
              isBookmark: true,
            },
            {
              headers: {
                accessToken: userAccessToken,
              },
            }
          )
          .then((res) => {
            quizList[nowQuizNumber].isBookmark = res.data.isBookmark;
            setIsDisabled(false);
          })
          .catch((err) => {
            setIsDisabled(false);
          });
      } else {
        await axios
          .patch(
            `${process.env.REACT_APP_BASE_URL}/quiz/bookmark/release`,
            {
              quizId: quizList[nowQuizNumber].quizId,
              isBookmark: false,
            },
            {
              headers: {
                accessToken: userAccessToken,
              },
            }
          )
          .then((res) => {
            quizList[nowQuizNumber].isBookmark = res.data.isBookmark;
            setIsDisabled(false);
          })
          .catch((err) => {
            setIsDisabled(false);
          });
      }
    }
  };

  const patchQuizResult = async () => {
    await axios
      .patch(
        `${process.env.REACT_APP_BASE_URL}/quiz/result`,
        {
          correctCount: answerCnt,
        },
        {
          headers: {
            accessToken: userAccessToken,
          },
        }
      )
      .then((res) => {
        const responseData = {
          answerCnt: answerCnt,
          diamond: res.data.diamond,
          expPoint: res.data.expPoint,
        };
        navigate('/result', { state: responseData });
      });
  };

  useEffect(() => {
    getQuiz();
  }, []);

  useEffect(() => {}, [nowQuizNumber]);

  return (
    <FadeInOut>
      <S.Container>
        <Modal
          {...modalData}
          isToggled={isToggled}
          setIsToggled={setIsToggled}
        />
        <QuizProgressBar questionCnt={10} gauge={(nowQuizNumber + 1) * 10} />
        {quizList ? (
          <QuestionBox
            quizId={quizList[nowQuizNumber].quizId}
            question={quizList[nowQuizNumber].question}
            content={quizList[nowQuizNumber].content}
            isMulti={quizList[nowQuizNumber].isMulti}
            isBookmark={quizList[nowQuizNumber].isBookmark}
            finiancialType={quizList[nowQuizNumber].finiancialType}
            caseNum={quizList[nowQuizNumber].caseNum}
            kind={quizList[nowQuizNumber].kind}
            questionNumber={nowQuizNumber + 1}
            answer={answer}
            setAnswer={setAnswer}
            isCorrect={isCorrect}
            isJudge={isJudge}
          />
        ) : (
          '퀴즈를 불러오는 중이에요'
        )}
        {isJudge ? (
          <S.ButtonContainer isJudge={true}>
            <Enlarge>
              <QuizButton
                title="그만풀기"
                kind="stop"
                disabled={isDisabled}
                handleClick={() => {
                  setIsToggled(true);
                  setModalData({
                    data: {
                      title: '😥',
                      message:
                        '문제를 그만 풀면 경험치를 얻을 수 없어요. 그래도 그만 푸시겠어요?',
                    },
                    yesBtnClick: () => {
                      setIsToggled(false);
                      navigate('/home');
                    },
                    noBtnClick: () => {
                      setIsToggled(false);
                    },
                  });
                }}
              />
            </Enlarge>
            <Enlarge>
              <QuizButton
                title="즐겨찾기"
                kind="favorite"
                handleClick={patchFavoriteQuiz}
                isBookmark={
                  quizList ? quizList[nowQuizNumber].isBookmark : false
                }
                disabled={isDisabled}
              />
            </Enlarge>
            {nowQuizNumber === 9 ? (
              <Enlarge>
                <QuizButton
                  title="결과보기"
                  kind="result"
                  handleClick={patchQuizResult}
                  disabled={isDisabled}
                />
              </Enlarge>
            ) : (
              <Enlarge>
                <QuizButton
                  title="다음문제"
                  kind="next"
                  handleClick={nextQuestion}
                  disabled={isDisabled}
                />
              </Enlarge>
            )}
          </S.ButtonContainer>
        ) : (
          <S.ButtonContainer isJudge={false}>
            <Enlarge>
              <QuizButton title="힌트보기" kind="hint" disabled={isDisabled} />
            </Enlarge>
            <Enlarge>
              <QuizButton
                title="정답보기"
                kind="answerCheck"
                handleClick={checkAnswer}
                disabled={isDisabled}
              />
            </Enlarge>
          </S.ButtonContainer>
        )}
      </S.Container>
    </FadeInOut>
  );
};

export default ShortAnswerQuestionPage;
