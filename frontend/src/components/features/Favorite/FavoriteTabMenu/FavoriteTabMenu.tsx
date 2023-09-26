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
};

const FavoriteTabMenu = (props: OwnProps) => {
  const { menuArr } = props;
  const [currentTab, clickTab] = useState<number>(0);

  const selectMenuHandler = (index: number) => {
    clickTab(index);
  };

  return (
    <S.Container>
      <S.TabMenu>
        {menuArr.map((el, index) => (
          <li
            className={index === currentTab ? 'submenu focused' : 'submenu'}
            onClick={() => selectMenuHandler(index)}
          >
            <p>{el.name}</p>
          </li>
        ))}
      </S.TabMenu>
      <S.Desc>
        {menuArr[currentTab].content.map((item) => (
          // <div>
          //   <FavoriteIcon
          //     //   fill={item.isBookmark ? '#FFE812' : '#fff'}
          //     fill={true ? '#FFE812' : '#fff'}
          //   ></FavoriteIcon>
          // </div>
          <AccordionLi
            quizId={item.quizId}
            question={item.question}
            content={item.content}
            kind={item.kind}
            isBookmark={item.isBookmark}
          />
        ))}
      </S.Desc>
    </S.Container>
  );
};

export default FavoriteTabMenu;
