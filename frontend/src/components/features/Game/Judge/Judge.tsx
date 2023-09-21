import React from 'react';
import * as S from './Judge.styled';
import { ReactComponent as TrophyIcon } from '../../../../assets/svgs/Game/trophy.svg';
import { ReactComponent as DiamondIcon } from '../../../../assets/svgs/Game/diamondIcon.svg';

type OwnProps = {
  state: 'win' | 'lose' | 'draw';
};

const Judge = (props: OwnProps) => {
  const { state } = props;

  return (
    <S.JudgeContainer>
      <S.AwardContainer>
        {state === 'win' || state === 'draw' ? (
          <div className="award">
            <DiamondIcon />
            <p>{state === 'win' ? '+20' : '+5'}</p>
          </div>
        ) : (
          ''
        )}
        <div className="content">
          <p>{state.toUpperCase()}</p>
          {state === 'win' ? <TrophyIcon /> : ''}
          {state === 'lose' ? <p>😫</p> : ''}
          {state === 'draw' ? <p>😃</p> : ''}
        </div>
        <S.AcceptButton>홈으로 나가기</S.AcceptButton>
      </S.AwardContainer>
    </S.JudgeContainer>
  );
};

export default Judge;
