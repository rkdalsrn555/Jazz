import styled from '@emotion/styled';
import { themeProps } from '@emotion/react';

export const Container = styled.div<{ theme: themeProps }>`
  /* border: solid black; */
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 10rem;
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: ${(props) => props.theme.bg.light};
  box-shadow: 0.5px 1px 5px 0px ${(props) => props.theme.bg.shadow};
  position: relative;
  transition: all 0.2s;
  &:hover {
    filter: brightness(90%);
    cursor: pointer;
  }
`;

export const NameContainer = styled.div<{ theme: themeProps }>`
  /* border: solid green; */
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 900;
  color: ${(props) => props.theme.font.deep};
  transition: color 0.2s;
`;

export const ValueSaleContainer = styled.div`
  /* border: solid red; */
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ValueSaleTitle = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const ValueSaleContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 1.3rem;
  font-weight: 900;
`;

export const StarredContainer = styled.img`
  position: absolute;
  width: 1rem;
  top: 1rem;
  right: 1rem;
`;
