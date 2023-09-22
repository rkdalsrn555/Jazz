import React, { useState, useEffect } from 'react';
import './QuizProgress.css';
import * as S from './QuizProgressBar.styled';
import { motion } from 'framer-motion';

type OwnProps = {
  questionCnt: number;
  gauge: number;
};

const QuizProgressBar = (props: OwnProps) => {
  const { questionCnt, gauge } = props;

  useEffect(() => {});

  return (
    <S.ProgressBarContainer>
      <motion.div
        className="bar"
        animate={{
          width: `${gauge}%`,
        }}
      ></motion.div>
      <S.ProgressBarText>{`${gauge / 10}/${questionCnt}`}</S.ProgressBarText>
    </S.ProgressBarContainer>
  );
};

export default QuizProgressBar;
