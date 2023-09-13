import { themeProps } from "@emotion/react";
import * as S from "./Header.styled";
import { useTheme } from "@mui/material";
import DarkSwitch from "components/DarkModeSwitch/index";
import BrandLogo from "asset/JazzLogo.png";

const Header = () => {
  const theme: themeProps = useTheme();
  return (
    <S.Container theme={theme}>
      <S.Blank />
      <S.Logo src={BrandLogo} />
      <DarkSwitch />
    </S.Container>
  );
};

export default Header;
