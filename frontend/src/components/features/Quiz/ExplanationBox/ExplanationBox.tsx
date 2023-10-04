import React from 'react';
import * as S from './ExplanationBox.styled';

type OwnProps = {
  result: boolean;
  correctContent?: string;
  correctExplanation?: string;
  wrongContent?: string | number;
  wrongExplanation?: string;
};

const ExplanationBox = (props: OwnProps) => {
  const {
    correctContent,
    correctExplanation,
    wrongContent,
    wrongExplanation,
    result,
  } = props;

  return (
    <>
      {result ? (
        <S.ExplanationContainer>
          <S.ExplanationTitle result={true}>
            <h1>{correctContent}</h1>
            <div className="label">정답</div>
          </S.ExplanationTitle>
          <p>{correctExplanation ?? '해당 문제는 해설이 없습니다'}</p>
        </S.ExplanationContainer>
      ) : (
        <div>
          <S.ExplanationContainer>
            <S.ExplanationTitle result={true}>
              <h1>{correctContent}</h1>
              <div className="label">정답</div>
            </S.ExplanationTitle>
            <p>{correctExplanation ?? '해당 문제는 해설이 없습니다'}</p>
          </S.ExplanationContainer>
          <S.ExplanationContainer>
            <S.ExplanationTitle result={false}>
              <h1>
                {wrongContent === 'undefined' || wrongContent === ''
                  ? '입력한 답안이 없어요'
                  : wrongContent}
              </h1>
              <div className="label">오답</div>
            </S.ExplanationTitle>
            <p>{wrongExplanation ?? '해당 답안은 해설이 없습니다'}</p>
          </S.ExplanationContainer>
        </div>
      )}
    </>
  );
};

export default ExplanationBox;
