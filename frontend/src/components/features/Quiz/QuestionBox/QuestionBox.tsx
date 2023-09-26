import React, { useEffect } from 'react';
import * as S from './QuestionBox.styled';
import { QuestionBoxProps } from 'types/types';
import { ReactComponent as CorrectIcon } from '../../../../assets/svgs/Quiz/correct.svg';
import { ReactComponent as WrongIcon } from '../../../../assets/svgs/Quiz/wrong.svg';
import ExplanationBox from '../ExplanationBox/ExplanationBox';
import FadeInOut from 'components/Effect/FadeInOut/FadeInOut';

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
    answer,
    setAnswer,
    isCorrect,
  } = props;

  const handleChangeSubjectQuestion = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (setAnswer) {
      e.target.value === '' ? setAnswer('') : setAnswer(e.target.value);
    }
  };

  const handleChangeMultipleQuestion = (index: number) => {
    if (setAnswer) {
      setAnswer(index + 1);
    }
  };

  useEffect(() => {}, [isJudge]);

  return (
    <FadeInOut>
      <S.Container>
        <S.QuestionContainer>
          <S.QuestionTitle
            kind={kind}
            isCorrect={isCorrect ?? null}
          >{`${questionNumber}. ${question}`}</S.QuestionTitle>
          <S.QuestionContent isCorrect={isCorrect ?? null}>
            {kind === 1 || kind === 3 ? (
              <S.MultipleQuestionUl>
                {Array.isArray(content)
                  ? content.map((item, index) =>
                      isJudge ? (
                        <S.MultipleQuestionLi
                          key={index}
                          kind={kind}
                          active={index + 1}
                          answer={Number(answer)}
                        >{`${index + 1}. ${item}`}</S.MultipleQuestionLi>
                      ) : (
                        <S.MultipleQuestionLi
                          key={index}
                          kind={kind}
                          active={index + 1}
                          answer={Number(answer)}
                          onClick={() => {
                            handleChangeMultipleQuestion(index);
                          }}
                        >{`${index + 1}. ${item}`}</S.MultipleQuestionLi>
                      )
                    )
                  : ''}
              </S.MultipleQuestionUl>
            ) : (
              <>
                {isJudge ? (
                  <S.AnswerContaier>{answer}</S.AnswerContaier>
                ) : (
                  <S.SubjectiveInput
                    value={answer}
                    onChange={(e) => {
                      handleChangeSubjectQuestion(e);
                    }}
                  />
                )}
              </>
            )}
          </S.QuestionContent>
          {isJudge ? (
            <S.AnswerIconContainer>
              {isCorrect ? <CorrectIcon /> : <WrongIcon />}
            </S.AnswerIconContainer>
          ) : (
            ''
          )}
        </S.QuestionContainer>
        {isJudge ? (
          <ExplanationBox title={String(answer)} content="" result={true} />
        ) : (
          ''
        )}
      </S.Container>
    </FadeInOut>
  );
};