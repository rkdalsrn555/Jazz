import React, { useEffect } from 'react';
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
      {kind === 'hint' ? <HintIcon width={60} /> : ''}
      {kind === 'answerCheck' ? <NextIcon width={60} /> : ''}
      {kind === 'stop' ? <StopIcon width={70} /> : ''}
      {kind === 'next' ? <NextIcon width={60} /> : ''}
      {kind === 'result' ? <TrophyIcon width={60} /> : ''}
      {kind === 'favorite' ? (
        <FavoriteIcon fill={isBookmark ? '#FFE812' : '#fff'} width={60} />
      ) : (
        ''
      )}
      <S.ButtonTitle>{title}</S.ButtonTitle>
    </S.ButtonContainer>
  );
};

export default QuizButton;
