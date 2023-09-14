import styled from "@emotion/styled";

export const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 860px;
  height: 655px;
  box-sizing: border-box;
`;

export const QuestionTitle = styled.div<{ kind: number }>`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 860px;
  height: fit-content;
  background-color: #f1f8fb;
  border-radius: 24px 24px 0 0;
  font-size: 30px;
  box-sizing: border-box;
  padding: ${(props) => (props.kind === 3 ? "22px 46px 22px 46px" : "46px")};
`;

export const QuestionContent = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0 0 24px 24px;
  width: 860px;
  min-height: 396px;
  background-color: #fbfbfc;
`;

export const SubjectiveInput = styled.input`
  width: 286px;
  height: 84px;
  background-color: #dbe8f9;
  border: none;
  border-radius: 8px;
  font-size: 50px;
  padding: 14px;
  box-sizing: border-box;
  caret-color: #638ef3;
  &:focus {
    outline: 4px solid #638ef3;
  }
`;

export const MultipleQuestionUl = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 0;
`;
export const MultipleQuestionLi = styled.li<{
  kind: number;
  active: number;
  answer: number;
}>`
  max-width: 750px;
  min-width: 750px;
  height: fit-content;
  text-align: left;
  background-color: #dbe8f9;
  border-radius: 8px;
  box-sizing: border-box;
  font-size: ${(props) => (props.kind === 3 ? "24px" : "30px")};
  list-style: none;
  padding: 22px 40px;
  box-shadow: ${(props) =>
    props.active === props.answer ? "0 0 0 5px #638EF3 inset" : ""};
`;
