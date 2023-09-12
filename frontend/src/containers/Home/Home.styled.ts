import styled from "@emotion/styled";
import { themeProps } from "@emotion/react";

export const Container = styled.div`
  border: solid green;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`;

export const LeftContainer = styled.div`
  border: solid red;
  display: flex;
  flex-direction: column;
`;

export const RightContainer = styled.div`
  border: solid blue;
  display: flex;
  flex-direction: column;
`;
