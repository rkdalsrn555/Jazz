import styled from "@emotion/styled";
import { themeProps } from "@emotion/react";

export const Container = styled.div`
  /* border: solid green; */
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  padding: 2rem;
`;

export const LeftContainer = styled.div`
  /* border: solid red; */
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 60%;
  height: 100%;
`;

export const RightContainer = styled.div`
  /* border: solid blue; */
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 40%;
  height: 100%;
`;

export const EtcContainer = styled.div`
  border: solid black;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 95%;
  height: 20%;
  min-width: 42rem;
`;

export const Line = styled.div`
  display: block;
  width: 100%;
  height: 0.2px;
  background-color: grey;
  margin-top: 0.3rem;
`;

export const ButtonGroup = styled.div`
  /* border: solid green; */
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

export const ButtonImg = styled.img`
  width: 4.5rem;
  height: 4.5rem;
`;
