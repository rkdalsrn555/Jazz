import React, { useState, useEffect } from 'react';
import QuizProgressBar from 'components/features/Quiz/QuizProgressBar/QuizProgressBar';
import { QuestionBox } from 'components/features/Quiz/QuestionBox/QuestionBox';
import * as S from './ShortAnswerQuestionPage.styled';
import axios from 'axios';
import { QuestionBoxProps } from 'types/types';
import { QuizData as mockData } from './QuizData';

const ShortAnswerQuestionPage = () => {
  const [gauge, setGauge] = useState<number>(10);
  const [nowQuizNumber, setNowQuizNumber] = useState<number>(0);
  const [quizList, setQuizList] = useState<QuestionBoxProps[] | null>(null);
  const handleClick = () => setGauge((prev) => prev + 10);

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
      <QuizProgressBar questionCnt={10} gauge={gauge} />
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
    </S.Container>
  );
};

export default ShortAnswerQuestionPage;
