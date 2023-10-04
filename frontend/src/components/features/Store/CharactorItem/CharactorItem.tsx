import React from 'react';
import * as S from './CharactorItem.styled';
import { ReactComponent as DiamondIcon } from '../../../../assets/svgs/Game/diamondIcon.svg';
import Enlarge from 'components/Effect/Enlarge/Enlarge';
import SoldOutIcon from '../../../../assets/img/Store/soldOutIcon.png';

type OwnProps = {
  charactorNumber: number;
  price: number;
  clickBuyBtn: () => void;
  isBuy: boolean;
};

const CharactorItem = (props: OwnProps) => {
  const { charactorNumber, price, clickBuyBtn, isBuy } = props;

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
    <>
      {isBuy ? (
        <S.Container>
          <S.SoldOutCharactor>
            <img src={SoldOutIcon} alt="품절" className="soldOut" />
            <img
              src={`/assets/img/modelAsset/${
                DrawCharactor(charactorNumber).charactor
              }`}
              alt="유저캐릭터"
              width={200}
            />
            <h1>{DrawCharactor(charactorNumber).charactorName}</h1>
            <S.Diamond>
              <p>{price}</p>
              <DiamondIcon width={20} height={20} />
            </S.Diamond>
            <S.SellBtn isBuy={isBuy}>구매하기</S.SellBtn>
          </S.SoldOutCharactor>
        </S.Container>
      ) : (
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
              <p>{price}</p>
              <DiamondIcon width={20} height={20} />
            </S.Diamond>
            <Enlarge>
              <S.SellBtn isBuy={isBuy} onClick={clickBuyBtn}>
                구매하기
              </S.SellBtn>
            </Enlarge>
          </S.UserCharactorContainer>
        </S.Container>
      )}
    </>
  );
};

export default CharactorItem;
