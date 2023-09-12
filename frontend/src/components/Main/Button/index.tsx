import { Link } from "react-router-dom";
import * as S from "./Button.styled";
import { btnProps } from "types/types";

const SmallButton = (feature: btnProps) => {
  return (
    <Link to={feature.destination}>
      <S.Button prop={feature}>{feature.content}</S.Button>
    </Link>
  );
};

export default SmallButton;
