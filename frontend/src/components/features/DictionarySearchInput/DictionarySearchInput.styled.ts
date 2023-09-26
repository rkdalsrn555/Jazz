import { themeProps } from '@emotion/react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const InputContainer = styled.div`
  /* border: solid black; */
  flex: 0.1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 50%;
  position: relative;
`;

export const Input = styled.input<{ theme: themeProps }>`
  display: flex;
  width: 100%;
  height: 3rem;
  border: none;
  border-radius: 0.4rem;
  transition-property: box-shadow, background-color;
  transition-duration: 0.2s;
  font-size: 1.3rem;
  padding: 1rem;
  background-color: ${(props) => props.theme.bg.light};

  &:focus {
    border-radius: 0.4rem;
    outline: none;
    box-shadow: 0.5px 1px 10px 2px ${(props) => props.theme.bg.selected};
  }

  &:hover {
    outline: solid 1px yellow;
  }
`;

export const Img = styled.img`
  position: absolute;
  right: 1rem;

  &:hover {
    cursor: pointer;
  }
`;
