import React from "react";
import * as S from "./QuestionBox.styled";
import { useState } from "react";

type QuizType = {
  quizId: number;
  question: string;
  content: string[] | string;
  caseNum: number;
  isMulti: boolean;
  kind: number;
  questionNumber: number;
};

export const QuestionBox = (props: QuizType) => {
  const { quizId, question, content, caseNum, isMulti, kind, questionNumber } =
    props;
  const [answer, setAnswer] = useState<string | number>("");

  const handleChangeSubjectQuestion = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => (e.target.value === "" ? setAnswer("") : setAnswer(e.target.value));

  const handleChangeMultipleQuestion = (index: number) => {
    setAnswer(index + 1);
    console.log(index + 1);
  };

  return (
    <S.QuestionContainer>
      <S.QuestionTitle kind={kind}>{`${
        questionNumber + 1
      }. ${question}`}</S.QuestionTitle>
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
              : ""}
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
