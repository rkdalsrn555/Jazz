import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  gap: 30px;
`;

export const QuestionContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 500px;
  min-height: 40%;
  box-sizing: border-box;
  margin: 0 auto;
`;

export const QuestionTitle = styled.div<{
  kind: number;
  isCorrect: boolean | null;
}>`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: fit-content;
  background-color: ${(props) => {
    if (props.isCorrect !== null) {
      return props.isCorrect ? '#EBFEC1' : '#EA9B8A';
    } else {
      return '#f1f8fb';
    }
  }};
  border-radius: 24px 24px 0 0;
  font-size: 16px;
  box-sizing: border-box;
  padding: ${(props) => (props.kind === 3 ? '30px' : '30px')};
`;

export const QuestionContent = styled.div<{
  isCorrect: boolean | null;
}>`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0 0 24px 24px;
  width: 100%;
  min-height: 17rem;
  background-color: ${(props) => {
    if (props.isCorrect !== null) {
      return props.isCorrect ? '#F4FEDA ' : '#E9CEC9';
    } else {
      return '#FBFBFC';
    }
  }};
`;

export const AnswerIconContainer = styled.div`
  position: absolute;
  top: 25%;
  left: 0;
  right: 0;
  text-align: center;
  opacity: 0.8;
`;

export const AnswerContaier = styled.div`
  background-color: #dbe8f9;
  border: none;
  border-radius: 8px;
  text-align: center;
  line-height: 30px;
  font-size: 30px;
  font-weight: 800;
  padding: 15px 20px;
  box-sizing: border-box;
  caret-color: #638ef3;
`;

export const SubjectiveInput = styled.input`
  background-color: #dbe8f9;
  border: none;
  border-radius: 8px;
  text-align: center;
  font-size: 24px;
  padding: 13px 15px;
  box-sizing: border-box;
  caret-color: #638ef3;
  &:focus {
    outline: 4px solid #638ef3;
  }
`;

export const MultipleQuestionUl = styled.ul`
  display: flex;
  flex-direction: column;
  width: 90%;
  gap: 18px;
  padding: 0;
`;
export const MultipleQuestionLi = styled.li<{
  kind: number;
  active: number;
  answer: number;
}>`
  min-width: 100%;
  height: 100%;
  text-align: left;
  background-color: #dbe8f9;
  border-radius: 8px;
  box-sizing: border-box;
  font-size: ${(props) => (props.kind === 3 ? '14px' : '14px')};
  list-style: none;
  padding: 12px 20px;
  box-shadow: ${(props) =>
    props.active === props.answer ? '0 0 0 5px #638EF3 inset' : ''};
`;
