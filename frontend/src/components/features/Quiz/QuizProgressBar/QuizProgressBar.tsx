import React, { useState } from 'react';
import './QuizProgress.css';
import * as S from './QuizProgressBar.styled';
import { motion } from 'framer-motion';

const QuizProgressBar = () => {
  const [value, setValue] = useState<number>(10);

  const handleClick = () => setValue(value + 10);

  return (
    <S.ProgressBarContainer>
      <motion.div
        className="bar"
        animate={{
          width: `${value}%`,
        }}
      ></motion.div>
      <S.ProgressBarText>{`${value / 10}/10`}</S.ProgressBarText>
      <button onClick={handleClick} style={{ marginTop: '100px' }}>
        버튼
      </button>
    </S.ProgressBarContainer>
  );
};

export default QuizProgressBar;
