import styled from "@emotion/styled";
import { themeProps } from "@emotion/react";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

export const BtnBox = styled.div`
  /* border: solid green; */
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: fit-content;
  gap: 0.2rem;
  width: 20%;
  padding-top: 3rem;
  padding-right: 3rem;
`;

export const LightModeIconStyled = styled(LightModeIcon)``;

export const DarkModeIconStyled = styled(DarkModeIcon)``;
