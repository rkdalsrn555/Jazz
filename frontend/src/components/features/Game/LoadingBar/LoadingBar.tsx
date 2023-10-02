import React from 'react';
import * as S from './LoadingBar.styled';

const LoadingBar = ({ content }: { content: string }) => {
  return (
    <S.Container>
      <p>{content}</p>
      <S.barContainer>
        <S.shineBar></S.shineBar>
      </S.barContainer>
    </S.Container>
  );
};

export default LoadingBar;
