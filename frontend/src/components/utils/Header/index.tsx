import { themeProps } from '@emotion/react';
import * as S from './Header.styled';
import { useTheme } from '@mui/material';
import DarkSwitch from 'components/utils/DarkModeSwitch';
import BrandLogo from 'assets/JazzLogo.png';
import { Link } from 'react-router-dom';
import Enlarge from 'components/Effect/Enlarge/Enlarge';

const Header = () => {
  const theme: themeProps = useTheme();
  const logoContent = (
    <Link to={'home'}>
      <S.Logo src={BrandLogo} />
    </Link>
  );
  return (
    <S.Container theme={theme}>
      <S.Blank />
      <Enlarge>
        <Link
          to={'home'}
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <S.Logo src={BrandLogo} />
        </Link>
      </Enlarge>
      <DarkSwitch />
    </S.Container>
  );
};

export default Header;
