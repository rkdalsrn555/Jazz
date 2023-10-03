import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBeforeunload } from 'react-beforeunload';
import * as S from './ShortAnswerQuestionPage.styled';
import QuizProgressBar from 'components/features/Quiz/QuizProgressBar/QuizProgressBar';
import { QuestionBox } from 'components/features/Quiz/QuestionBox/QuestionBox';
import QuizButton from 'components/features/Quiz/QuizButton/QuizButton';
import { QuestionBoxProps } from 'types/types';
import Modal from 'components/utils/Modal/Modal';
import Enlarge from 'components/Effect/Enlarge/Enlarge';
import FadeInOut from 'components/Effect/FadeInOut/FadeInOut';
import { userApis } from 'hooks/api/userApis';

type MarathonResult = {
  quizId: number;
  isCorrect: boolean;
};

const MarathonPage = () => {
  useBeforeunload((event: any) => event.preventDefault()); // 새로고침 막기
  const navigate = useNavigate();
  const [quizList, setQuizList] = useState<QuestionBoxProps[] | null>(null); // 퀴즈 리스트 (1개)
  const [nowQuizNumber, setNowQuizNumber] = useState<number>(0); // 지금 문제 번호
  const [isJudge, setIsJudge] = useState<boolean>(false); // 정답 체크 중일때의 상태
  const [answerCnt, setAnswerCnt] = useState<number>(0); // 정답 개수 세기
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null); // 정답인지 아닌지 확인
  const [answer, setAnswer] = useState<string | number>(''); // 정답을 담는 상태
  const [isDisabled, setIsDisabled] = useState<boolean>(false); // 즐겨찾기 버튼 비활성화
  const [isToggled, setIsToggled] = useState<boolean>(false); // 모달 창 toggle
  // 정답일때의 설명
  const [correctAnswer, setCorrectAnswer] = useState<{
    correctContent: string;
    correctExplanation: string;
  } | null>(null);
  // 오답일때의 설명
  const [wrongAnswer, setWrongAnswer] = useState<{
    wrongContent: string;
    wrongExplanation: string;
  } | null>(null);
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
    getQuiz();
    setIsJudge(false);
    setNowQuizNumber((prev) => prev + 1);
    setIsCorrect(null);
    setAnswer('');
    setCorrectAnswer(null);
    setWrongAnswer(null);
  };

  const getExplanation = async (isCorrect: boolean, wrongAnswer?: string) => {
    if (isCorrect && quizList) {
      await userApis
        .get(`/quiz/explanation/correct-answer/${quizList[0].quizId}`)
        .then((res) => {
          setCorrectAnswer({
            correctContent: res.data.correctContent,
            correctExplanation: res.data.correctExplanation,
          });
        })
        .catch((err) => {});
    } else if (!isCorrect && quizList) {
      await userApis
        .get(
          `/quiz/explanation/wrong-answer/${quizList[0].quizId}?wrongContent=${wrongAnswer}`
        )
        .then((res) => {
          console.log(res.data);
          setCorrectAnswer({
            correctContent: res.data.correctContent,
            correctExplanation: res.data.correctExplanation,
          });
          setWrongAnswer({
            wrongContent: res.data.wrongContent,
            wrongExplanation: res.data.wrongExplanation,
          });
        })
        .catch((err) => {});
    }
  };

  const getQuiz = async () => {
    await userApis
      .get('/quiz/marathon')
      .then((res) => {
        setQuizList([res.data]);
        console.log([res.data]);
      })
      .catch((err) => {
        console.log('문제를 불러오지 못했어요');
      });
  };

  const patchFavoriteQuiz = async () => {
    setIsDisabled(true);
    if (quizList) {
      if (!quizList[0].isBookmark) {
        await userApis
          .patch(`/quiz/bookmark/registration`, {
            quizId: quizList[0].quizId,
            isBookmark: true,
          })
          .then((res) => {
            quizList[0].isBookmark = res.data.isBookmark;
            setIsDisabled(false);
          })
          .catch((err) => {
            setIsDisabled(false);
          });
      } else {
        await userApis
          .patch(`/quiz/bookmark/release`, {
            quizId: quizList[0].quizId,
            isBookmark: false,
          })
          .then((res) => {
            quizList[0].isBookmark = res.data.isBookmark;
            setIsDisabled(false);
          })
          .catch((err) => {
            setIsDisabled(false);
          });
      }
    }
  };

  const patchQuizResult = async () => {
    await userApis
      .patch(`/quiz/marathon/result`, {
        solveCount: answerCnt,
      })
      .then((res) => {
        const responseData = {
          correctNum: res.data.solveCount,
        };
        navigate('/marathon/result', { state: responseData });
      });
  };

  const checkAnswer = async () => {
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
        setIsCorrect(true);
        setAnswerCnt((prev) => prev + 1);
        if (quizList[0].kind !== 3) {
          await getExplanation(true);
        }
      } else {
        setIsCorrect(false);
        if (quizList[0].kind !== 3) {
          await getExplanation(false, String(ans));
        }
      }
      setIsJudge(true);
      if (quizList[0].content.length === 1) {
        setAnswer(quizList[0].content[0]);
      } else {
        setAnswer(Number(quizList[0].caseNum));
      }
    }
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
            correctContent={correctAnswer?.correctContent}
            correctExplanation={correctAnswer?.correctExplanation}
            wrongContent={wrongAnswer?.wrongContent}
            wrongExplanation={wrongAnswer?.wrongExplanation}
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
                isBookmark={quizList ? quizList[0].isBookmark : false}
                disabled={isDisabled}
              />
            </Enlarge>
            {!isCorrect ? (
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
              <QuizButton
                title="채점하기"
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

export default MarathonPage;
