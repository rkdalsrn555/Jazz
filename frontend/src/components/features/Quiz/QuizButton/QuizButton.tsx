import React, { useEffect, useState } from 'react';
import * as S from './QuizButton.styled';
import { ReactComponent as HintIcon } from '../../../../assets/svgs/Quiz/bulb.svg';
import { ReactComponent as NextIcon } from '../../../../assets/svgs/Quiz/nextTriangle.svg';
import { ReactComponent as StopIcon } from '../../../../assets/svgs/Quiz/sadFace.svg';
import { ReactComponent as FavoriteIcon } from '../../../../assets/svgs/Quiz/star.svg';
import { ReactComponent as TrophyIcon } from '../../../../assets/svgs/Quiz/trophy.svg';

type QuizButtonProps = {
  kind: 'hint' | 'answerCheck' | 'stop' | 'next' | 'favorite' | 'result';
  title:
    | '힌트보기'
    | '정답보기'
    | '그만풀기'
    | '즐겨찾기'
    | '다음문제'
    | '결과보기'
    | '채점하기';
  handleClick?: () => void;
  isBookmark?: boolean | null;
  disabled: boolean;
};

const QuizButton = (props: QuizButtonProps) => {
  const { kind, title, handleClick, isBookmark, disabled } = props;

  useEffect(() => {}, [isBookmark]);

  return (
    <S.ButtonContainer
      kind={kind}
      onClick={() => {
        if (handleClick) {
          handleClick();
        }
      }}
      disabled={disabled}
    >
      {kind === 'hint' ? <HintIcon></HintIcon> : ''}
      {kind === 'answerCheck' ? <NextIcon></NextIcon> : ''}
      {kind === 'stop' ? <StopIcon></StopIcon> : ''}
      {kind === 'next' ? <NextIcon></NextIcon> : ''}
      {kind === 'result' ? <TrophyIcon></TrophyIcon> : ''}
      {kind === 'favorite' ? (
        <FavoriteIcon fill={isBookmark ? '#FFE812' : '#fff'}></FavoriteIcon>
      ) : (
        ''
      )}
      <S.ButtonTitle>{title}</S.ButtonTitle>
    </S.ButtonContainer>
  );
};

export default QuizButton;
