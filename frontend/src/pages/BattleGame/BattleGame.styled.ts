import styled from '@emotion/styled';

export const Container = styled.div`
  background: no-repeat center/cover url('/assets/img/battleBg.png');
  width: 100vw;
  height: 91.7vh;
  z-index: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 2%;
  gap: 2%;
`;

export const BattleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 70px;
  width: 80vw;
`;

export const BattleBoard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 800px;
  width: 100%;
  height: 645px;
  border-radius: 24px;
  background-color: rgba(255, 255, 255, 0.6);
`;
