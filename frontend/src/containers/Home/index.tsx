import * as S from "./Home.styled";
import { themeProps } from "@emotion/react";
import { useTheme } from "@mui/material";
import { IsDark } from "atoms/atoms";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import Inner from "components/Main/InnerContainer";
import { btnProps, innerContainerProps } from "types/types";
import Button from "components/Main/Button/index";
import Heart from "asset/img/icons8-heart-100.png";
import Eye from "asset/img/icons8-eye-100.png";
import DotMessage from "asset/img/icons8-chat-bubble-100.png";
import Message from "asset/img/icons8-topic-100.png";
import Envelop from "asset/img/icons8-open-envelope-100.png";

const Home = () => {
  const theme: themeProps = useTheme();
  const isDark = useRecoilValue(IsDark);
  useEffect(() => {
    console.log("isDark", isDark);
  }, []);
  ///////////////////////////////////////////////////////////////
  const marathonFeature: btnProps = {
    title: "마라톤",
    content: "안틀리고 몇개까지 맞출 수 있나요?",
    color: "#D9FFCB",
    img: <S.ButtonImg src={Heart} />,
    width: "48%",
    destination: "",
  };
  const basicFeature: btnProps = {
    title: "경제 기초 개념",
    content: "경제 지식 기초를 다져봐요",
    color: "#CBF9FF",
    img: <S.ButtonImg src={Eye} />,
    width: "48%",
    destination: "",
  };
  const shortAnswerQuestionFeature: btnProps = {
    title: "단답형 주관식",
    content: "일반 게임",
    color: "#FFCBCB",
    img: <S.ButtonImg src={DotMessage} />,
    width: "31.6%",
    destination: "",
  };
  const shortAnswerChoiceFeature: btnProps = {
    title: "단답형 객관식",
    content: "일반 게임",
    color: "#FFDECB",
    img: <S.ButtonImg src={Message} />,
    width: "31.6%",
    destination: "",
  };
  const essayChoiceFeature: btnProps = {
    title: "서술형 객관식",
    content: "일반 게임",
    color: "#FFF7CB",
    img: <S.ButtonImg src={Envelop} />,
    width: "31.6%",
    destination: "",
  };

  ///////////////////////////////////////////////////////////////
  const quizContainerFeature: innerContainerProps = {
    title: "퀴즈를 풀어봐요!",
    width: "95%",
    height: "45%",
    minHeight: "14rem",
    minWidth: "42rem",
    backgroundColor: theme.bg.light,
    content: (
      <S.ButtonGroup>
        <Button {...marathonFeature} />
        <Button {...basicFeature} />
        <Button {...shortAnswerQuestionFeature} />
        <Button {...shortAnswerChoiceFeature} />
        <Button {...essayChoiceFeature} />
      </S.ButtonGroup>
    ),
  };

  const studyContainerFeature: innerContainerProps = {
    title: "정보가 필요해요?",
    width: "95%",
    height: "26%",
    minHeight: "9rem",
    minWidth: "42rem",
    backgroundColor: theme.bg.light,
    content: null,
  };

  const battleContainerFeature: innerContainerProps = {
    title: "",
    width: "59%",
    height: "",
    minHeight: "",
    minWidth: "",
    backgroundColor: "black",
    content: null,
  };

  const shopContainerFeature: innerContainerProps = {
    title: "",
    width: "39%",
    height: "",
    minHeight: "",
    minWidth: "",
    backgroundColor: "pink",
    content: null,
  };

  const profileContainerFeature: innerContainerProps = {
    title: "프로필",
    width: "95%",
    height: "48%",
    minHeight: "",
    minWidth: "",
    backgroundColor: theme.bg.light,
    content: <S.Line />,
  };

  const rankContainerFeature: innerContainerProps = {
    title: "랭크",
    width: "95%",
    height: "48%",
    minHeight: "",
    minWidth: "",
    backgroundColor: theme.bg.light,
    content: <S.Line />,
  };

  return (
    <S.Container>
      <S.LeftContainer>
        <Inner {...quizContainerFeature} />
        <Inner {...studyContainerFeature} />
        <S.EtcContainer>
          <Inner {...battleContainerFeature} />
          <Inner {...shopContainerFeature} />
        </S.EtcContainer>
      </S.LeftContainer>
      <S.RightContainer>
        <Inner {...profileContainerFeature} />
        <Inner {...rankContainerFeature} />
      </S.RightContainer>
    </S.Container>
  );
};

export default Home;
