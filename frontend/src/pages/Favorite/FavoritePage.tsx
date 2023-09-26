import React, { useState, useEffect } from 'react';
import FavoriteRandomQuizButton from 'components/features/Favorite/FavoriteRandomQuizButton/FavoriteRandomQuizButton';
import FavoriteTabMenu from 'components/features/Favorite/FavoriteTabMenu/FavoriteTabMenu';

import { FavoriteMockData } from './FavoriteMockData';

type Menu = {
  name: string;
  content: {
    quizId: number;
    question: string;
    content: string;
    kind: number;
    isBookmark: boolean;
  }[];
};

const FavoritePage = () => {
  const [menuArr, setMenuArr] = useState<Menu[]>([
    { name: '단어형 주관식', content: [] },
    { name: '단어형 객관식', content: [] },
    { name: '사례형 객관식', content: [] },
  ]);

  const getFavoriteList = async () => {
    // userApis.get(`/bookmark`).then((res) => {
    //   console.log(res);
    // });
    setMenuArr([
      {
        name: '단어형 주관식',
        content: [...FavoriteMockData.filter((item) => item.kind === 3)],
      },
      {
        name: '단어형 객관식',
        content: [...FavoriteMockData.filter((item) => item.kind === 2)],
      },
      {
        name: '사례형 객관식',
        content: [...FavoriteMockData.filter((item) => item.kind === 1)],
      },
    ]);
  };

  useEffect(() => {
    getFavoriteList();
  }, []);

  return (
    <div>
      <FavoriteRandomQuizButton />
      <FavoriteTabMenu menuArr={menuArr} />
    </div>
  );
};

export default FavoritePage;
