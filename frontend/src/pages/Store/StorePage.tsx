import { useEffect, useState } from 'react';
import * as S from './StorePage.styled';
import CharactorItem from 'components/features/Store/CharactorItem/CharactorItem';
import DiamondMoney from 'components/features/Store/DiamondMoney/DiamondMoney';
import SlotMachineBtn from 'components/features/Store/SlotMachineBtn/SlotMachineBtn';
import { userApis } from 'hooks/api/userApis';
import Modal from 'components/utils/Modal/Modal';

const StorePage = () => {
  const charactorName = ['동그리', '세모', '네모', '바위', '전사'];
  const [notOwnedCharactorList, setNotOwnedCharactorList] = useState([]);
  const [diamond, setDiamond] = useState<number>(0);
  const [isToggled, setIsToggled] = useState<boolean>(false); // 모달 창 toggle
  // 모달에 띄울 내용
  const [modalData, setModalData] = useState<{
    data: {
      title: string;
      message: string;
    };
    noBtnClick?: () => void | null;
    yesBtnClick?: () => void | null;
  }>({ data: { title: '', message: '' } });

  const getStoreList = async () => {
    await userApis.get(`/store`).then((res) => {
      setNotOwnedCharactorList(res.data.data);
      setDiamond(res.data.diamond);
    });
  };

  const buyCharactor = async (itemId: number) => {
    await userApis
      .patch(`/store/character/${itemId}`)
      .then((res) => {
        console.log('구매성공!');
      })
      .catch((err) => {
        console.log('구매실패! 다시 시도해보세요');
      });
  };

  const clickBuyBtn = (itemId: number) => {
    setModalData({
      data: {
        title: '😊',
        message: `${charactorName[itemId]}를 구매하시겠습니까?`,
      },
      yesBtnClick: () => {
        setIsToggled(false);
        buyCharactor(itemId);
      },
      noBtnClick: () => {
        setIsToggled(false);
      },
    });
  };

  useEffect(() => {
    getStoreList();
  }, []);

  return (
    <S.Container>
      <Modal {...modalData} isToggled={isToggled} setIsToggled={setIsToggled} />
      <S.TitleContainer>
        <h1>캐릭터 상점</h1>
        <DiamondMoney diamond={diamond ? diamond : 0} />
      </S.TitleContainer>
      <S.CharactorContainer>
        {notOwnedCharactorList ? (
          notOwnedCharactorList.map((item: any) => {
            // 내가 가진 리스트는 못사게 회색처리해야함!

            return (
              <CharactorItem
                charactorNumber={item.id}
                price={item.price}
                key={item.id}
                clickBuyBtn={() => {
                  setIsToggled(true);
                  clickBuyBtn(item.id);
                }}
              />
            );
          })
        ) : (
          <div>상점 리스트를 로딩중입니다</div>
        )}
      </S.CharactorContainer>
      <SlotMachineBtn />
    </S.Container>
  );
};

export default StorePage;
