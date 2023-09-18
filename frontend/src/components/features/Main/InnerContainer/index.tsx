import { themeProps } from '@emotion/react';
import * as S from '../InnerContainer/Inner.styled';
import { btnProps, innerContainerProps } from 'types/types';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import Modify from 'assets/img/writing.png';
import Bell from 'assets/img/bell.png';
import Diamond from 'assets/img/diamond.png';

const Inner = (feature: innerContainerProps) => {
  const theme: themeProps = useTheme();

  const users = [
    {
      nickname: 'A',
      teer: 'Challenger1',
      solved: 357,
      rate: 82,
    },
    {
      nickname: 'A',
      teer: 'Challenger1',
      solved: 357,
      rate: 82,
    },
    {
      nickname: 'A',
      teer: 'Challenger1',
      solved: 357,
      rate: 82,
    },
    {
      nickname: 'A',
      teer: 'Challenger1',
      solved: 357,
      rate: 82,
    },
    {
      nickname: 'A',
      teer: 'Challenger1',
      solved: 357,
      rate: 82,
    },
    {
      nickname: 'A',
      teer: 'Challenger1',
      solved: 357,
      rate: 82,
    },
    {
      nickname: 'A',
      teer: 'Challenger1',
      solved: 357,
      rate: 82,
    },
    {
      nickname: 'A',
      teer: 'Challenger1',
      solved: 357,
      rate: 82,
    },
    {
      nickname: 'A',
      teer: 'Challenger1',
      solved: 357,
      rate: 82,
    },
    {
      nickname: 'A',
      teer: 'Challenger1',
      solved: 357,
      rate: 82,
    },
    {
      nickname: 'A',
      teer: 'Challenger1',
      solved: 357,
      rate: 82,
    },
    {
      nickname: 'A',
      teer: 'Challenger1',
      solved: 357,
      rate: 82,
    },
  ];

  const teerRank = () => {
    return (
      <S.RankContent>
        {users.map((e, i) => {
          return (
            <S.RankEach>
              <S.RankEachContent style={{ flex: 0.5 }}>
                {i + 1}
              </S.RankEachContent>
              <S.RankEachContent style={{ flex: 1.4 }}>
                {e.nickname}
              </S.RankEachContent>
              <S.RankEachContent style={{ flex: 0.8 }}>
                {e.teer}
              </S.RankEachContent>
              <S.RankEachContent style={{ flex: 1 }}>
                {e.solved}
              </S.RankEachContent>
              <S.RankEachContent style={{ flex: 0.8 }}>
                {e.rate}%
              </S.RankEachContent>
            </S.RankEach>
          );
        })}
      </S.RankContent>
    );
  };

  return (
    <S.Container feature={feature} theme={theme}>
      {feature.title === '프로필' ? (
        <S.ProfileHeaderContainer>
          <S.ProfileHeader>
            <S.Title>
              {feature.title}
              <Link to={'/home'}>
                <S.Img src={Modify} />
              </Link>
            </S.Title>
            <S.ProfileHeaderRight>
              <S.Img src={Bell} />
              <S.DiamondContainer>
                {/* 다이아개수 받아와서 넣어야 될 자리 */}
                150
                <S.Img
                  src={Diamond}
                  style={{ width: '1.4rem', height: '1.4rem' }}
                />
              </S.DiamondContainer>
            </S.ProfileHeaderRight>
          </S.ProfileHeader>
          <S.Line />
        </S.ProfileHeaderContainer>
      ) : feature.title === '랭크' ? (
        <S.RankHeaderContainer>
          <S.RankHeader>
            <S.RankHeaderUpper>
              <S.Title>{feature.title}</S.Title>
              <S.RankTimerContainer theme={theme}></S.RankTimerContainer>
            </S.RankHeaderUpper>
            <S.RankHeaderBottom>
              <S.RankSort>티어</S.RankSort>
              <S.RankSort>마라톤(일간)</S.RankSort>
              <S.RankSort>마라톤(월간)</S.RankSort>
              <S.RankSort>레벨</S.RankSort>
            </S.RankHeaderBottom>
          </S.RankHeader>
          <S.Line />
        </S.RankHeaderContainer>
      ) : (
        <S.Title>{feature.title}</S.Title>
      )}
      {feature.title === '랭크' ? (
        <S.RankOuterContainer theme={theme}>
          <S.RankContainerHeader>
            <S.RankTitle style={{ flex: 0.5 }}>순위</S.RankTitle>
            <S.RankTitle style={{ flex: 1.4 }}>닉네임</S.RankTitle>
            <S.RankTitle style={{ flex: 0.8 }}>티어</S.RankTitle>
            <S.RankTitle style={{ flex: 1 }}>푼 문제 수</S.RankTitle>
            <S.RankTitle style={{ flex: 0.8 }}>정답률</S.RankTitle>
          </S.RankContainerHeader>
          {teerRank()}
        </S.RankOuterContainer>
      ) : (
        <S.ContentContainer>{feature.content}</S.ContentContainer>
      )}
      <S.Blank />
    </S.Container>
  );
};

export default Inner;
