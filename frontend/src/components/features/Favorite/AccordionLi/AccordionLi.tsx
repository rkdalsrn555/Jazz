import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import * as S from './Accordion.styled';
import React from 'react';
import { ReactComponent as StarIcon } from '../../../../assets/svgs/Favorite/star.svg';
import { ReactComponent as DownArrowIcon } from '../../../../assets/svgs/Favorite/downArrow.svg';
import { ReactComponent as TopArrowIcon } from '../../../../assets/svgs/Favorite/topArrow.svg';
import { userApis } from 'hooks/api/userApis';

type OwnProps = {
  quizId: number;
  question: string;
  content: string;
  kind: number;
  isBookmark: boolean;
  currentOpen: number | null;
  toggleOpen: (quizId: number) => void;
  getFavoriteList: () => void;
};

const AccordionLi = (props: OwnProps) => {
  const {
    quizId,
    question,
    content,
    kind,
    isBookmark,
    currentOpen,
    toggleOpen,
    getFavoriteList,
  } = props;

  const patchReleaseBookmark = async (e: any) => {
    e.stopPropagation();
    await userApis
      .patch(`/quiz/bookmark/release`, {
        quizId: quizId,
        isBookmark: false,
      })
      .then((res) => {
        getFavoriteList();
      })
      .catch((err) => {});
  };

  return (
    <S.AccordionButtonContainer
      onClick={() => {
        toggleOpen(quizId);
      }}
      key={quizId}
    >
      <S.FavoriteLiContainer>
        <div className="liContent">
          <button onClick={patchReleaseBookmark}>
            <StarIcon color={'#FFCF53'} />
          </button>
          <h1>{content}</h1>
        </div>
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            className="arrow"
            key={currentOpen === quizId ? 'minus' : 'plus'}
            initial={{
              rotate: currentOpen === quizId ? -1 : 1,
            }}
            animate={{
              zIndex: 1,
              rotate: 0,
              transition: {
                type: 'tween',
                duration: 0.15,
                ease: 'circOut',
              },
            }}
            exit={{
              zIndex: 0,
              rotate: currentOpen === quizId ? -1 : 1,
              transition: {
                type: 'tween',
                duration: 0.15,
                ease: 'circIn',
              },
            }}
          >
            {currentOpen === quizId ? <TopArrowIcon /> : <DownArrowIcon />}
          </motion.div>
        </AnimatePresence>
      </S.FavoriteLiContainer>
      <AnimatePresence>
        {currentOpen === quizId && (
          <S.SubWrap>
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: '200px',
                opacity: 1,
                transition: {
                  height: { duration: 0.5 },
                  opacity: { duration: 0.25, delay: 0 },
                },
              }}
              exit={{
                height: 0,
                opacity: 0,
                transition: {
                  height: {
                    duration: 0.4,
                  },
                  opacity: {
                    duration: 0.25,
                  },
                },
              }}
            >
              <S.ContentContainer>
                <S.QuestionStyle>
                  <h1>문제</h1>
                  <p>{question}</p>
                </S.QuestionStyle>
                <S.ContentStyle>
                  <h1>정답</h1>
                  <p>{content}</p>
                </S.ContentStyle>
              </S.ContentContainer>
            </motion.div>
          </S.SubWrap>
        )}
      </AnimatePresence>
    </S.AccordionButtonContainer>
  );
};

export default AccordionLi;
