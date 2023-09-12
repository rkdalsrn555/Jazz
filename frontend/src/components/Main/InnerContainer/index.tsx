import * as S from "../InnerContainer/Inner.styled";
import { themeProps } from "@emotion/react";
import { useTheme } from "@mui/material";
import { innerContainerProps } from "types/types";

const Inner = (feature: innerContainerProps) => {
  const theme: themeProps = useTheme();
  return <S.Container feature={feature}></S.Container>;
};

export default Inner;
