import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import * as S from './Accordion.styled';
import React from 'react';

type OwnProps = {
  quizId: number;
  question: string;
  content: string;
  kind: number;
  isBookmark: boolean;
};

const AccordionLi = (item: OwnProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <>
      <S.ItemWrap
        onClick={toggleOpen}
        layout
        transition={{ duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }}
        key={item.quizId}
      >
        <motion.h1>{item.question}</motion.h1>
        {/* <S.Img>
          <img src={item.img} alt={item.title} />
        </S.Img> */}
      </S.ItemWrap>
      <AnimatePresence>
        {isOpen && (
          <S.SubWrap>
            <motion.div
              layout
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }}
            >
              <S.ContentContainer>
                <S.QuestionStyle>
                  <h1>문제</h1>
                  <p>{item.content}</p>
                </S.QuestionStyle>
                <S.ContentStyle>
                  <h1>정답</h1>
                  <p>{item.question}</p>
                </S.ContentStyle>
              </S.ContentContainer>
            </motion.div>
          </S.SubWrap>
        )}
      </AnimatePresence>
    </>
  );
};

export default AccordionLi;
