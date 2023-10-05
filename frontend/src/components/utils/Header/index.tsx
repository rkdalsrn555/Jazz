import { themeProps } from '@emotion/react';
import * as S from './Header.styled';
import { useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material';
import DarkSwitch from 'components/utils/DarkModeSwitch';
import BrandLogo from 'assets/JazzLogo.png';
import { Link } from 'react-router-dom';
import Enlarge from 'components/Effect/Enlarge/Enlarge';
import LogoutIcon from '../../../assets/img/Login/logoutIcon.png';
import { userApis } from 'hooks/api/userApis';

const Header = () => {
  const location = useLocation();
  const theme: themeProps = useTheme();

  const logout = () => {
    userApis
      .post(`/user/logout`)
      .then((res) => {})
      .catch((err) => {});
  };

  const blockLogoClickList = [
    '/short-answer-question',
    '/description-mutiple-question',
    '/short-answer-multiple-question',
    '/marathon',
    '/favorite/random-quiz',
    '/battle-game',
  ];

  return (
    <>
      {location.pathname.split('/')[1] === 'battle-game' ? (
        ''
      ) : (
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

          <S.LogoutBtn
            onClick={() => {
              window.localStorage.clear();
              logout();
            }}
          >
            <img src={LogoutIcon} alt="로그아웃" width={20} />
          </S.LogoutBtn>
          <DarkSwitch />
        </S.Container>
      )}
    </>
  );
};

export default Header;
