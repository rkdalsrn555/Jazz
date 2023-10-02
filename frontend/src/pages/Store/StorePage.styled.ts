import styled from '@emotion/styled';

export const Container = styled.div`
  position: relative;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 5%;

  & h1 {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 26px;
    font-weight: 900;
    width: 80%;
    padding-left: 20%;
  }

  & div {
    margin-right: 10%;
  }
`;

export const CharactorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
  height: 70vh;
`;
