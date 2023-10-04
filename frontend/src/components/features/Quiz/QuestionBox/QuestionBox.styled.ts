import styled from '@emotion/styled';

export const Container = styled.div<{ quizKind?: string }>`
  display: flex;
  gap: 30px;
  padding-top: 3%;
  margin-top: ${(props) => {
    if (props.quizKind) {
      return props.quizKind === 'marathon' ? '3%' : '3%';
    }
  }};
`;

export const QuestionContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 600px;
  min-height: 300px;
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
  font-size: 20px;
  box-sizing: border-box;
  padding: ${(props) => (props.kind === 3 ? '36px' : '36px')};
`;

export const QuestionContent = styled.div<{
  isCorrect: boolean | null;
  quizKind?: string;
}>`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0 0 24px 24px;
  width: 100%;
  min-height: ${(props) => {
    if (props.quizKind) {
      return props.quizKind === 'marathon' ? '20rem' : '17rem';
    } else {
      return '18rem';
    }
  }};
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
  font-size: 30px;
  padding: 15px 20px;
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
  font-size: ${(props) => (props.kind === 3 ? '16px' : '16px')};
  list-style: none;
  padding: 15px 20px;
  box-shadow: ${(props) =>
    props.active === props.answer ? '0 0 0 5px #638EF3 inset' : ''};
`;
