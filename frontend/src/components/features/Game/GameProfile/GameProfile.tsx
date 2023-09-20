import React, { useState } from 'react';
import * as S from './GameProfile.styled';
import { ReactComponent as BrokeHeartIcon } from '../../../../assets/svgs/Game/brokeHeart.svg';
import { ReactComponent as FullHeartIcon } from '../../../../assets/svgs/Game/fullHeart.svg';

type OwnProps = {
  heartCntProps: number;
  level: number;
  nickname: string;
  charactor: string;
};

const GameProfile = (props: OwnProps) => {
  const { heartCntProps, level, nickname, charactor } = props;
  const [heartCnt, setHeartCnt] = useState<number>(heartCntProps);

  return (
    <S.GameProfileContainerOut>
      <S.UserCharactorContainer>
        <img src={`/assets/img/modelAsset/${charactor}`} alt="유저캐릭터" />
      </S.UserCharactorContainer>
      <S.UserContentContainer>
        <h2>Lv. {level}</h2>
        <h3>{nickname}</h3>
      </S.UserContentContainer>
      <S.HeartGuageContainer>
        {Array(5)
          .fill(0)
          .map((_, i) =>
            i < heartCnt ? (
              <FullHeartIcon key={i} />
            ) : (
              <BrokeHeartIcon key={i} />
            )
          )}
      </S.HeartGuageContainer>
    </S.GameProfileContainerOut>
  );
};

export default GameProfile;
