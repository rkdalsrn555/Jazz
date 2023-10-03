import React, { useEffect } from 'react';
import * as S from './MarathonResultBtn.styled';
import Enlarge from 'components/Effect/Enlarge/Enlarge';
import { useNavigate, useLocation } from 'react-router-dom';

const MarathonResultBtn = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.state) {
      navigate('/home');
    }
  }, []);

  return (
    <Enlarge>
      <S.MarathonResultBtn
        onClick={() => {
          navigate('/home');
        }}
      >
        <p>연속풀기 끝내기</p>
      </S.MarathonResultBtn>
    </Enlarge>
  );
};

export default MarathonResultBtn;
