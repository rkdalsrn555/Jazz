import React, { useEffect, useRef } from 'react';
import * as S from './QuizProgressBar.styled';
import { motion, animate } from 'framer-motion';

const QuizProgressBar = ({ value }: { value: number }) => {
  return (
    <S.ProgressBarContainer>
      <S.ProgressBarGauge gaugeStatus={50}>
        <motion.div
          className="bar"
          animate={{ width: `${value}%` }}
          transition={{ duration: 2 }}
        ></motion.div>
      </S.ProgressBarGauge>
      <S.ProgressBarText>{`${5}/10`}</S.ProgressBarText>
    </S.ProgressBarContainer>
  );
};

export default QuizProgressBar;
