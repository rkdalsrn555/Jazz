import { themeProps } from '@emotion/react';
import * as S from './RankChart.styled';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { IsDark } from 'atoms/atoms';

const RankChart = ({
  selectedRank,
  theme,
}: {
  selectedRank: String;
  theme: themeProps;
}) => {
  const users = [
    {
      nickname: 'A',
      tier: 'Challenger1',
      solved: 357,
      rate: 82,
    },
    {
      nickname: 'A',
      tier: 'Challenger1',
      solved: 357,
      rate: 82,
    },
    {
      nickname: 'A',
      tier: 'Challenger1',
      solved: 357,
      rate: 82,
    },
    {
      nickname: 'A',
      tier: 'Challenger1',
      solved: 357,
      rate: 82,
    },
    {
      nickname: 'A',
      tier: 'Challenger1',
      solved: 357,
      rate: 82,
    },
    {
      nickname: 'A',
      tier: 'Challenger1',
      solved: 357,
      rate: 82,
    },
    {
      nickname: 'A',
      tier: 'Challenger1',
      solved: 357,
      rate: 82,
    },
    {
      nickname: 'A',
      tier: 'Challenger1',
      solved: 357,
      rate: 82,
    },
    {
      nickname: 'A',
      tier: 'Challenger1',
      solved: 357,
      rate: 82,
    },
    {
      nickname: 'A',
      tier: 'Challenger1',
      solved: 357,
      rate: 82,
    },
    {
      nickname: 'A',
      tier: 'Challenger1',
      solved: 357,
      rate: 82,
    },
    {
      nickname: 'A',
      tier: 'Challenger1',
      solved: 357,
      rate: 82,
    },
  ];

  const tierRank = () => {
    return users.map((e, i) => (
      <S.RankEach theme={theme}>
        <S.RankEachContent theme={theme} style={{ flex: 0.5 }}>
          {i + 1}
        </S.RankEachContent>
        <S.RankEachContent theme={theme} style={{ flex: 1.4 }}>
          {e.nickname}
        </S.RankEachContent>
        <S.RankEachContent theme={theme} style={{ flex: 0.8 }}>
          {e.tier}
        </S.RankEachContent>
        <S.RankEachContent theme={theme} style={{ flex: 1 }}>
          {e.solved}
        </S.RankEachContent>
        <S.RankEachContent theme={theme} style={{ flex: 0.8 }}>
          {e.rate}%
        </S.RankEachContent>
      </S.RankEach>
    ));
  };

  const dailyMarathon = () => {
    return users.map((e, i) => (
      <S.RankEach theme={theme}>
        <S.RankEachContent theme={theme} style={{ flex: 0.5 }}>
          {i + 5}
        </S.RankEachContent>
        <S.RankEachContent theme={theme} style={{ flex: 1.4 }}>
          {e.nickname}
        </S.RankEachContent>
        <S.RankEachContent theme={theme} style={{ flex: 0.8 }}>
          {e.tier}
        </S.RankEachContent>
        <S.RankEachContent theme={theme} style={{ flex: 1 }}>
          {e.solved}
        </S.RankEachContent>
        <S.RankEachContent theme={theme} style={{ flex: 0.8 }}>
          {e.rate}%
        </S.RankEachContent>
      </S.RankEach>
    ));
  };

  const monthlyMarathon = () => {
    return users.map((e, i) => (
      <S.RankEach theme={theme}>
        <S.RankEachContent theme={theme} style={{ flex: 0.5 }}>
          {i + 10}
        </S.RankEachContent>
        <S.RankEachContent theme={theme} style={{ flex: 1.4 }}>
          {e.nickname}
        </S.RankEachContent>
        <S.RankEachContent theme={theme} style={{ flex: 0.8 }}>
          {e.tier}
        </S.RankEachContent>
        <S.RankEachContent theme={theme} style={{ flex: 1 }}>
          {e.solved}
        </S.RankEachContent>
        <S.RankEachContent theme={theme} style={{ flex: 0.8 }}>
          {e.rate}%
        </S.RankEachContent>
      </S.RankEach>
    ));
  };

  const levelRank = () => {
    return users.map((e, i) => (
      <S.RankEach theme={theme}>
        <S.RankEachContent theme={theme} style={{ flex: 0.5 }}>
          {i + 15}
        </S.RankEachContent>
        <S.RankEachContent theme={theme} style={{ flex: 1.4 }}>
          {e.nickname}
        </S.RankEachContent>
        <S.RankEachContent theme={theme} style={{ flex: 0.8 }}>
          {e.tier}
        </S.RankEachContent>
        <S.RankEachContent theme={theme} style={{ flex: 1 }}>
          {e.solved}
        </S.RankEachContent>
        <S.RankEachContent theme={theme} style={{ flex: 0.8 }}>
          {e.rate}%
        </S.RankEachContent>
      </S.RankEach>
    ));
  };

  const [rankType, setRankType] = useState(tierRank());

  useEffect(() => {
    setInterval(() => setRankTypeCheck(!rankTypeCheck), 1000);
  });

  const [rankTypeCheck, setRankTypeCheck] = useState(true);

  useEffect(() => {
    switch (selectedRank) {
      case 'tier':
        setRankType(tierRank);
        break;
      case 'dailyMarathon':
        setRankType(dailyMarathon);
        break;
      case 'monthlyMarathon':
        setRankType(monthlyMarathon);
        break;
      case 'level':
        setRankType(levelRank);
        break;
    }
  }, [selectedRank, rankTypeCheck]);

  return (
    <S.RankOuterContainer theme={theme}>
      <S.RankContainerHeader>
        <S.RankTitle theme={theme} style={{ flex: 0.5 }}>
          순위
        </S.RankTitle>
        <S.RankTitle theme={theme} style={{ flex: 1.4 }}>
          닉네임
        </S.RankTitle>
        <S.RankTitle theme={theme} style={{ flex: 0.8 }}>
          티어
        </S.RankTitle>
        <S.RankTitle theme={theme} style={{ flex: 1 }}>
          푼 문제 수
        </S.RankTitle>
        <S.RankTitle theme={theme} style={{ flex: 0.8 }}>
          정답률
        </S.RankTitle>
      </S.RankContainerHeader>
      <S.RankContainerContent theme={theme}>{rankType}</S.RankContainerContent>
    </S.RankOuterContainer>
  );
};

export default RankChart;
