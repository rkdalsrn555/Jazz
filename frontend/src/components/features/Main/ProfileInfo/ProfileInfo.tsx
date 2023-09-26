import styled from '@emotion/styled';
import * as S from './ProfileInfo.styled';
import { profileBlockInfoProps, userType } from 'types/types';

const ProfileInfo = ({ user }: { user: userType }) => {
  return (
    <S.OuterContainer>
      <S.Block style={{ boxShadow: '0px 0px 5px 1.5px #ff7e7e8f' }}>
        <S.BlockTitle>마라톤</S.BlockTitle>
        <S.BlockContent>{user.marathonOneDay}</S.BlockContent>
      </S.Block>
      {/* <S.Block style={{ boxShadow: '0px 0px 5px 1.5px #7eff898f' }}>
        <S.BlockTitle>정답률</S.BlockTitle>
        <S.BlockContent>{user.winningPercentage}%</S.BlockContent>
      </S.Block> */}
      <S.Block style={{ boxShadow: '0px 0px 5px 1.5px #7e82ff8f' }}>
        <S.BlockTitle>푼 문제 수</S.BlockTitle>
        <S.BlockContent>{user.collectQuizRecord}</S.BlockContent>
      </S.Block>
      {/* <S.Block style={{ boxShadow: '0px 0px 5px 1.5px #fffb7e8f' }}>
        <S.BlockTitle>즐겨찾기</S.BlockTitle>
        <S.BlockContent>{user.rank}</S.BlockContent>
      </S.Block> */}
    </S.OuterContainer>
  );
};

export default ProfileInfo;
