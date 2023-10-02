import React, { useState } from 'react';
import * as S from './GameProfile.styled';
import { ReactComponent as BrokeHeartIcon } from '../../../../assets/svgs/Game/brokeHeart.svg';
import { ReactComponent as FullHeartIcon } from '../../../../assets/svgs/Game/fullHeart.svg';

type OwnProps = {
  heartCntProps: number;
  level: number;
  nickname: string;
  currentCharactor: 1 | 2 | 3 | 4 | 5;
};

const GameProfile = (props: OwnProps) => {
  const { heartCntProps, level, nickname, currentCharactor } = props;
  const [heartCnt, setHeartCnt] = useState<number>(heartCntProps);

  const DrawCharactor = (currentCharactor: number) => {
    let charactor = '';
    switch (currentCharactor) {
      case 1:
        charactor = 'circle.png';
        break;
      case 2:
        charactor = 'rectangle.png';
        break;
      case 3:
        charactor = 'triangle.png';
        break;
      case 4:
        charactor = 'rock.png';
        break;
      case 5:
        charactor = 'warrier.png';
        break;
    }
    return charactor;
  };

  return (
    <S.GameProfileContainerOut>
      <S.UserCharactorContainer>
        <img
          src={`/assets/img/modelAsset/${DrawCharactor(currentCharactor)}`}
          alt="유저캐릭터"
          width={200}
        />
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
              <FullHeartIcon key={i} width={35} />
            ) : (
              <BrokeHeartIcon key={i} width={35} />
            )
          )}
      </S.HeartGuageContainer>
    </S.GameProfileContainerOut>
  );
};

export default GameProfile;
