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
    width: "5rem",
    height: "5rem",
    theme: theme,
  };

  const studyContainerFeature: innerContainerProps = {
    width: "10rem",
    height: "15rem",
    theme: theme,
  };

  return (
    <S.Container>
      <S.LeftContainer>
        <Inner {...quizContainerFeature}></Inner>
        <Inner {...studyContainerFeature}></Inner>
      </S.LeftContainer>
      <S.RightContainer></S.RightContainer>
    </S.Container>
  );
};

export default Home;
