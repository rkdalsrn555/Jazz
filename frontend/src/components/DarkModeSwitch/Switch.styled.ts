import styled from "@emotion/styled";
import { themeProps } from "@emotion/react";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

export const Btn = styled.button``;

export const LightModeIconStyled = styled(LightModeIcon)<{
  theme: themeProps;
}>`
  color: ${(props) => props.theme.font.light};
`;

export const DarkModeIconStyled = styled(DarkModeIcon)<{
  theme: themeProps;
}>`
  color: ${(props) => props.theme.font.light};
`;
