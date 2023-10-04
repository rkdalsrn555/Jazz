import * as S from './CompanyListBlock.styled';
import { companyBriefInfo, companyProps } from 'types/types';
import { themeProps } from '@emotion/react';
import { useTheme } from '@mui/material/styles';
import Star from 'assets/img/star.png';
import Starred from 'assets/img/starred.png';
import { useEffect, useState } from 'react';
import { userApis } from 'hooks/api/userApis';

type ChildProps = {
  company: companyBriefInfo;
  setClickedCompany: (val: companyProps) => void;
};

const CompanyListBlock = ({ props }: { props: ChildProps }) => {
  const theme: themeProps = useTheme();

  const [company, setCompany] = useState<companyProps>({
    id: 0,
    name: '',
    totalAssets: 0,
    totalDebt: 0,
    totalCapital: 0,
  });
  const handleClick = () => {
    userApis
      .get(`/enterprise/info?enterpriseId=${props.company.id}`)
      .then((res) => {
        console.log(res);
        setCompany(res.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    props.setClickedCompany(company);
  }, [company]);

  return (
    <S.Container theme={theme} onClick={handleClick}>
      <S.NameContainer theme={theme}>{props.company.name}</S.NameContainer>
    </S.Container>
  );
};

export default CompanyListBlock;
