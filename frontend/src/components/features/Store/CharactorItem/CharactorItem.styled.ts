import styled from '@emotion/styled';

export const Container = styled.div`
  width: 220px;
  height: 400px;
  border: 2px solid #a3a3e1;
  border-radius: 10px;
  background-color: #fff;
`;

export const UserCharactorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 100%;

  & h1 {
    font-size: 24px;
    font-weight: 800;
    margin-bottom: 15px;
  }
`;

export const SoldOutCharactor = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 100%;

  & h1 {
    font-size: 24px;
    font-weight: 800;
    margin-bottom: 15px;
  }

  & .soldOut {
    position: absolute;
    top: -40px;
  }
`;

export const Diamond = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  height: 35px;
  border-radius: 100px;
  background-color: #dbe5ff;
  padding: 10px 10px;
  margin-bottom: 15px;

  & p {
    font-size: 20px;
    font-weight: 800;
  }
`;

export const SellBtn = styled.button<{ isBuy?: boolean }>`
  width: 200px;
  height: 50px;
  background-color: ${(props) => (props.isBuy ? '#666' : '#ff6f77')};
  color: #fff;
  text-align: center;
  font-size: 16px;
  font-weight: 700;
  border-radius: 16px;
  box-shadow:
    4px 8px 12px 0px rgba(78, 99, 141, 0.06),
    0px 4px 12px 0px rgba(200, 211, 249, 0.6) inset;
  margin-bottom: 7%;
`;
