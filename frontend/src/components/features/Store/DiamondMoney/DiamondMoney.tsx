import React from 'react';
import styled from '@emotion/styled';
import { ReactComponent as DiamondIcon } from '../../../../assets/svgs/Game/diamondIcon.svg';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: fit-content;
  padding: 5px 20px;
  height: 60px;
  border-radius: 100px;
  background-color: #a3a3e1;

  & p {
    font-size: 24px;
    font-weight: 900;
  }
`;

type OwnProps = {
  diamond: number;
};

const DiamondMoney = (props: OwnProps) => {
  const { diamond } = props;

  return (
    <Container>
      <p>{diamond}</p>
      <DiamondIcon width={30} />
    </Container>
  );
};

export default DiamondMoney;
