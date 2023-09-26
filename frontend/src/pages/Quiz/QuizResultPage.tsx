import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import QuizResult from 'components/features/Quiz/QuizResult/QuizResult';
import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const QuizResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.state) {
      navigate('/home');
    }
  }, []);

  return !location.state ? (
    <div></div>
  ) : (
    <Container>
      <QuizResult
        correctNum={location?.state?.answerCnt}
        diamondCnt={location?.state?.diamond}
        exp={location?.state?.expPoint}
      />
    </Container>
  );
};

export default QuizResultPage;