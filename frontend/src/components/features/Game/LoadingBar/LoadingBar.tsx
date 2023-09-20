import React from 'react';
import * as S from './LoadingBar.styled';

const LoadingBar = () => {
  return (
    <S.Container>
      <p>1 : 1 매칭 상대를 찾는 중입니다...</p>
      <S.barContainer>
        <S.shineBar></S.shineBar>
      </S.barContainer>
    </S.Container>
  );
};

export default LoadingBar;
