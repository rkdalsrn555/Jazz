import { Global } from "@emotion/react";
import styled from "@emotion/styled";
import { ThemeProvider } from "@emotion/react";
import { IsDark } from "atoms/atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { darkTheme, lightTheme } from "../../styles/ColorSystem";
import GlobalStyle from "../../styles/GlobalStyle";
import Router from "Router";
import { BrowserRouter } from "react-router-dom";
import DarkModeSwitch from "components/DarkModeSwitch/index";

function Main() {
  const isDark = useRecoilValue(IsDark);
  // const isDark = false;
  console.log(isDark);

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <Global styles={GlobalStyle} />
      <BrowserRouter>
        <DarkModeSwitch />
        <Container theme={isDark}>
          <Router />
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}

const Container = styled.div<{ theme: boolean }>`
  display: flex;
  background-color: ${(props) =>
    props.theme ? darkTheme.bg.mid : lightTheme.bg.mid};
  width: 100%;
  height: 100%;
  min-height: fit-content;
  min-width: 40rem;
`;

export default Main;
