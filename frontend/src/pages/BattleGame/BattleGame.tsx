import React, { useState, useEffect } from 'react';
import { useBeforeunload } from 'react-beforeunload';
import * as S from './BattleGame.styled';
import GameProfile from 'components/features/Game/GameProfile/GameProfile';
import ThreeCountDown from 'components/features/Game/CountDown/ThreeCountDown';
import ThirtyCountDown from 'components/features/Game/CountDown/ThirtyCountDown';

type Me = {
  nickname: string;
  level: number;
  heartCnt: number;
  charactor: number;
};

type UserGameInfo = {
  gameRound: number;
  me: {};
  other: {};
};

const BattleGame = () => {
  useBeforeunload((event: any) => event.preventDefault()); // 새로고침 막기

  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  const startRound = () => setIsPlaying(true);
  const endRound = () => setIsPlaying(false);

  return (
    <S.Container>
      <ThirtyCountDown
        isPlaying={isPlaying}
        startRound={startRound}
        endRound={endRound}
      />
      <S.BattleContainer>
        <GameProfile
          heartCntProps={5}
          level={15}
          nickname="재린이"
          charactorNumber={1}
        />
        <S.BattleBoard>전투</S.BattleBoard>
        <GameProfile
          heartCntProps={5}
          level={15}
          nickname="재린이"
          charactorNumber={1}
        />
      </S.BattleContainer>
    </S.Container>
  );
};

export default BattleGame;
