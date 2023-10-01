import React from 'react';
import * as S from './CharactorItem.styled';
import { ReactComponent as DiamondIcon } from '../../../../assets/svgs/Game/diamondIcon.svg';
import Enlarge from 'components/Effect/Enlarge/Enlarge';

type OwnProps = {
  charactorNumber: number;
};

const CharactorItem = (props: OwnProps) => {
  const { charactorNumber } = props;

  const DrawCharactor = (charactorNumber: number) => {
    let charactor = '';
    let charactorName = '';
    switch (charactorNumber) {
      case 1:
        charactor = 'circle.png';
        charactorName = '동그리';
        break;
      case 2:
        charactor = 'rectangle.png';
        charactorName = '네모';
        break;
      case 3:
        charactor = 'triangle.png';
        charactorName = '세모';
        break;
      case 4:
        charactor = 'rock.png';
        charactorName = '바위';
        break;
      case 5:
        charactor = 'warrier.png';
        charactorName = '전사';
        break;
    }
    return { charactor, charactorName };
  };

  return (
    <S.Container>
      <S.UserCharactorContainer>
        <img
          src={`/assets/img/modelAsset/${
            DrawCharactor(charactorNumber).charactor
          }`}
          alt="유저캐릭터"
          width={200}
        />
        <h1>{DrawCharactor(charactorNumber).charactorName}</h1>
        <S.Diamond>
          <p>1000</p>
          <DiamondIcon width={20} height={20} />
        </S.Diamond>
        <Enlarge>
          <S.SellBtn>구매하기</S.SellBtn>
        </Enlarge>
      </S.UserCharactorContainer>
    </S.Container>
  );
};

export default CharactorItem;
