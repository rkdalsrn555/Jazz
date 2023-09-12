import * as S from "./Home.styled";
import { themeProps } from "@emotion/react";
import { useTheme } from "@mui/material";
import { IsDark } from "atoms/atoms";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import Inner from "components/Main/InnerContainer";
import { innerContainerProps } from "types/types";

const Home = () => {
  const theme: themeProps = useTheme();
  const isDark = useRecoilValue(IsDark);
  useEffect(() => {
    console.log("isDark", isDark);
  }, [isDark]);

  const quizContainerFeature: innerContainerProps = {
    width: "95%",
    height: "35%",
    theme: theme,
  };

  const studyContainerFeature: innerContainerProps = {
    width: "95%",
    height: "25%",
    theme: theme,
  };

  const etcContainerFeature: innerContainerProps = {
    width: "95%",
    height: "25%",
    theme: theme,
  };

  const profileContainerFeature: innerContainerProps = {
    width: "95%",
    height: "45%",
    theme: theme,
  };
  const rankContainerFeature: innerContainerProps = {
    width: "95%",
    height: "45%",
    theme: theme,
  };

  return (
    <S.Container>
      <S.LeftContainer>
        <Inner {...quizContainerFeature}></Inner>
        <Inner {...studyContainerFeature}></Inner>
        <Inner {...etcContainerFeature}></Inner>
      </S.LeftContainer>
      <S.RightContainer>
        <Inner {...profileContainerFeature}></Inner>
        <Inner {...rankContainerFeature}></Inner>
      </S.RightContainer>
    </S.Container>
  );
};

export default Home;
