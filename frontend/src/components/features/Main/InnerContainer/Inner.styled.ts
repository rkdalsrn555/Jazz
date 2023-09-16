import { themeProps } from '@emotion/react';
import styled from '@emotion/styled';
import { innerContainerProps } from 'types/types';

export const Container = styled.div<{
  feature: innerContainerProps;
  theme: themeProps;
}>`
  /* border: solid red; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 0.3rem;
  width: ${(props) => props.feature.width};
  height: ${(props) => props.feature.height};
  min-width: ${(props) => props.feature.minWidth};
  min-height: ${(props) => props.feature.minHeight};
  background-color: ${(props) => props.feature.backgroundColor};
  transition: all 0.2s;
  box-shadow: 0.5px 1px 5px 0px ${(props) => props.theme.bg.shadow};
  padding: 1.2rem;
`;

export const Title = styled.div`
  /* border: solid black; */
  display: flex;
  flex-direction: row;
  font-size: large;
  font-weight: 600;
  padding-left: 0.8rem;
  margin-bottom: 0.5rem;
`;

export const ContentContainer = styled.div`
  /* border: solid purple; */
  flex-direction: column;
  justify-content: space-around;
  display: flex;
  height: 80%;
`;
