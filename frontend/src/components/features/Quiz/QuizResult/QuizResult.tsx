import React from 'react';
import * as S from './QuizResult.styled';
import conguratulationIcon from '../../../../assets/img/Quiz/conguratulation.png';
import shineBg from '../../../../assets/img/Quiz/shine.png';

type OwnProps = {
  correctNum: number;
};

const QuizResult = (props: OwnProps) => {
  const { correctNum } = props;

  return (
    <S.ResultContainer>
      <img
        src={conguratulationIcon}
        alt="축하합니다!"
        style={{ paddingBottom: '60px' }}
      />
      <S.QuizResultContainer>
        <S.QuizResultContent>연속으로</S.QuizResultContent>
        <S.QuizResultTitle>
          <p>{correctNum}</p>
          <img src={shineBg} alt="빛나는 배경" />
        </S.QuizResultTitle>
        <S.QuizResultContent>문제를 맞추셨습니다!</S.QuizResultContent>
      </S.QuizResultContainer>
    </S.ResultContainer>
  );
};

export default QuizResult;
