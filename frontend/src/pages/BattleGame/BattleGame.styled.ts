import styled from '@emotion/styled';

export const Container = styled.div`
  position: relative;
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

  & .outGame {
    position: absolute;
    top: 5%;
    left: 5%;
    width: 100px;
    height: 100px;
    background-color: #d93d3d;
    border-radius: 50%;
    color: #fff;
  }
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
