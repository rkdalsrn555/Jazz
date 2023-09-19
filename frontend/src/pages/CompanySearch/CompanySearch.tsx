import * as S from './CompanySearch.styled';
import { themeProps } from '@emotion/react';
import { useTheme } from '@mui/material/styles';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Search from 'assets/img/magnifier.png';
import CompanyListBlock from 'components/features/CompanySearch/CompanyListBlock/CompanyListBlock';
import { companyProps } from 'types/types';

const CompanySearch = () => {
  const theme: themeProps = useTheme();
  // 추후 company 타입도 갱신해야함(types.d.ts)
  const sampleCompanies: companyProps[] = [
    {
      name: '삼성전자',
      totalValue: 65465465,
      totalSale: 654654654,
      starred: true,
    },
    {
      name: 'LG',
      totalValue: 465465,
      totalSale: 4654654,
      starred: false,
    },
    {
      name: '삼성전자',
      totalValue: 65465465,
      totalSale: 654654654,
      starred: true,
    },
    {
      name: 'LG',
      totalValue: 465465,
      totalSale: 4654654,
      starred: false,
    },
    {
      name: '삼성전자',
      totalValue: 65465465,
      totalSale: 654654654,
      starred: true,
    },
    {
      name: 'LG',
      totalValue: 465465,
      totalSale: 4654654,
      starred: false,
    },
    {
      name: '삼성전자',
      totalValue: 65465465,
      totalSale: 654654654,
      starred: true,
    },
    {
      name: 'LG',
      totalValue: 465465,
      totalSale: 4654654,
      starred: false,
    },
    {
      name: '삼성전자',
      totalValue: 65465465,
      totalSale: 654654654,
      starred: true,
    },
    {
      name: 'LG',
      totalValue: 465465,
      totalSale: 4654654,
      starred: false,
    },
    {
      name: '삼성전자',
      totalValue: 65465465,
      totalSale: 654654654,
      starred: true,
    },
    {
      name: 'LG',
      totalValue: 465465,
      totalSale: 4654654,
      starred: false,
    },
    {
      name: '삼성전자',
      totalValue: 65465465,
      totalSale: 654654654,
      starred: true,
    },
    {
      name: 'LG',
      totalValue: 465465,
      totalSale: 4654654,
      starred: false,
    },
    {
      name: '삼성전자',
      totalValue: 65465465,
      totalSale: 654654654,
      starred: true,
    },
    {
      name: 'LG',
      totalValue: 465465,
      totalSale: 4654654,
      starred: false,
    },
  ];
  return (
    <S.Container>
      <S.LeftContainer theme={theme}>
        <S.Title>기업 검색</S.Title>
        <S.SearchContainer theme={theme}>
          <S.SearchInput type="text" theme={theme} />
          <S.SearchDiv>
            <S.Img src={Search} />
          </S.SearchDiv>
        </S.SearchContainer>
        <S.ListContainer theme={theme}>
          {sampleCompanies.map((e, i) => {
            return <CompanyListBlock company={e} />;
          })}
        </S.ListContainer>
      </S.LeftContainer>
      <S.RightContainer theme={theme}>
        <S.Title>기업 정보</S.Title>
      </S.RightContainer>
    </S.Container>
  );
};

export default CompanySearch;
