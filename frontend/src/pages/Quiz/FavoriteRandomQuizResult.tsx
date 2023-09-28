import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import QuizResult from 'components/features/Quiz/QuizResult/QuizResult';
import styled from '@emotion/styled';

const FavoriteRandomQuizResult = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.state) {
      navigate('/favorite');
    }
  }, []);

  return !location.state ? (
    <div></div>
  ) : (
    <Container>
      <QuizResult
        correctNum={location?.state?.correctNum}
        quizCnt={location?.state?.quizCnt}
      />
    </Container>
  );
};

export default FavoriteRandomQuizResult;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90vh;
`;
