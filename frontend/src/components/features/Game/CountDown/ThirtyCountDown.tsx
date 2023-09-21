import React, { useState, useEffect } from 'react';
import * as S from './ThirtyCountDown.styled';

type OwnProps = {
  startRound: () => void;
  endRound: () => void;
  isPlaying: boolean;
};

const ThirtyCountDown = (props: OwnProps) => {
  const { isPlaying, startRound, endRound } = props;
  const [num, setNum] = useState<number>(30);

  useEffect(() => {
    if (num <= 0) {
      return;
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
    <S.Container>
      <S.ShineContainer>
        <S.BlurShine color="#EB8145" right={0} bottom={0} />
        <S.BlurShine color="#1E99FE" left={0} bottom={0} />
        <S.BlurShine color="#EA245A" right={0} top={0} />
        <S.BlurShine color="#6A38F5" left={0} top={0} />
      </S.ShineContainer>
      <S.ThirtyCountDownContainer>
        <p>{num}</p>
      </S.ThirtyCountDownContainer>
    </S.Container>
  );
};

export default ThirtyCountDown;
