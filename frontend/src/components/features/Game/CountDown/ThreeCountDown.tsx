import React, { useState, useEffect } from 'react';
import * as S from './ThreeCountDown.styled';

const ThreeCountDown = () => {
  const [num, setNum] = useState<number>(3);

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

  return <S.CountDownText>{num === 0 ? 'round start!' : num}</S.CountDownText>;
};

export default ThreeCountDown;
