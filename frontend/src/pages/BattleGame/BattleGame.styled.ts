import styled from '@emotion/styled';

export const Container = styled.div`
  background: no-repeat center/cover url('/assets/img/battleBg.png');
  width: 100vw;
  height: 100vh;
  z-index: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const BattleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 70px;
`;

export const BattleBoard = styled.div`
  width: 859px;
  height: 645px;
  border-radius: 24px;
  background-color: rgba(255, 255, 255, 0.6);
`;
