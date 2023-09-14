import { themeProps } from '@emotion/react';
import { useTheme } from '@mui/material';
import Toggle from 'react-styled-toggle';
import { IsDark } from 'atoms/atoms';
import * as S from './Switch.styled';
import { useRecoilState } from 'recoil';

const ToggleSwitch = () => {
  const [isDark, setIsDark] = useRecoilState(IsDark);
  const theme: themeProps = useTheme();

  const handleToggle = () => {
    setIsDark((cur) => !cur);
  };
  return (
    <S.BtnBox>
      <S.LightModeIconStyled theme={theme} />
      <Toggle
        onChange={handleToggle}
        checked={isDark}
        height={25}
        width={54}
        sliderHeight={20}
        sliderWidth={20}
      />
      <S.DarkModeIconStyled theme={theme} />
    </S.BtnBox>
  );
};

export default ToggleSwitch;
