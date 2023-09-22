import React from 'react';
import * as S from './QuestionBox.styled';
import { useState } from 'react';
import { QuestionBoxProps } from 'types/types';

export const QuestionBox = (props: QuestionBoxProps) => {
  const {
    quizId,
    question,
    content,
    isMulti,
    isBookmark,
    finiancialType,
    caseNum,
    kind,
    questionNumber,
    isJudge,
  } = props;
  const [answer, setAnswer] = useState<string | number>('');

  const handleChangeSubjectQuestion = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => (e.target.value === '' ? setAnswer('') : setAnswer(e.target.value));

  const handleChangeMultipleQuestion = (index: number) => {
    setAnswer(index + 1);
    console.log(index + 1);
  };

  return (
    <S.QuestionContainer>
      <S.QuestionTitle
        kind={kind}
      >{`${questionNumber}. ${question}`}</S.QuestionTitle>
      <S.QuestionContent>
        {kind === 1 || kind === 3 ? (
          <S.MultipleQuestionUl>
            {Array.isArray(content)
              ? content.map((item, index) => (
                  <S.MultipleQuestionLi
                    key={index}
                    kind={kind}
                    active={index + 1}
                    answer={Number(answer)}
                    onClick={() => {
                      handleChangeMultipleQuestion(index);
                    }}
                  >{`${index + 1}. ${item}`}</S.MultipleQuestionLi>
                ))
              : ''}
          </S.MultipleQuestionUl>
        ) : (
          <S.SubjectiveInput
            value={answer}
            onChange={handleChangeSubjectQuestion}
          />
        )}
      </S.QuestionContent>
    </S.QuestionContainer>
  );
};
