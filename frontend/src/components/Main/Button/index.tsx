import { Link } from "react-router-dom";
import * as S from "./Button.styled";
import { btnProps } from "types/types";

const MainButton = (feature: btnProps) => {
  return (
    <S.BtnBox
      prop={feature}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 1 }}
    >
      <Link
        to={feature.destination}
        style={{ padding: "1rem", width: "100%", height: "100%" }}
      >
        <S.InnerBox>
          <S.Text>
            <S.Title>{feature.title}</S.Title>
            <S.Content>{feature.content}</S.Content>
          </S.Text>
          {feature.img}
        </S.InnerBox>
      </Link>
    </S.BtnBox>
  );
};

export default MainButton;
