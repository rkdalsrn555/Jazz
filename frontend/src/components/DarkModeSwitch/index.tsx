import { themeProps } from "@emotion/react";
import { useTheme } from "@mui/material";
import { IsDark } from "atoms/atoms";
import * as S from "components/DarkModeSwitch/Switch.styled";
import { useRecoilState, useRecoilValue } from "recoil";

const Switch = () => {
  const [isDark, setIsDark] = useRecoilState(IsDark);
  const theme: themeProps = useTheme();

  return (
    <S.Btn onClick={() => setIsDark((cur) => !cur)}>
      {isDark ? (
        <S.LightModeIconStyled theme={theme} />
      ) : (
        <S.DarkModeIconStyled theme={theme} />
      )}
    </S.Btn>
  );
};

export default Switch;
