import * as S from './CompanySearch.styled';
import { themeProps } from '@emotion/react';
import { useTheme } from '@mui/material/styles';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Search from 'assets/img/magnifier.png';
import CompanyListBlock from 'components/features/CompanySearch/CompanyListBlock/CompanyListBlock';
import { companyProps } from 'types/types';
import Star from 'assets/img/star.png';
import Starred from 'assets/img/starred.png';
import { click } from '@testing-library/user-event/dist/click';

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

  const [companies, setCompanies] = useState(sampleCompanies);

  const handleInput = (e: any) => {
    console.log(e.target.value);
    const searchWord = e.target.value;
    let newCompanies: companyProps[] = [];
    sampleCompanies.forEach((element) => {
      const lowerCaseName = element.name.toLowerCase();
      if (
        element.name.includes(searchWord) ||
        lowerCaseName.includes(searchWord)
      ) {
        newCompanies.push(element);
      }
    });
    setCompanies(newCompanies);
  };

  const [clickedCompany, setClickedCompany] = useState<companyProps>();

  return (
    <S.Container>
      <S.LeftContainer theme={theme}>
        <S.Title>기업 검색</S.Title>
        <S.SearchContainer theme={theme}>
          <S.SearchInput
            type="text"
            placeholder="기업명을 검색해보세요"
            theme={theme}
            onChange={(e) => handleInput(e)}
          />
          <S.SearchDiv>
            <S.Img src={Search} />
          </S.SearchDiv>
        </S.SearchContainer>
        <S.ListContainer theme={theme}>
          {companies.map((company, i) => {
            return <CompanyListBlock props={{ company, setClickedCompany }} />;
          })}
        </S.ListContainer>
      </S.LeftContainer>
      <S.RightContainer theme={theme}>
        <S.Title>기업 정보</S.Title>
        {/* 클릭시 보여지는 transition 속도와 
        dark/light mode 전환시 보여지는 transition 속도를 다르게 설정하기 위함 */}
        <S.StatementBtnContainer
          theme={theme}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 1 }}
          transition={{ duration: 0.05 }}
        >
          {clickedCompany ? (
            <Link to={`/statement/${clickedCompany.name}`}>
              <S.StatementBtn theme={theme}>재무제표 확인하기</S.StatementBtn>
            </Link>
          ) : null}
        </S.StatementBtnContainer>
        <S.CompanyBanner theme={theme}>
          {clickedCompany ? (
            <S.InnerBannerContainer>
              <S.BannerLeft>
                <S.Box>
                  <S.BannerLogo src="" />
                </S.Box>
              </S.BannerLeft>
              <S.BannerRight>
                <S.BannerTitle>{clickedCompany.name}</S.BannerTitle>
                <S.BannerContent>
                  {/* 아래 항목들은 추후 가용한 정보로 바꿔야 함 */}
                  <S.BannerContentInner>
                    <S.BannerContentTitle>시총 순위</S.BannerContentTitle>
                    <S.BannerContentContent>X위</S.BannerContentContent>
                  </S.BannerContentInner>
                  <S.BannerContentInner>
                    <S.BannerContentTitle>시가 총액</S.BannerContentTitle>
                    <S.BannerContentContent>
                      {clickedCompany.totalValue}
                    </S.BannerContentContent>
                  </S.BannerContentInner>
                  <S.BannerContentInner>
                    <S.BannerContentTitle>매출액</S.BannerContentTitle>
                    <S.BannerContentContent>
                      {clickedCompany.totalSale}
                    </S.BannerContentContent>
                  </S.BannerContentInner>
                </S.BannerContent>
              </S.BannerRight>

              {clickedCompany.starred ? (
                <S.StarredContainer src={Starred} />
              ) : (
                <S.StarredContainer src={Star} />
              )}
            </S.InnerBannerContainer>
          ) : (
            <S.BlankBanner>
              회사를 선택하면 간략한 정보를 확인하실 수 있어요
            </S.BlankBanner>
          )}
        </S.CompanyBanner>
        <S.CompanyOutlineContainer>
          <S.CompanyOutlineTitle>기업 개요</S.CompanyOutlineTitle>
          <S.CompanyOutline theme={theme}>
            {clickedCompany ? (
              `${clickedCompany.name} 여기에 기업 개요 들어가야 함`
            ) : (
              <S.BlankBanner>
                회사를 선택하면 기업 개요를 확인하실 수 있어요
              </S.BlankBanner>
            )}
          </S.CompanyOutline>
        </S.CompanyOutlineContainer>
      </S.RightContainer>
    </S.Container>
  );
};

export default CompanySearch;
