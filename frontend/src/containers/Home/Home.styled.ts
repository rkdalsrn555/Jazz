import styled from "@emotion/styled";
import { themeProps } from "@emotion/react";

export const Container = styled.div`
  border: solid green;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;

export const LeftContainer = styled.div`
  border: solid red;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 60%;
  height: 90%;
`;

export const RightContainer = styled.div`
  border: solid blue;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 40%;
  height: 90%;
`;
