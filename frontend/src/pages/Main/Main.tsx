import { Global } from '@emotion/react';
import styled from '@emotion/styled';
import { ThemeProvider } from '@emotion/react';
import { IsDark } from 'atoms/atoms';
import { useRecoilState, useRecoilValue } from 'recoil';
import { darkTheme, lightTheme } from '../../styles/ColorSystem';
import GlobalStyle from '../../styles/GlobalStyle';
import Router from 'Router';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from 'components/utils/Header/index';
import { motion } from 'framer-motion';

function Main() {
  const isDark = useRecoilValue(IsDark);
  const location = useLocation();
  useEffect(() => {
    // console.log('다크모드 여부', isDark);
  }, []);

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <Global styles={GlobalStyle} />
      <Container theme={isDark}>
        {location.pathname === '/login' ||
        location.pathname === '/sign-up' ||
        location.pathname === '/dictionary' ? (
          ''
        ) : (
          <Header />
        )}
        <Router />
      </Container>
    </ThemeProvider>
  );
}

const Container = styled(motion.div)<{ theme: boolean }>`
  /* border: solid black; */
  display: flex;
  flex-direction: column;
  background-color: ${(props) =>
    props.theme ? darkTheme.bg.mid : lightTheme.bg.mid};
  width: 100%;
  height: 100%;
  min-height: 100vh;
  transition: all 0.2s;
`;

export default Main;
