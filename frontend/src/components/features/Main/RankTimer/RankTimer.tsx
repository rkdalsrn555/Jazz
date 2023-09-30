import { themeProps } from '@emotion/react';
import * as S from './RankTimer.styled';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const RankTimer = ({ timerType }: { timerType: String }) => {
  const theme: themeProps = useTheme();
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
    dDay.setDate(1);
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
  const [timerCheck, setTimerCheck] = useState(true);
  useEffect(() => {
    switch (timerType) {
      case 'tier':
        setTimeLeft(tierTimer());
        break;
      case 'dailyMarathon':
        setTimeLeft(dmTimer());
        break;
      case 'monthlyMarathon':
        setTimeLeft(mmTimer());
        break;
    }
  }, [timerType]);
  // 랜더링 후 1초마다 timerCheck(boolean값)를 반대값으로 설정
  useEffect(() => {
    setInterval(() => setTimerCheck(!timerCheck), 1000);
  });
  // 1초마다 timerCheck값이 바뀔때마다 timer를 변경
  useEffect(() => {
    if (timerType === 'tier') {
      setTimeLeft(tierTimer());
    } else if (timerType === 'dailyMarathon') {
      setTimeLeft(dmTimer());
    } else if (timerType === 'monthlyMarathon') {
      setTimeLeft(mmTimer());
    }
  }, [timerCheck]);

  return <S.Container>{timeLeft}</S.Container>;
};

export default RankTimer;
