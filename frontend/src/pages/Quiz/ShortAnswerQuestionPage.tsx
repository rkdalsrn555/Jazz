import React, { useState, useEffect } from 'react';
import QuizProgressBar from 'components/features/Quiz/QuizProgressBar/QuizProgressBar';
import { QuestionBox } from 'components/features/Quiz/QuestionBox/QuestionBox';
import QuizButton from 'components/features/Quiz/QuizButton/QuizButton';
import * as S from './ShortAnswerQuestionPage.styled';
import axios from 'axios';
import { QuestionBoxProps } from 'types/types';
import { QuizData as mockData } from './QuizData';
import Enlarge from 'components/Effect/Enlarge/Enlarge';

const ShortAnswerQuestionPage = () => {
  // 지금 문제 번호
  const [nowQuizNumber, setNowQuizNumber] = useState<number>(1);
  // 퀴즈 리스트 (10개)
  const [quizList, setQuizList] = useState<QuestionBoxProps[] | null>(null);
  // 정답 체크중일때의 상태
  const [isJudge, setIsJudge] = useState<boolean>(false);
  // 다음 문제로 가는 함수
  const nextQuestion = () => setNowQuizNumber((prev) => prev + 1);

  const checkAnswer = () => setIsJudge(true);

  const getQuiz = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/quiz/2`, {
        headers: {
          accessToken: `${process.env.REACT_APP_ACCESS_TOKEN}`,
        },
      })
      .then((res) => {
        setQuizList(res.data);
      })
      .catch((err) => {
        console.log('문제를 불러오지 못했어요');
        setQuizList(mockData);
      });
  };

  useEffect(() => {
    getQuiz();
  }, []);

  return (
    <S.Container>
      <QuizProgressBar questionCnt={10} gauge={nowQuizNumber * 10} />
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
          questionNumber={nowQuizNumber}
        />
      ) : (
        '퀴즈를 불러오는 중이에요'
      )}
      {isJudge ? (
        <S.ButtonContainer isJudge={true}>
          <Enlarge>
            <QuizButton title="그만풀기" kind="stop" />
          </Enlarge>
          <Enlarge>
            <QuizButton title="즐겨찾기" kind="favorite" />
          </Enlarge>
          <Enlarge>
            <QuizButton title="다음문제" kind="next" />
          </Enlarge>
        </S.ButtonContainer>
      ) : (
        <S.ButtonContainer isJudge={false}>
          <Enlarge>
            <QuizButton title="힌트보기" kind="hint" />
          </Enlarge>
          <Enlarge>
            <QuizButton
              title="정답보기"
              kind="answerCheck"
              handleClick={checkAnswer}
            />
          </Enlarge>
        </S.ButtonContainer>
      )}
    </S.Container>
  );
};

export default ShortAnswerQuestionPage;
