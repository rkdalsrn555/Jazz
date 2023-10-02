import React, { useState, useEffect } from 'react';
import * as S from './ThreeCountDown.styled';

type OwnProps = {
  questionPub?: () => void;
  trigger: () => void;
  currentRound: number;
};

const ThreeCountDown = (props: OwnProps) => {
  const { questionPub, trigger, currentRound } = props;
  const [num, setNum] = useState<number>(3);

  useEffect(() => {
    if (num < 0) {
      if (questionPub) {
        questionPub();
        trigger();
        return;
      } else {
        trigger();
        return;
      }
    } else {
      const timer = setInterval(() => {
        setNum((prev) => prev - 1);
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [num]);

  return (
    <S.CountDownText>
      {num === 0 ? `round${currentRound} start!` : num}
    </S.CountDownText>
  );
};

export default ThreeCountDown;
