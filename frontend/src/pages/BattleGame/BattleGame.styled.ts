import styled from '@emotion/styled';

export const Container = styled.div`
  background: center/cover url('/assets/img/battleBg.png');
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
  z-index: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  gap: 2%;
`;

export const BattleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 70px;
`;

export const BattleBoard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 700px;
  min-width: 700px;
  max-height: 450px;
  min-height: 450px;
  border-radius: 24px;
  background-color: rgba(255, 255, 255, 0.6);
  padding-top: 20px;
  padding-bottom: 20px;
`;

export const AnswerBtn = styled.button`
  width: 250px;
  height: 60px;
  font-size: 20px;
  font-weight: 800;
  color: #fff;
  background: linear-gradient(90deg, #ffe259 15.1%, #ffa751 85.42%);
  border-radius: 16px;
`;

export const ResultContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3%;
`;
