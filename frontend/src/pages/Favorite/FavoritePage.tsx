import React, { useState, useEffect } from 'react';
import FavoriteRandomQuizButton from 'components/features/Favorite/FavoriteRandomQuizButton/FavoriteRandomQuizButton';
import FavoriteTabMenu from 'components/features/Favorite/FavoriteTabMenu/FavoriteTabMenu';
import { userApis } from 'hooks/api/userApis';
import styled from '@emotion/styled';

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
      <TitleContainer>
        <FavoriteTitle>즐겨찾기</FavoriteTitle>
        <FavoriteRandomQuizButton />
      </TitleContainer>
      <FavoriteTabMenu menuArr={menuArr} getFavoriteList={getFavoriteList} />
    </div>
  );
};

export default FavoritePage;

const TitleContainer = styled.div`
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  padding: 1% 0;
`;

const FavoriteTitle = styled.h1`
  color: #6e6893;
  font-size: 24px;
  font-weight: 900;
  text-align: center;
`;
