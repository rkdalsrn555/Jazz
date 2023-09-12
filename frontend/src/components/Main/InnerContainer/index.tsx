import * as S from "../InnerContainer/Inner.styled";
import { innerContainerProps } from "types/types";

const Inner = (feature: innerContainerProps) => {
  return <S.Container feature={feature}></S.Container>;
};

export default Inner;
