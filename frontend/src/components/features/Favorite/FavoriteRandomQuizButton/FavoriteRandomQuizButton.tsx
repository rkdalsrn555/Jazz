import React from 'react';
import styled from '@emotion/styled';
import Enlarge from 'components/Effect/Enlarge/Enlarge';

const ButtonStyle = styled.button`
  width: 150px;
  height: 3rem;
  background-color: #a3a3e1;
  border-radius: 100px;
  font-size: 16px;
  font-weight: 800;
  color: #fff;
`;

const FavoriteRandomQuizButton = () => {
  return (
    <Enlarge>
      <ButtonStyle>랜덤 문제풀기</ButtonStyle>
    </Enlarge>
  );
};

export default FavoriteRandomQuizButton;
