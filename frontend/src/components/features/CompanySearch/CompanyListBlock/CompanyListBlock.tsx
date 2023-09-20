import * as S from './CompanyListBlock.styled';
import { companyProps } from 'types/types';
import { themeProps } from '@emotion/react';
import { useTheme } from '@mui/material/styles';
import Star from 'assets/img/star.png';
import Starred from 'assets/img/starred.png';

type ChildProps = {
  company: companyProps;
  setClickedCompany: (val: companyProps) => void;
};

const CompanyListBlock = ({ props }: { props: ChildProps }) => {
  const theme: themeProps = useTheme();
  const handleClick = () => {
    props.setClickedCompany(props.company);
  };
  return (
    <S.Container theme={theme} onClick={handleClick}>
      <S.NameContainer>{props.company.name}</S.NameContainer>
      <S.ValueSaleContainer>
        <S.ValueSaleTitle>시가총액</S.ValueSaleTitle>
        <S.ValueSaleContent>{props.company.totalValue}</S.ValueSaleContent>
      </S.ValueSaleContainer>
      <S.ValueSaleContainer>
        <S.ValueSaleTitle>매출액</S.ValueSaleTitle>
        <S.ValueSaleContent>{props.company.totalSale}</S.ValueSaleContent>
      </S.ValueSaleContainer>
      {props.company.starred ? (
        <S.StarredContainer src={Starred} />
      ) : (
        <S.StarredContainer src={Star} />
      )}
    </S.Container>
  );
};

export default CompanyListBlock;
