import { themeProps } from '@emotion/react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const Container = styled.div`
  /* border: solid green; */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 5rem);
  padding: 2rem;
  gap: 1rem;
`;

export const LeftContainer = styled.div<{ theme: themeProps }>`
  /* border: solid red; */
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 40rem;
  height: calc(100vh - 10rem);
  border-radius: 0.5rem;
  padding: 2rem;
  gap: 2rem;
  background-color: ${(props) => props.theme.bg.light};
  box-shadow: 0.5px 1px 5px 0px ${(props) => props.theme.bg.shadow};
  transition: all 0.2s;
`;

export const RightContainer = styled.div<{ theme: themeProps }>`
  /* border: solid blue; */
  flex: 1.6;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 10rem);
  min-width: fit-content;
  border-radius: 0.5rem;
  padding: 2rem;
  gap: 2rem;
  background-color: ${(props) => props.theme.bg.light};
  box-shadow: 0.5px 1px 5px 0px ${(props) => props.theme.bg.shadow};
  transition: all 0.2s;
  position: relative;
`;

export const Title = styled.div<{ theme: themeProps }>`
  /* border: solid green; */
  width: 100%;
  height: fit-content;
  font-size: 1.3rem;
  font-weight: 900;
  color: ${(props) => props.theme.font.deep};
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
  color: ${(props) => props.theme.font.deep};
  transition-property: background-color;
  transition-duration: 0.2s;

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

export const BlankList = styled.div<{ theme: themeProps }>`
  color: ${(props) => props.theme.font.deep};
`;

export const CompanyBanner = styled.div<{ theme: themeProps }>`
  /* border: solid black; */
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1rem;
  height: 35%;
  border-radius: 0.4rem;
  background-color: ${(props) => props.theme.bg.light};
  box-shadow: 0.5px 1px 5px 0px ${(props) => props.theme.bg.shadow};
  transition: all 0.2s;
  position: relative;
  min-width: fit-content;
`;

export const InnerBannerContainer = styled.div`
  /* border: solid black; */
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
`;

export const BannerLeft = styled.div`
  /* border: solid red; */
  flex: 0.8;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const Box = styled.div`
  /* border: solid red; */
  position: relative;
  width: 100%;
  min-width: 112px;
  max-width: 134px;
  &::after {
    display: block;
    content: '';
    padding-bottom: 100%;
  }
`;

export const BannerLogo = styled.img`
  /* border: solid green; */
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const BannerRight = styled.div`
  /* border: solid green; */
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  min-width: 23rem;
  height: 100%;
`;

export const BannerTitle = styled.div`
  /* border: solid blue; */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 900;
`;

export const BannerContent = styled.div`
  /* border: solid red; */
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export const BannerContentInner = styled.div`
  /* border: solid black; */
  display: flex;
  flex-direction: column;
  width: 33%;
  gap: 1rem;
  margin-top: 1rem;
`;

export const BannerContentTitle = styled.div`
  /* border: solid green; */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: grey;
`;

export const BannerContentContent = styled.div`
  /* border: solid red; */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 1.3rem;
  font-weight: 600;
`;

export const StarredContainer = styled.img`
  position: absolute;
  width: 1rem;
  top: 1rem;
  right: 1rem;
`;

export const CompanyOutlineContainer = styled.div`
  /* border: solid red; */
  display: flex;
  flex-direction: column;
  height: 55%;
  gap: 0.8rem;
`;

export const CompanyOutlineTitle = styled.div<{ theme: themeProps }>`
  /* border: solid green; */
  width: 100%;
  height: fit-content;
  font-size: 1.1rem;
  font-weight: 900;
  color: ${(props) => props.theme.font.deep};
`;

export const CompanyOutline = styled.div<{ theme: themeProps }>`
  /* border: solid black; */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 1rem;
  height: 100%;
  border-radius: 0.4rem;
  font-size: 0.8rem;
  background-color: ${(props) => props.theme.bg.light};
  box-shadow: inset 0.5px 1px 5px 0px ${(props) => props.theme.bg.shadow};
  overflow-y: scroll;
  min-width: fit-content;
  transition: all 0.2s;
  position: relative;
`;

export const StatementBtnContainer = styled(motion.div)<{ theme: themeProps }>`
  /* border: solid red; */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 2rem;
  right: 2rem;

  &:hover {
    cursor: pointer;
    filter: brightness(90%);
  }
`;

export const StatementBtn = styled(motion.div)<{ theme: themeProps }>`
  /* border: solid green; */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0.7rem;
  width: 15rem;
  top: 2rem;
  right: 2rem;
  background-color: ${(props) => props.theme.point.mid};
  border-radius: 0.4rem;
  font-weight: 600;
  transition: all 0.2s;
`;

export const BlankBanner = styled.div`
  /* border: solid red; */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  color: grey;
`;
