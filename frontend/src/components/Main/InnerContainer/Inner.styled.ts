import styled from "@emotion/styled";
import { innerContainerProps } from "types/types";

export const Container = styled.div<{ feature: innerContainerProps }>`
  border: solid red;
  border-radius: 0.3rem;
  width: ${(props) => props.feature.width};
  height: ${(props) => props.feature.height};
  background-color: ${(props) => props.feature.theme.bg.light};
`;
