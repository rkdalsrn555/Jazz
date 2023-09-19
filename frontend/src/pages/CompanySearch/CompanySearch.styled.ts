import { themeProps } from '@emotion/react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const Container = styled.div`
  /* border: solid green; */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 5rem);
  padding: 2rem;
  gap: 1rem;
`;

export const LeftContainer = styled.div<{ theme: themeProps }>`
  /* border: solid red; */
  flex: 1.1;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 10rem);
  border-radius: 0.5rem;
  padding: 2rem;
  gap: 2rem;
  background-color: ${(props) => props.theme.bg.light};
  box-shadow: 0.5px 1px 5px 0px ${(props) => props.theme.bg.shadow};
`;

export const RightContainer = styled.div<{ theme: themeProps }>`
  /* border: solid blue; */
  flex: 0.9;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 10rem);
  border-radius: 0.5rem;
  padding: 2rem;
  gap: 2rem;
  background-color: ${(props) => props.theme.bg.light};
  box-shadow: 0.5px 1px 5px 0px ${(props) => props.theme.bg.shadow};
`;

export const Title = styled.div`
  /* border: solid green; */
  width: 100%;
  height: fit-content;
  font-size: 1.3rem;
  font-weight: 900;
`;

export const SearchContainer = styled.div<{ theme: themeProps }>`
  /* border: solid blue; */
  display: flex;
  border-radius: 0.4rem;
  height: 8%;
  min-height: 3rem;
  padding: 0.5rem;
  box-shadow: 0.5px 1px 5px 0px ${(props) => props.theme.bg.shadow};
  transition: all 0.2s;
`;

export const SearchInput = styled.input<{ theme: themeProps }>`
  font-size: 1.1rem;
  border: none;
  display: flex;
  width: 93%;
  padding: 0.3rem;
  background-color: ${(props) => props.theme.bg.light};

  &:focus {
    border-radius: 0.4rem;
    outline: 2px solid ${(props) => props.theme.bg.mid};
  }
`;
export const SearchDiv = styled.div`
  /* border: solid red; */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 7%;
`;

export const Img = styled.img`
  &:hover {
    cursor: pointer;
  }
`;

export const ListContainer = styled.div<{ theme: themeProps }>`
  /* border: solid black; */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  gap: 1rem;
  height: 85%;
  border-radius: 0.4rem;
  box-shadow: inset 0.5px 1px 5px 0px ${(props) => props.theme.bg.shadow};
  background-color: ${(props) => props.theme.bg.mid};
  overflow-y: scroll;
  transition: all 0.2s;
`;
