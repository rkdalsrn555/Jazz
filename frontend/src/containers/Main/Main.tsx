import { Global } from "@emotion/react";
import styled from "@emotion/styled";
import { ThemeProvider } from "@emotion/react";
import { IsDark } from "atoms/atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { darkTheme, lightTheme } from "../../styles/ColorSystem";
import GlobalStyle from "../../styles/GlobalStyle";
import Router from "Router";
import { BrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import Header from "components/Header";

function Main() {
  const isDark = useRecoilValue(IsDark);
  useEffect(() => {
    console.log("다크모드 여부", isDark);
  }, []);

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <Global styles={GlobalStyle} />
      <BrowserRouter>
        <Container theme={isDark}>
          <Header />
          <Router />
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}

const Container = styled.div<{ theme: boolean }>`
  /* border: solid black; */
  display: flex;
  flex-direction: column;
  background-color: ${(props) =>
    props.theme ? darkTheme.bg.mid : lightTheme.bg.mid};
  width: 100%;
  height: 100%;
  min-height: 33rem;
  min-width: 40rem;
  transition: all 0.2s;
`;

export default Main;
