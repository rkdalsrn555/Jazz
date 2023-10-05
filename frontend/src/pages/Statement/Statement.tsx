import * as S from './Statement.styled';
import { themeProps } from '@emotion/react';
import { useTheme } from '@mui/material';
import { useParams } from 'react-router-dom';
import {
  ChartDataType,
  StatementResponseType,
  StatementType,
  companyProps,
} from 'types/types';
import StatementTypeBtn from 'components/features/Statement/StatementType/StatementTypeBtn';
import { useEffect, useRef, useState } from 'react';
import { userApis } from 'hooks/api/userApis';
import RenderChart from 'components/features/Statement/RenderChart/RenderChart';
import MoneyFormatter from 'hooks/MoneyFormatter';

const Statement = () => {
  const theme: themeProps = useTheme();
  // url에서 parmeter로 어떤 company 받아올건지??
  const { companyId } = useParams<{ companyId: string }>();
  // 위에 companyId 이용해서 특정 회사의 재무제표를 받아와야 함
  const [company, setCompany] = useState<companyProps>({
    id: 0,
    name: '',
    totalAssets: 0,
    totalDebt: 0,
    totalCapital: 0,
  });
  const [FP, setFP] = useState<StatementResponseType[]>([]);
  const [CI, setCI] = useState<StatementResponseType[]>([]);
  const [CF, setCF] = useState<StatementResponseType[]>([]);
  const [IS, setIS] = useState<StatementResponseType[]>([]);
  const [CD, setCD] = useState<ChartDataType[]>([]);

  const apis: string[] = [
    `/enterprise/info?enterpriseId=${companyId}`,
    `/enterprise/financial-position/${companyId}`,
    `/enterprise/comprehensive-income/${companyId}`,
    `/enterprise/cash-flow/${companyId}`,
    `/enterprise/income-statement/${companyId}`,
    `/enterprise/graph?enterpriseId=${companyId}`,
  ];

  const order = [
    function (response: companyProps) {
      setCompany(response);
    },
    function (response: StatementResponseType[]) {
      setFP(response);
    },
    function (response: StatementResponseType[]) {
      setCI(response);
    },
    function (response: StatementResponseType[]) {
      setCF(response);
    },
    function (response: StatementResponseType[]) {
      setIS(response);
    },
    function (response: ChartDataType[]) {
      setCD(response);
    },
  ];

  useEffect(() => {
    for (let i = 0; i < apis.length; i++) {
      userApis
        .get(apis[i])
        .then((res) => {
          order[i](res.data);
        })
        .catch((err) => {});
    }
  }, [companyId]);

  const fpRef = useRef<HTMLDivElement>(null);
  const ciRef = useRef<HTMLDivElement>(null);
  const cfRef = useRef<HTMLDivElement>(null);
  const isRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);

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
      name: '현금흐름표',
      ref: isRef,
    },
    {
      name: '과거 5년 차트',
      ref: chartRef,
    },
  ];

  // RightContainer에 들어갈 수 있는 각각의 표를 리턴하는 함수들
  const renderContent = (rightContainerContent: string) => {
    return (
      <S.ReturnContainer>
        {rightContent.length > 0 ? (
          <>
            <S.RightTitleContainer>
              <S.RightTitle theme={theme}>{rightContainerContent}</S.RightTitle>
              <S.RightSubTitle theme={theme}>
                {rightContent[0].thstrmNm}
              </S.RightSubTitle>
            </S.RightTitleContainer>
            <S.RightInnerContainer theme={theme}>
              {rightContent.map((e, i) => {
                return (
                  <S.EachBlock theme={theme}>
                    <S.BlockTitle>{e.accountNm}</S.BlockTitle>
                    <S.BlockValue>
                      {e.thstrmAmount > 0
                        ? MoneyFormatter(e.thstrmAmount)
                        : e.thstrmAmount < 0
                        ? MoneyFormatter(e.thstrmAmount * -1)
                        : 0}
                      (원)
                    </S.BlockValue>
                  </S.EachBlock>
                );
              })}
            </S.RightInnerContainer>
          </>
        ) : (
          <S.NoStatement theme={theme}>
            <S.NoStatementTitle theme={theme}>죄송합니다.</S.NoStatementTitle>
            <S.NoStatementContent theme={theme}>
              해당 재무제표가 없거나 찾을 수 없습니다...😢😢
            </S.NoStatementContent>
          </S.NoStatement>
        )}
      </S.ReturnContainer>
    );
  };

  const [clickedCategory, setClickedCategory] = useState<string>('ta');

  useEffect(() => {
    setPlz(
      <RenderChart
        CD={CD}
        setClickedCategory={setClickedCategory}
        clickedCategory={clickedCategory}
      />
    );
  }, [clickedCategory, CD]);

  const [plz, setPlz] = useState(
    <RenderChart
      CD={CD}
      setClickedCategory={setClickedCategory}
      clickedCategory={clickedCategory}
    />
  );

  // RightContainer에 보여줄 내용 결정하는 state
  const [rightContainerContent, setRightContainerContent] =
    useState('재무상태표');

  const [rightContent, setRightContent] = useState<StatementResponseType[]>(FP);

  useEffect(() => setRightContent(FP), [FP]);

  useEffect(() => {
    switch (rightContainerContent) {
      case '재무상태표':
        setRightContent(FP);
        break;
      case '손익계산서':
        setRightContent(IS);
        break;
      case '포괄손익계산서':
        setRightContent(CI);
        break;
      case '현금흐름표':
        setRightContent(CF);
        break;
    }
  }, [rightContainerContent]);

  // 표 종류 클릭시 처리할 함수
  const handleClickType = (type: StatementType) => {
    StatementTypes.forEach((element) => {
      element.ref.current.style.filter = 'none';
    });
    type.ref.current.style.filter = 'sepia(100%)';
    setRightContainerContent(type.name);
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

  useEffect(() => {
    if (fpRef.current) fpRef.current.style.filter = 'sepia(90%)';
  }, [fpRef]);

  return (
    <S.Container>
      <S.PageName theme={theme}>기업정보</S.PageName>
      <S.CompanyName theme={theme}>{company.name}</S.CompanyName>
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
      <S.RightContainer>
        {rightContainerContent === '과거 5년 차트'
          ? plz
          : renderContent(rightContainerContent)}
      </S.RightContainer>
    </S.Container>
  );
};

export default Statement;
