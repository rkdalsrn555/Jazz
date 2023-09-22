import * as S from './Statement.styled';
import { themeProps } from '@emotion/react';
import { useTheme } from '@mui/material';
import { useParams } from 'react-router-dom';
import { StatementType, companyProps } from 'types/types';
import StatementTypeBtn from 'components/features/Statement/StatementType/StatementTypeBtn';
import { RefObject, useEffect, useRef, useState } from 'react';

const Statement = () => {
  const theme: themeProps = useTheme();
  // url에서 parmeter로 어떤 company 받아올건지??
  const { companyId } = useParams<{ companyId: string }>();
  // 위에 companyId 이용해서 특정 회사의 재무제표를 받아와야 함
  // 아래는 임시 회사 임시 정보
  const company: companyProps = {
    id: 1,
    name: '삼성전자',
    totalValue: 65465465,
    totalSale: 654654654,
    starred: true,
  };
  const fpRef = useRef<HTMLDivElement>(null);
  const ciRef = useRef<HTMLDivElement>(null);
  const cfRef = useRef<HTMLDivElement>(null);
  const ceRef = useRef<HTMLDivElement>(null);
  const isRef = useRef<HTMLDivElement>(null);
  const charReft = useRef<HTMLDivElement>(null);

  const StatementTypes: StatementType[] = [
    {
      name: '재무상태표',
      ref: fpRef,
    },
    {
      name: '손익계산서',
      ref: ciRef,
    },
    {
      name: '포괄손익계산서',
      ref: cfRef,
    },
    {
      name: '자본변동표',
      ref: ceRef,
    },
    {
      name: '현금흐름표',
      ref: isRef,
    },
    {
      name: '과거 5년 차트',
      ref: charReft,
    },
  ];

  // RightContainer에 들어갈 수 있는 각각의 표를 리턴하는 함수들
  const renderFP = () => {
    return <S.ReturnContainer></S.ReturnContainer>;
  };

  const renderCI = () => {
    return <S.ReturnContainer></S.ReturnContainer>;
  };

  const renderCF = () => {
    return <S.ReturnContainer></S.ReturnContainer>;
  };

  const renderCE = () => {
    return <S.ReturnContainer></S.ReturnContainer>;
  };

  const renderIS = () => {
    return <S.ReturnContainer></S.ReturnContainer>;
  };

  const renderChart = () => {
    return <S.ReturnContainer></S.ReturnContainer>;
  };

  // RightContainer에 보여줄 내용 결정하는 state
  const [rightContainerContent, setRightContainerContent] = useState(renderFP);

  // 표 종류 클릭시 처리할 함수
  const handleClickType = (type: StatementType) => {
    console.log(type.ref.current.style);
    StatementTypes.forEach((element) => {
      element.ref.current.style.filter = 'none';
    });
    type.ref.current.style.filter = 'sepia(100%)';
    // setRightContainerContent()
  };

  const handleHoverType = (type: StatementType) => {
    if (type.ref.current.style.filter !== 'sepia(100%)') {
      type.ref.current.style.filter = 'brightness(95%)';
    }
  };

  const handleLeaveType = (type: StatementType) => {
    if (type.ref.current.style.filter !== 'sepia(100%)') {
      type.ref.current.style.filter = 'brightness(100%)';
    }
  };

  return (
    <S.Container>
      <S.PageName>기업정보</S.PageName>
      <S.CompanyName>{company.name}</S.CompanyName>
      <S.LeftContainer>
        <S.StatementTypeContainer>
          {StatementTypes.map((type, i) => {
            return (
              <StatementTypeBtn
                type={type}
                handleClickType={handleClickType}
                handleHoverType={handleHoverType}
                handleLeaveType={handleLeaveType}
                ref={type.ref}
              />
            );
          })}
        </S.StatementTypeContainer>
      </S.LeftContainer>
      <S.RightContainer>차트 나오는 곳{rightContainerContent}</S.RightContainer>
    </S.Container>
  );
};

export default Statement;
