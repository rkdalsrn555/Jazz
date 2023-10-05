import styled from '@emotion/styled';
import { themeProps } from '@emotion/react';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

export const BtnBox = styled.div`
  /* border: solid green; */
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: fit-content;
  gap: 0.2rem;
  /* padding-top: 3rem; */
  padding-right: 1rem;
`;

export const LightModeIconStyled = styled(LightModeIcon)<{ theme: themeProps }>`
  color: ${(props) => props.theme.font.deep};
  transition: color 0.2s;
`;

export const DarkModeIconStyled = styled(DarkModeIcon)<{ theme: themeProps }>`
  color: ${(props) => props.theme.font.deep};
  transition: color 0.2s;
`;
