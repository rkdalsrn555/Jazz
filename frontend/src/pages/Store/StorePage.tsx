import { useEffect, useState } from 'react';
import * as S from './StorePage.styled';
import CharactorItem from 'components/features/Store/CharactorItem/CharactorItem';
import DiamondMoney from 'components/features/Store/DiamondMoney/DiamondMoney';
import SlotMachineBtn from 'components/features/Store/SlotMachineBtn/SlotMachineBtn';
import { userApis } from 'hooks/api/userApis';
import Modal from 'components/utils/Modal/Modal';

const StorePage = () => {
  const charactorName = ['동그리', '네모', '세모', '바위', '전사'];
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
        setNotOwnedCharactorList(res.data.data);
        setDiamond(res.data.diamond);
        setIsToggled(true);
        setModalData({
          data: {
            title: '😊',
            message: `축하합니다! ${
              charactorName[itemId - 1]
            }가 구매되었습니다!`,
          },
          yesBtnClick: () => {
            setIsToggled(false);
          },
        });
      })
      .catch((err) => {
        setIsToggled(true);
        setModalData({
          data: {
            title: '😜',
            message: `다이아가 모자라요, 문제를 풀고 다이아를 모아보세요`,
          },
          yesBtnClick: () => {
            setIsToggled(false);
          },
        });
      });
  };

  const clickBuyBtn = (itemId: number) => {
    setModalData({
      data: {
        title: '😊',
        message: `${charactorName[itemId - 1]}를 구매하시겠습니까?`,
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
          [1, 2, 3, 4, 5].map((el) => {
            if (
              notOwnedCharactorList.filter((item: any) => item.id === el)
                .length === 1
            ) {
              return (
                <CharactorItem
                  isBuy={false}
                  charactorNumber={el}
                  price={50}
                  key={el}
                  clickBuyBtn={() => {
                    setIsToggled(true);
                    clickBuyBtn(el);
                  }}
                />
              );
            } else {
              return (
                <CharactorItem
                  isBuy={true}
                  charactorNumber={el}
                  price={50}
                  key={el}
                  clickBuyBtn={() => {
                    setIsToggled(true);
                    clickBuyBtn(el);
                  }}
                />
              );
            }
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
