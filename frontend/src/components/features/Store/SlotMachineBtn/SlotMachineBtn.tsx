import React from 'react';
import slotMachine from '../../../../assets/img/Store/slotMachineIcon.png';
import storeIcon from '../../../../assets/img/Store/storeIcon.png';
import styled from '@emotion/styled';
import { useLocation, useNavigate } from 'react-router-dom';
import Enlarge from 'components/Effect/Enlarge/Enlarge';

const Button = styled.button`
  position: absolute;
  bottom: 0;
  right: 5%;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: rgba(163, 163, 225, 0.8);

  & .slotMachine {
    margin-left: 5px;
    margin-bottom: 5px;
  }
`;

const SlotMachineBtn = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Button
      onClick={() => {
        location.pathname === '/store'
          ? navigate('/slot-machine')
          : navigate('/store');
      }}
    >
      <Enlarge>
        {location.pathname === '/store' ? (
          <img
            className="slotMachine"
            src={slotMachine}
            alt="가챠하러 가기"
            width={100}
          />
        ) : (
          <img
            className="store"
            src={storeIcon}
            alt="상점으로 가기"
            width={100}
          />
        )}
      </Enlarge>
    </Button>
  );
};

export default SlotMachineBtn;
