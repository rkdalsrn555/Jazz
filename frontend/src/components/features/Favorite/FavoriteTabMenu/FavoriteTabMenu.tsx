import React, { useEffect, useState } from 'react';
import * as S from './FavoriteTabMenu.styled';
import { userApis } from 'hooks/api/userApis';
import { ReactComponent as FavoriteIcon } from '../../../../assets/svgs/Quiz/star.svg';
import AccordionLi from '../AccordionLi/AccordionLi';

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

type OwnProps = {
  menuArr: Menu[];
  getFavoriteList: () => void;
};

const FavoriteTabMenu = (props: OwnProps) => {
  const [currentOpen, setCurrentOpen] = useState<number | null>(null);
  const toggleOpen = (quizId: number) => {
    if (currentOpen === quizId) {
      setCurrentOpen(null);
    } else {
      setCurrentOpen(quizId);
    }
  };
  const { menuArr, getFavoriteList } = props;
  const [currentTab, clickTab] = useState<number>(0);

  const selectMenuHandler = (index: number) => {
    clickTab(index);
    setCurrentOpen(null);
  };

  return (
    <S.Container>
      <S.TabMenu>
        {menuArr.map((el, index) => (
          <li
            className={index === currentTab ? 'submenu focused' : 'submenu'}
            onClick={() => selectMenuHandler(index)}
            key={el.name}
          >
            <p>{el.name}</p>
          </li>
        ))}
      </S.TabMenu>
      <S.Desc>
        {menuArr[currentTab].content.map((item) => (
          <AccordionLi
            key={item.quizId}
            quizId={item.quizId}
            question={item.question}
            content={item.content}
            kind={item.kind}
            isBookmark={item.isBookmark}
            currentOpen={currentOpen}
            toggleOpen={toggleOpen}
            getFavoriteList={getFavoriteList}
          />
        ))}
      </S.Desc>
    </S.Container>
  );
};

export default FavoriteTabMenu;
