import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FavoriteRandomQuizButton from 'components/features/Favorite/FavoriteRandomQuizButton/FavoriteRandomQuizButton';
import FavoriteTabMenu from 'components/features/Favorite/FavoriteTabMenu/FavoriteTabMenu';
import { userApis } from 'hooks/api/userApis';
import * as S from './FavoritePage.styled';
import Modal from 'components/utils/Modal/Modal';

type Content = {
  quizId: number;
  question: string;
  content: string;
  kind: number;
  isBookmark: boolean;
};

type Menu = {
  name: string;
  content: Content[];
};

const FavoritePage = () => {
  const navigate = useNavigate();
  const [isToggled, setIsToggled] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const handleClick = () =>
    isDisabled ? setIsToggled(true) : navigate('/favorite/random-quiz');

  const [menuArr, setMenuArr] = useState<Menu[]>([
    { name: '단어형 주관식', content: [] },
    { name: '단어형 객관식', content: [] },
    { name: '사례형 객관식', content: [] },
  ]);

  const getFavoriteList = async () => {
    userApis.get(`/bookmark`).then((res) => {
      res.data.length === 0 ? setIsDisabled(true) : setIsDisabled(false);
      setMenuArr([
        {
          name: '단어형 주관식',
          content: [...res.data.filter((item: Content) => item.kind === 1)],
        },
        {
          name: '단어형 객관식',
          content: [...res.data.filter((item: Content) => item.kind === 2)],
        },
        {
          name: '사례형 객관식',
          content: [...res.data.filter((item: Content) => item.kind === 3)],
        },
      ]);
    });
  };

  useEffect(() => {
    getFavoriteList();
  }, []);

  return (
    <div>
      <Modal
        isToggled={isToggled}
        setIsToggled={setIsToggled}
        data={{
          title: '😁',
          message: '즐겨찾기 한 문제가 없어요. 문제를 즐겨찾기에 추가해보세요.',
        }}
      />
      <S.TitleContainer>
        <S.FavoriteTitle>즐겨찾기</S.FavoriteTitle>
        <FavoriteRandomQuizButton handleClick={handleClick} />
      </S.TitleContainer>
      <FavoriteTabMenu menuArr={menuArr} getFavoriteList={getFavoriteList} />
    </div>
  );
};

export default FavoritePage;
