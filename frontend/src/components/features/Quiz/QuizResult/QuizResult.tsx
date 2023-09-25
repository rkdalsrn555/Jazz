import React from 'react';
import QuizResultIcon from '../../../../assets/svgs/Quiz/marathonResult.svg';
import { ReactComponent as DiamondIcon } from '../../../../assets/svgs/Quiz/diamondIcon.svg';
import ButtonBg from '../../../../assets/img/Quiz/ok_btn.png';
import * as S from './QuizResult.styled';
import Enlarge from 'components/Effect/Enlarge/Enlarge';
import FadeInOut from 'components/Effect/FadeInOut/FadeInOut';
import { useNavigate } from 'react-router-dom';

type OwnProps = {
  correctNum: number;
  diamondCnt: number;
  exp: number;
};

const QuizResult = (props: OwnProps) => {
  const { correctNum, diamondCnt, exp } = props;
  const navigate = useNavigate();

  return (
    <FadeInOut>
      <S.QuizContainer>
        <S.QuizResultIcon src={QuizResultIcon} />
        <S.ResultBox>
          <S.AwardTitle style={{ marginTop: '40px' }}>결과</S.AwardTitle>
          <S.AwardBox>
            <S.AwardBoxLi>{correctNum}/10</S.AwardBoxLi>
          </S.AwardBox>
          <S.AwardTitle>보상</S.AwardTitle>
          <S.AwardBox>
            <S.AwardBoxLi>
              <DiamondIcon />
              {`+${diamondCnt}`}
            </S.AwardBoxLi>
            <S.AwardBoxLi>
              <span style={{ color: 'black' }}>EXP</span> +{exp}
            </S.AwardBoxLi>
          </S.AwardBox>
          <Enlarge>
            <S.OkBtn
              onClick={() => {
                navigate('/home');
              }}
            >
              <S.OkBtnTitle>끝내기</S.OkBtnTitle>
              <S.OkBtnBgImg src={ButtonBg} alt="버튼" />
            </S.OkBtn>
          </Enlarge>
        </S.ResultBox>
      </S.QuizContainer>
    </FadeInOut>
  );
};

export default QuizResult;
