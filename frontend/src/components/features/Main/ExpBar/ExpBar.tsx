import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

type OwnProps = {
  expPoint: number;
};

const ExpBarContainer = styled.div`
  position: relative;
  width: 90%;
  height: 15px;
  border-radius: 100px;
  background-color: #e1ebfa;
  box-sizing: border-box;
  padding: 3px;
  margin: 0 auto;
  margin-top: 1%;

  & .bar {
    width: 5%;
    height: 100%;
    background-color: #ffc745;
    border-radius: 100px;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
`;

const ExpBar = (props: OwnProps) => {
  const { expPoint } = props;

  return (
    <ExpBarContainer>
      <motion.div
        className="bar"
        animate={{
          width: `${expPoint}%`,
        }}
      ></motion.div>
    </ExpBarContainer>
  );
};

export default ExpBar;
