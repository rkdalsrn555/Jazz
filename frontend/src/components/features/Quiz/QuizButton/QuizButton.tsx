import React, { useState } from 'react';
import * as S from './QuizButton.styled';
import { ReactComponent as HintIcon } from '../../../../assets/svgs/Quiz/bulb.svg';
import { ReactComponent as NextIcon } from '../../../../assets/svgs/Quiz/nextTriangle.svg';
import { ReactComponent as StopIcon } from '../../../../assets/svgs/Quiz/sadFace.svg';
import { ReactComponent as FavoriteIcon } from '../../../../assets/svgs/Quiz/star.svg';

type QuizButtonProps = {
  kind: 'hint' | 'answerCheck' | 'stop' | 'next' | 'favorite';
  title: '힌트보기' | '정답보기' | '그만풀기' | '즐겨찾기' | '다음문제';
};

const QuizButton = (props: QuizButtonProps) => {
  const { kind, title } = props;
  const [isClick, setIsClick] = useState<boolean>(false);

  const handleClick = () => setIsClick(!isClick);

  return (
    <S.ButtonContainer kind={kind} onClick={handleClick}>
      {kind === 'hint' ? <HintIcon></HintIcon> : ''}
      {kind === 'answerCheck' ? <NextIcon></NextIcon> : ''}
      {kind === 'stop' ? <StopIcon></StopIcon> : ''}
      {kind === 'next' ? <NextIcon></NextIcon> : ''}
      {kind === 'favorite' ? (
        <FavoriteIcon fill={isClick ? '#FFE812' : '#fff'}></FavoriteIcon>
      ) : (
        ''
      )}
      <S.ButtonTitle>{title}</S.ButtonTitle>
    </S.ButtonContainer>
  );
};

export default QuizButton;
