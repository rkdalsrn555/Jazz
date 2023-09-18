import React from 'react';
import MarathonResultIcon from '../../../../assets/svgs/Quiz/marathonResult.svg';
import { ReactComponent as DiamondIcon } from '../../../../assets/svgs/Quiz/diamondIcon.svg';
import ButtonBg from '../../../../assets/img/Quiz/ok_btn.png';
import * as S from './MarathonResult.styled';

type OwnProps = {
  correctNum: number;
  diamondCnt: number;
  exp: number;
};

const MarathonResult = (props: OwnProps) => {
  const { correctNum, diamondCnt, exp } = props;

  return (
    <S.MarathonContainer>
      <S.MarathonResultIcon src={MarathonResultIcon} />
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
        <S.OkBtn>
          <S.OkBtnTitle>끝내기</S.OkBtnTitle>
          <S.OkBtnBgImg src={ButtonBg} alt="버튼" />
        </S.OkBtn>
      </S.ResultBox>
    </S.MarathonContainer>
  );
};

export default MarathonResult;
