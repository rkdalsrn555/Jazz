import styled from '@emotion/styled';

export const Container = styled.div`
  width: 250px;
  height: 500px;
  border: 2px solid #a3a3e1;
  border-radius: 10px;
  background-color: #fff;
`;

export const UserCharactorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  gap: 30px;
  width: 100%;
  height: 100%;

  & h1 {
    font-size: 24px;
    font-weight: 800;
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

  & p {
    font-size: 20px;
    font-weight: 800;
  }
`;

export const SellBtn = styled.button`
  width: 220px;
  height: 60px;
  background-color: #ff6f77;
  color: #fff;
  text-align: center;
  font-size: 18px;
  font-weight: 700;
  border-radius: 16px;
  box-shadow:
    4px 8px 12px 0px rgba(78, 99, 141, 0.06),
    0px 4px 12px 0px rgba(200, 211, 249, 0.6) inset;
  margin-bottom: 7%;
`;
