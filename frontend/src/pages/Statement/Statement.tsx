import * as S from './Statement.styled';
import { themeProps } from '@emotion/react';
import { useTheme } from '@mui/material';

const Statement = () => {
  const theme: themeProps = useTheme();
  // url에서 parmeter로 어떤 company 받아올건지??
  return (
    <S.Container>
      <S.CompanyLabelContainer>

      </S.CompanyLabelContainer>
    </S.Container>
  );
};

export default Statement;
