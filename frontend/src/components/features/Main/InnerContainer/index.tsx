import { themeProps } from '@emotion/react';
import * as S from '../InnerContainer/Inner.styled';
import { innerContainerProps } from 'types/types';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import Modify from 'assets/img/writing.png';
import Bell from 'assets/img/bell.png';
import Diamond from 'assets/img/diamond.png';
import { useEffect, useRef, useState } from 'react';

const Inner = (feature: innerContainerProps) => {
  const theme: themeProps = useTheme();

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
                {e.tier}
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

  const dailyMarathon = () => {
    return (
      <S.RankContent>
        {users.map((e, i) => {
          return (
            <S.RankEach>
              <S.RankEachContent style={{ flex: 0.5 }}>
                {i + 5}
              </S.RankEachContent>
              <S.RankEachContent style={{ flex: 1.4 }}>
                {e.nickname}
              </S.RankEachContent>
              <S.RankEachContent style={{ flex: 0.8 }}>
                {e.tier}
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

  const [rankType, setRankType] = useState(tierRank);

  const monthlyMarathon = () => {
    return (
      <S.RankContent>
        {users.map((e, i) => {
          return (
            <S.RankEach>
              <S.RankEachContent style={{ flex: 0.5 }}>
                {i + 10}
              </S.RankEachContent>
              <S.RankEachContent style={{ flex: 1.4 }}>
                {e.nickname}
              </S.RankEachContent>
              <S.RankEachContent style={{ flex: 0.8 }}>
                {e.tier}
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

  const levelRank = () => {
    return (
      <S.RankContent>
        {users.map((e, i) => {
          return (
            <S.RankEach>
              <S.RankEachContent style={{ flex: 0.5 }}>
                {i + 15}
              </S.RankEachContent>
              <S.RankEachContent style={{ flex: 1.4 }}>
                {e.nickname}
              </S.RankEachContent>
              <S.RankEachContent style={{ flex: 0.8 }}>
                {e.tier}
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

  const today = new Date();
  const day = today.getDay();

  const tierTimer = () => {
    // 일요일 저녁 12시를 기준으로 초기화 되게
    // 일요일은 day 가 0
    // dDay 먼저 계산
    let dayDiff = 7 - day;
    if (dayDiff === 7) {
      dayDiff = 0;
    }
    const dDay = new Date(today);
    dDay.setDate(today.getDate() + dayDiff);
    dDay.setHours(24);
    dDay.setMinutes(0);
    dDay.setSeconds(0);
    const now = new Date(today).getTime();
    const diff = dDay.getTime() - now;
    // 남은 날짜, 시간, 분, 초
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return (
      <S.TimerReturnContainer theme={theme}>
        <S.TimerTitle>티어 초기화까지</S.TimerTitle>
        <S.TimerContent>
          {days}일 {hours}시간 {minutes}분 {seconds}초
        </S.TimerContent>
      </S.TimerReturnContainer>
    );
  };

  const dmTimer = () => {
    const dDay = new Date(today);
    dDay.setDate(today.getDate() + 1);
    dDay.setHours(0);
    dDay.setMinutes(0);
    dDay.setSeconds(0);
    const now = new Date(today).getTime();
    const diff = dDay.getTime() - now;
    // 남은 시간, 분, 초
    let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return (
      <S.TimerReturnContainer theme={theme}>
        <S.TimerTitle>일간 마라톤 기록 초기화까지</S.TimerTitle>
        <S.TimerContent>
          {hours}시간 {minutes}분 {seconds}초
        </S.TimerContent>
      </S.TimerReturnContainer>
    );
  };

  const mmTimer = () => {
    const dDay = new Date(today);
    dDay.setMonth(today.getMonth() + 1);
    dDay.setDate(0);
    dDay.setHours(0);
    dDay.setMinutes(0);
    dDay.setSeconds(0);
    const now = new Date(today).getTime();
    const diff = dDay.getTime() - now;
    // 남은 시간, 분, 초
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return (
      <S.TimerReturnContainer theme={theme}>
        <S.TimerTitle>월간 마라톤 기록 초기화까지</S.TimerTitle>
        <S.TimerContent>
          {days}일 {hours}시간 {minutes}분 {seconds}초
        </S.TimerContent>
      </S.TimerReturnContainer>
    );
  };

  const [timeLeft, setTimeLeft] = useState(tierTimer());
  const [timerType, setTimerType] = useState('tier');

  useEffect(() => {
    const timeId = setInterval(() => tierTimer(), 1000);
    console.log('setInterval');
    if (timerType === 'tier') {
      setTimeLeft(tierTimer());
    } else if (timerType === 'dailyMarathon') {
      setTimeLeft(dmTimer());
    } else if (timerType === 'monthlyMarathon') {
      setTimeLeft(mmTimer());
    }
    return () => {
      clearInterval(timeId);
      console.log('clearInterval');
    };
  });
  const tierRef = useRef<HTMLButtonElement>(null);
  const dmRef = useRef<HTMLButtonElement>(null);
  const mmRef = useRef<HTMLButtonElement>(null);
  const levelRef = useRef<HTMLButtonElement>(null);
  const timerRef = useRef<HTMLDivElement>(null);

  const handleRankClick = (e: any) => {
    if (
      tierRef.current &&
      dmRef.current &&
      mmRef.current &&
      levelRef.current &&
      timerRef.current
    ) {
      tierRef.current.style.color = 'grey';
      dmRef.current.style.color = 'grey';
      mmRef.current.style.color = 'grey';
      levelRef.current.style.color = 'grey';
      setTimerType(e.target.id);
      switch (e.target.id) {
        case 'tier':
          setRankType(tierRank);
          tierRef.current.style.color = 'red';
          timerRef.current.style.display = 'flex';
          break;
        case 'dailyMarathon':
          setRankType(dailyMarathon);
          dmRef.current.style.color = 'red';
          timerRef.current.style.display = 'flex';
          break;
        case 'monthlyMarathon':
          setRankType(monthlyMarathon);
          mmRef.current.style.color = 'red';
          timerRef.current.style.display = 'flex';
          break;
        case 'level':
          setRankType(levelRank);
          levelRef.current.style.color = 'red';
          timerRef.current.style.display = 'none';
          break;
      }
    }
  };

  const handleRankOver = (e: any) => {
    if (tierRef.current && dmRef.current && mmRef.current && levelRef.current) {
      switch (e.target.id) {
        case 'tier':
          if (tierRef.current.style.color != 'red') {
            tierRef.current.style.color = 'darkgrey';
          }
          break;
        case 'dailyMarathon':
          if (dmRef.current.style.color != 'red') {
            dmRef.current.style.color = 'darkgrey';
          }
          break;
        case 'monthlyMarathon':
          if (mmRef.current.style.color != 'red') {
            mmRef.current.style.color = 'darkgrey';
          }
          break;
        case 'level':
          if (levelRef.current.style.color != 'red') {
            levelRef.current.style.color = 'darkgrey';
          }
          break;
      }
    }
  };

  const handleRankOut = (e: any) => {
    if (tierRef.current && dmRef.current && mmRef.current && levelRef.current) {
      switch (e.target.id) {
        case 'tier':
          if (tierRef.current.style.color != 'red') {
            tierRef.current.style.color = 'grey';
          }
          break;
        case 'dailyMarathon':
          if (dmRef.current.style.color != 'red') {
            dmRef.current.style.color = 'grey';
          }
          break;
        case 'monthlyMarathon':
          if (mmRef.current.style.color != 'red') {
            mmRef.current.style.color = 'grey';
          }
          break;
        case 'level':
          if (levelRef.current.style.color != 'red') {
            levelRef.current.style.color = 'grey';
          }
          break;
      }
    }
  };

  useEffect(() => {
    if (tierRef.current) tierRef.current.style.color = 'red';
  }, [tierRef]);

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
              <S.RankTimerContainer theme={theme} ref={timerRef}>
                {timeLeft}
              </S.RankTimerContainer>
            </S.RankHeaderUpper>
            <S.RankHeaderBottom>
              <S.RankSort
                onClick={(e) => handleRankClick(e)}
                onMouseOver={(e) => handleRankOver(e)}
                onMouseOut={(e) => handleRankOut(e)}
                id="tier"
                ref={tierRef}
              >
                티어
              </S.RankSort>
              <S.RankSort
                onClick={(e) => handleRankClick(e)}
                onMouseOver={(e) => handleRankOver(e)}
                onMouseOut={(e) => handleRankOut(e)}
                id="dailyMarathon"
                ref={dmRef}
              >
                마라톤(일간)
              </S.RankSort>
              <S.RankSort
                onClick={(e) => handleRankClick(e)}
                onMouseOver={(e) => handleRankOver(e)}
                onMouseOut={(e) => handleRankOut(e)}
                id="monthlyMarathon"
                ref={mmRef}
              >
                마라톤(월간)
              </S.RankSort>
              <S.RankSort
                onClick={(e) => handleRankClick(e)}
                onMouseOver={(e) => handleRankOver(e)}
                onMouseOut={(e) => handleRankOut(e)}
                id="level"
                ref={levelRef}
              >
                레벨
              </S.RankSort>
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
          {rankType}
        </S.RankOuterContainer>
      ) : (
        <S.ContentContainer>{feature.content}</S.ContentContainer>
      )}
      <S.Blank />
    </S.Container>
  );
};

export default Inner;
