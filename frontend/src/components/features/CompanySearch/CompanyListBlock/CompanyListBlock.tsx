import * as S from './CompanyListBlock.styled';
import { companyProps } from 'types/types';
import { themeProps } from '@emotion/react';
import { useTheme } from '@mui/material/styles';
import Star from 'assets/img/star.png';
import Starred from 'assets/img/starred.png';

const CompanyListBlock = ({ company }: { company: companyProps }) => {
  const theme: themeProps = useTheme();
  return (
    <S.Container theme={theme}>
      <S.NameContainer>{company.name}</S.NameContainer>
      <S.ValueSaleContainer>
        <S.ValueSaleTitle>시가총액</S.ValueSaleTitle>
        <S.ValueSaleContent>{company.totalValue}</S.ValueSaleContent>
      </S.ValueSaleContainer>
      <S.ValueSaleContainer>
        <S.ValueSaleTitle>매출액</S.ValueSaleTitle>
        <S.ValueSaleContent>{company.totalSale}</S.ValueSaleContent>
      </S.ValueSaleContainer>
      {company.starred ? (
        <S.StarredContainer src={Starred} />
      ) : (
        <S.StarredContainer src={Star} />
      )}
    </S.Container>
  );
};

export default CompanyListBlock;
