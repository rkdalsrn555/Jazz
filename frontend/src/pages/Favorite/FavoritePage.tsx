import React, { useState, useEffect } from 'react';
import FavoriteRandomQuizButton from 'components/features/Favorite/FavoriteRandomQuizButton/FavoriteRandomQuizButton';
import FavoriteTabMenu from 'components/features/Favorite/FavoriteTabMenu/FavoriteTabMenu';
import { userApis } from 'hooks/api/userApis';
import * as S from './FavoritePage.styled';

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
  const [menuArr, setMenuArr] = useState<Menu[]>([
    { name: '단어형 주관식', content: [] },
    { name: '단어형 객관식', content: [] },
    { name: '사례형 객관식', content: [] },
  ]);

  const getFavoriteList = async () => {
    userApis.get(`/bookmark`).then((res) => {
      setMenuArr([
        {
          name: '단어형 주관식',
          content: [...res.data.filter((item: Content) => item.kind === 3)],
        },
        {
          name: '단어형 객관식',
          content: [...res.data.filter((item: Content) => item.kind === 2)],
        },
        {
          name: '사례형 객관식',
          content: [...res.data.filter((item: Content) => item.kind === 1)],
        },
      ]);
    });
  };

  useEffect(() => {
    getFavoriteList();
  }, []);

  return (
    <div>
      <S.TitleContainer>
        <S.FavoriteTitle>즐겨찾기</S.FavoriteTitle>
        <FavoriteRandomQuizButton />
      </S.TitleContainer>
      <FavoriteTabMenu menuArr={menuArr} getFavoriteList={getFavoriteList} />
    </div>
  );
};

export default FavoritePage;
