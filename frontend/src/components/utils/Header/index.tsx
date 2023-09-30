import { themeProps } from '@emotion/react';
import * as S from './Header.styled';
import { useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material';
import DarkSwitch from 'components/utils/DarkModeSwitch';
import BrandLogo from 'assets/JazzLogo.png';
import { Link } from 'react-router-dom';
import Enlarge from 'components/Effect/Enlarge/Enlarge';

const Header = () => {
  const location = useLocation();
  const theme: themeProps = useTheme();

  const blockLogoClickList = [
    '/short-answer-question',
    '/description-mutiple-question',
    '/short-answer-multiple-question',
    '/marathon',
  ];

  return (
    <S.Container theme={theme}>
      <S.Blank />
      {blockLogoClickList.includes(location.pathname) ? (
        <S.Logo src={BrandLogo} />
      ) : (
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
      )}

      <DarkSwitch />
    </S.Container>
  );
};

export default Header;
