import styled from '@emotion/styled';
import * as S from './ProfileInfo.styled';
import { profileBlockInfoProps } from 'types/types';

const ProfileInfo = (info: profileBlockInfoProps) => {
  return (
    <S.OuterContainer>
      <S.Block style={{ boxShadow: '0px 0px 5px 1.5px #ff7e7e8f' }}>
        <S.BlockTitle>마라톤</S.BlockTitle>
        <S.BlockContent>{info.marathon}</S.BlockContent>
      </S.Block>
      <S.Block style={{ boxShadow: '0px 0px 5px 1.5px #7eff898f' }}>
        <S.BlockTitle>정답률</S.BlockTitle>
        <S.BlockContent>{info.correctRate}%</S.BlockContent>
      </S.Block>
      <S.Block style={{ boxShadow: '0px 0px 5px 1.5px #7e82ff8f' }}>
        <S.BlockTitle>푼 문제 수</S.BlockTitle>
        <S.BlockContent>{info.solved}</S.BlockContent>
      </S.Block>
      <S.Block style={{ boxShadow: '0px 0px 5px 1.5px #fffb7e8f' }}>
        <S.BlockTitle>즐겨찾기</S.BlockTitle>
        <S.BlockContent>{info.favorite}</S.BlockContent>
      </S.Block>
    </S.OuterContainer>
  );
};

export default ProfileInfo;
