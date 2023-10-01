import React from 'react';
import * as S from './StorePage.styled';
import CharactorItem from 'components/features/Store/CharactorItem/CharactorItem';
import DiamondMoney from 'components/features/Store/DiamondMoney/DiamondMoney';
import SlotMachineBtn from 'components/features/Store/SlotMachineBtn/SlotMachineBtn';

const StorePage = () => {
  const notOwnedCharactor = [2, 3, 4, 5];

  return (
    <S.Container>
      <S.TitleContainer>
        <h1>캐릭터 상점</h1>
        <DiamondMoney diamond={500} />
      </S.TitleContainer>
      <S.CharactorContainer>
        {notOwnedCharactor.map((item) => (
          <CharactorItem charactorNumber={item} />
        ))}
      </S.CharactorContainer>
      <SlotMachineBtn />
    </S.Container>
  );
};

export default StorePage;
