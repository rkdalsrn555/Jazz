import { themeProps } from "@emotion/react";
import * as S from "../InnerContainer/Inner.styled";
import { btnProps, innerContainerProps } from "types/types";
import { useTheme } from "@mui/material/styles";


const Inner = (feature: innerContainerProps) => {
  const theme: themeProps = useTheme();
  return (
    <S.Container feature={feature} theme={theme}>
      <S.Title>{feature.title}</S.Title>
      <S.ContentContainer>{feature.content}</S.ContentContainer>
    </S.Container>
  );
};

export default Inner;
