import React from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & p {
    font-size: 100px;
  }

  & button {
    font-size: 50px;
    padding: 20px;
    background-color: #fff;
  }
`;

const Error404 = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <p>없는 페이지입니다</p>
      <button
        onClick={() => {
          navigate('/home');
        }}
      >
        홈으로 돌아가기
      </button>
    </Container>
  );
};

export default Error404;
