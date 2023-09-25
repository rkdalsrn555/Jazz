import React from 'react';
import { useLocation } from 'react-router-dom';
import QuizResult from 'components/features/Quiz/QuizResult/QuizResult';
import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Result = () => {
  const location = useLocation();

  return (
    <Container>
      <QuizResult
        correctNum={location.state.answerCnt}
        diamondCnt={location.state.diamond}
        exp={location.state.expPoint}
      />
    </Container>
  );
};

export default Result;
