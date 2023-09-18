import React from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
  width: 250px;
  height: 60px;
  border-radius: 40px;
  background-color: #f4feda;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;
  margin-bottom: 10px;
`;

const TalkBlock = ({ text }: { text: string }) => {
  return <Container>{text}</Container>;
};

export default TalkBlock;
