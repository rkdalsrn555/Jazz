import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 90%;
  height: 75vh;
  margin: 0 auto;
`;

export const TabMenu = styled.ul`
  font-weight: bold;
  display: flex;
  flex-basis: 10%;
  flex-direction: row;
  align-items: center;
  list-style: none;

  & .submenu {
    display: flex;
    padding: 20px;
    font-size: 15px;
    transition: 0.5s;
    border-radius: 10px 10px 0px 0px;
  }

  & .focused {
    background-color: #f4f2ff;
    color: rgb(21, 20, 20);
  }

  & div.desc {
    text-align: center;
  }
`;

export const Desc = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  background-color: #fff;
  overflow: scroll;

  & div {
    width: 100%;
    height: 20%;
  }
`;
