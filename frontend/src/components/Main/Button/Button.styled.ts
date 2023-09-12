import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { btnProps } from "types/types";

export const Button = styled.button<{ prop: btnProps }>`
  background-color: ${(props) => props.prop.color};
  width: ${(props) => props.prop.width};
  height: ${(props) => props.prop.height};
`;
