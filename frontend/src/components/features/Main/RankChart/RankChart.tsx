import { themeProps } from '@emotion/react';
import * as S from './RankChart.styled';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { IsDark } from 'atoms/atoms';
import { RankingType, userType } from 'types/types';
import { userApis } from 'hooks/api/userApis';

const RankChart = ({
  selectedRank,
  theme,
}: {
  selectedRank: String;
  theme: themeProps;
}) => {
  const userToken = localStorage.getItem('userAccessToken');

  const [tierRankers, setTierRankers] = useState<RankingType[]>([]);
  const [mmRankers, setMmRankers] = useState<RankingType[]>([]);
  const [dmRankers, setDmRankers] = useState<RankingType[]>([]);
  const [levelRankers, setLevelRankers] = useState<RankingType[]>([]);

  const apis: string[] = [
    `/ranking/tier`,
    `/ranking/monthly/marathon`,
    `/ranking/daily/marathon`,
    `/ranking/level`,
  ];

  const orders = [
    function (response: RankingType[]) {
      setTierRankers(response);
    },
    function (response: RankingType[]) {
      setMmRankers(response);
    },
    function (response: RankingType[]) {
      setDmRankers(response);
    },
    function (response: RankingType[]) {
      setLevelRankers(response);
    },
  ];

  useEffect(() => {
    for (let i = 0; i < apis.length; i++) {
      userApis
        .get(apis[i])
        .then((res: any) => {
          orders[i](res.data);
        })
        .catch((err) => {});
    }
  }, [userToken]);

  useEffect(() => {
    setInterval(() => setRankTypeCheck(!rankTypeCheck), 1000);
  });

  const [rankTypeCheck, setRankTypeCheck] = useState(true);

  useEffect(() => {
    switch (selectedRank) {
      case 'tier':
        setRankType(tierRankers);
        break;
      case 'dailyMarathon':
        setRankType(dmRankers);
        break;
      case 'monthlyMarathon':
        setRankType(mmRankers);
        break;
      case 'level':
        setRankType(levelRankers);
        break;
    }
  }, [selectedRank, rankTypeCheck]);

  const [rankType, setRankType] = useState(tierRankers);

  const Rank = () => {
    return rankType.map((e, i) => (
      <S.RankEach theme={theme}>
        <S.RankEachContent theme={theme} style={{ flex: 0.6 }}>
          {i + 1}
        </S.RankEachContent>
        <S.RankEachContent theme={theme} style={{ flex: 1.4 }}>
          {e.nickname}
        </S.RankEachContent>
        <S.RankEachContent theme={theme} style={{ flex: 0.7 }}>
          {e.level}
        </S.RankEachContent>
        <S.RankEachContent theme={theme} style={{ flex: 1 }}>
          {e.rank}
        </S.RankEachContent>
        <S.RankEachContent theme={theme} style={{ flex: 0.8 }}>
          {e.winRate}%
        </S.RankEachContent>
        <S.RankEachContent theme={theme} style={{ flex: 0.8 }}>
          {e.quizRecord}
        </S.RankEachContent>
      </S.RankEach>
    ));
  };

  const [renderingRank, setRenderingRank] = useState(Rank());

  useEffect(() => {
    setRenderingRank(Rank());
  }, [rankType]);

  return (
    <S.RankOuterContainer theme={theme}>
      <S.RankContainerHeader>
        <S.RankTitle theme={theme} style={{ flex: 0.5 }}>
          순위
        </S.RankTitle>
        <S.RankTitle theme={theme} style={{ flex: 1.4 }}>
          닉네임
        </S.RankTitle>
        <S.RankTitle theme={theme} style={{ flex: 0.7 }}>
          레벨
        </S.RankTitle>
        <S.RankTitle theme={theme} style={{ flex: 1 }}>
          티어
        </S.RankTitle>
        <S.RankTitle theme={theme} style={{ flex: 0.8 }}>
          승률
        </S.RankTitle>
        <S.RankTitle theme={theme} style={{ flex: 0.8 }}>
          {selectedRank === 'monthlyMarathon' ? '월간 기록' : '일간 기록'}
        </S.RankTitle>
      </S.RankContainerHeader>
      <S.RankContainerContent theme={theme}>
        {renderingRank}
      </S.RankContainerContent>
    </S.RankOuterContainer>
  );
};

export default RankChart;
