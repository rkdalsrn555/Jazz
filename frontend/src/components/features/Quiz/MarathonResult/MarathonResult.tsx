import React from 'react';
import * as S from './MarathonResult.styled';
import conguratulationIcon from '../../../../assets/img/Quiz/conguratulation.png';
import shineBg from '../../../../assets/img/Quiz/shine.png';

type OwnProps = {
  correctNum: number;
};

const MarathonResult = (props: OwnProps) => {
  const { correctNum } = props;

  return (
    <S.ResultContainer>
      <img
        src={conguratulationIcon}
        alt="축하합니다!"
        style={{ paddingBottom: '3%' }}
        width={400}
      />
      <S.MarathonResultContainer>
        <S.MarathonResultContent>연속으로</S.MarathonResultContent>
        <S.MarathonResultTitle>
          <p>{correctNum}</p>
          <img src={shineBg} alt="빛나는 배경" width={280} />
        </S.MarathonResultTitle>
        <S.MarathonResultContent>문제를 맞추셨습니다!</S.MarathonResultContent>
      </S.MarathonResultContainer>
    </S.ResultContainer>
  );
};

export default MarathonResult;
