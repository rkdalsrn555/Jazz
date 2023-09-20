import React, { useState, useEffect } from 'react';
import * as S from './BattleGame.styled';
import GameProfile from 'components/features/Game/GameProfile/GameProfile';
import ThreeCountDown from 'components/features/Game/CountDown/ThreeCountDown';
import ThirtyCountDown from 'components/features/Game/CountDown/ThirtyCountDown';

const BattleGame = () => {
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
          charactor="circle.png"
        />
        <S.BattleBoard>전투</S.BattleBoard>
        <GameProfile
          heartCntProps={5}
          level={15}
          nickname="재린이"
          charactor="circle.png"
        />
      </S.BattleContainer>
    </S.Container>
  );
};

export default BattleGame;
