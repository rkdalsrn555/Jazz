import React from 'react';
import * as S from './Judge.styled';
import { useNavigate } from 'react-router';
import { ReactComponent as TrophyIcon } from '../../../../assets/svgs/Game/trophy.svg';
import { ReactComponent as DiamondIcon } from '../../../../assets/svgs/Game/diamondIcon.svg';
import Enlarge from 'components/Effect/Enlarge/Enlarge';

type OwnProps = {
  state: 'win' | 'lose' | 'draw' | '';
};

const Judge = (props: OwnProps) => {
  const { state } = props;
  const navigate = useNavigate();

  return (
    <S.JudgeContainer>
      <S.AwardContainer>
        {state === '' ? (
          <p>결과를 불러오는 중이에요</p>
        ) : (
          <>
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
              {state === 'win' ? <TrophyIcon width={50} /> : ''}
              {state === 'lose' ? <p>😫</p> : ''}
              {state === 'draw' ? <p>😃</p> : ''}
            </div>
          </>
        )}
        <Enlarge>
          <S.AcceptButton
            onClick={() => {
              navigate('/home');
            }}
          >
            홈으로 나가기
          </S.AcceptButton>
        </Enlarge>
      </S.AwardContainer>
    </S.JudgeContainer>
  );
};

export default Judge;
