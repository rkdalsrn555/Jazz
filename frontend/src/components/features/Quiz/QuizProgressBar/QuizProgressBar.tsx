import React, { useEffect } from 'react';
import './QuizProgress.css';
import * as S from './QuizProgressBar.styled';
import { motion } from 'framer-motion';

type OwnProps = {
  questionCnt: number;
  gauge: number;
  nowQuestionNumber: number;
};

const QuizProgressBar = (props: OwnProps) => {
  const { questionCnt, gauge, nowQuestionNumber } = props;

  useEffect(() => {});

  return (
    <S.ProgressBarContainer>
      <motion.div
        className="bar"
        animate={{
          width: `${gauge}%`,
        }}
      ></motion.div>
      <S.ProgressBarText>{`${nowQuestionNumber}/${questionCnt}`}</S.ProgressBarText>
    </S.ProgressBarContainer>
  );
};

export default QuizProgressBar;
