import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MarathonResult from 'components/features/Quiz/MarathonResult/MarathonResult';
import MarathonResultBtn from 'components/features/Quiz/MarathonResult/MarathonResultBtn';
import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2%;
  width: 100vw;
  height: 90vh;
  margin: 0 auto;
`;

const MarathonResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.state) {
      navigate('/home');
    }
  });

  return !location?.state ? (
    <div></div>
  ) : (
    <Container>
      <MarathonResult correctNum={location?.state?.correctNum ?? 0} />
      <MarathonResultBtn />
    </Container>
  );
};

export default MarathonResultPage;
