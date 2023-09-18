import React from 'react';
import * as S from './ExplanationBox.styled';

type OwnProps = {
  title: string;
  content: string;
  result: boolean;
};

const ExplanationBox = (props: OwnProps) => {
  const { title, content, result } = props;

  return (
    <S.ExplanationContainer>
      <S.ExplanationTitle result={result}>
        <h1>{title}</h1>
        <div className="label">{result ? '정답' : '오답'}</div>
      </S.ExplanationTitle>
      <p>{content}</p>
    </S.ExplanationContainer>
  );
};

export default ExplanationBox;
