import * as S from './CompanySearch.styled';
import { themeProps } from '@emotion/react';
import { useTheme } from '@mui/material/styles';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Search from 'assets/img/magnifier.png';
import CompanyListBlock from 'components/features/CompanySearch/CompanyListBlock/CompanyListBlock';
import { companyBriefInfo, companyProps } from 'types/types';
import Star from 'assets/img/star.png';
import Starred from 'assets/img/starred.png';
import { click } from '@testing-library/user-event/dist/click';
import useDebounce from 'hooks/useDebounce';
import axios from 'axios';
import { userApis } from 'hooks/api/userApis';
import MoneyFormatter from 'hooks/MoneyFormatter';

const CompanySearch = () => {
  const theme: themeProps = useTheme();
  const [searchingCompany, setSearchingCompany] = useState('');
  const debounceSearchCompany = useDebounce<string>(searchingCompany, 500);

  const [companies, setCompanies] = useState<companyBriefInfo[]>();

  const handleInput = (e: any) => {
    const searchWord = e.target.value;
    setSearchingCompany(searchWord);
  };

  useEffect(() => {
    userApis
      .get(`/enterprise?enterpriseName=${debounceSearchCompany}`)
      .then((res) => {
        setCompanies(res.data);
      })
      .catch((err) => {});
  }, [debounceSearchCompany]);

  const [clickedCompany, setClickedCompany] = useState<companyProps>({
    id: 0,
    name: '',
    totalAssets: 0,
    totalDebt: 0,
    totalCapital: 0,
  });

  useEffect(() => {}, [clickedCompany]);

  return (
    <S.Container>
      <S.LeftContainer theme={theme}>
        <S.Title theme={theme}>기업 검색</S.Title>
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
          {companies ? (
            companies.map((company, i) => {
              return (
                <CompanyListBlock props={{ company, setClickedCompany }} />
              );
            })
          ) : (
            <S.BlankList theme={theme}>검색 결과가 없습니다.</S.BlankList>
          )}
        </S.ListContainer>
      </S.LeftContainer>
      <S.RightContainer theme={theme}>
        <S.Title theme={theme}>기업 정보</S.Title>
        {/* 클릭시 보여지는 transition 속도와 
        dark/light mode 전환시 보여지는 transition 속도를 다르게 설정하기 위함 */}
        <S.StatementBtnContainer
          theme={theme}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 1 }}
          transition={{ duration: 0.05 }}
        >
          {clickedCompany.id !== 0 ? (
            <Link to={`/statement/${clickedCompany.id}`}>
              <S.StatementBtn theme={theme}>재무제표 확인하기</S.StatementBtn>
            </Link>
          ) : null}
        </S.StatementBtnContainer>
        <S.CompanyBanner theme={theme}>
          {clickedCompany.id !== 0 ? (
            <S.InnerBannerContainer>
              <S.BannerLeft>
                <S.Box>
                  <S.BannerLogo src="" />
                </S.Box>
              </S.BannerLeft>
              <S.BannerRight>
                <S.BannerTitle theme={theme}>
                  {clickedCompany.name}
                </S.BannerTitle>
                <S.BannerContent>
                  <S.BannerContentInner>
                    <S.BannerContentTitle>총 자본</S.BannerContentTitle>
                    <S.BannerContentContent theme={theme}>
                      {MoneyFormatter(clickedCompany.totalAssets)}원
                    </S.BannerContentContent>
                  </S.BannerContentInner>
                  <S.BannerContentInner>
                    <S.BannerContentTitle>총 부채</S.BannerContentTitle>
                    <S.BannerContentContent theme={theme}>
                      {MoneyFormatter(clickedCompany.totalDebt)}원
                    </S.BannerContentContent>
                  </S.BannerContentInner>
                  <S.BannerContentInner>
                    <S.BannerContentTitle>총 차산</S.BannerContentTitle>
                    <S.BannerContentContent theme={theme}>
                      {MoneyFormatter(clickedCompany.totalCapital)}원
                    </S.BannerContentContent>
                  </S.BannerContentInner>
                </S.BannerContent>
              </S.BannerRight>

              {/* {clickedCompany.starred ? (
                <S.StarredContainer src={Starred} />
              ) : (
                <S.StarredContainer src={Star} />
              )} */}
            </S.InnerBannerContainer>
          ) : (
            <S.BlankBanner theme={theme}>
              회사를 선택하면 간략한 정보를 확인하실 수 있어요
            </S.BlankBanner>
          )}
        </S.CompanyBanner>
        <S.CompanyOutlineContainer>
          <S.CompanyOutlineTitle theme={theme}>기업 개요</S.CompanyOutlineTitle>
          <S.CompanyOutline theme={theme}>
            {clickedCompany.id !== 0 ? (
              `${clickedCompany.name} 여기에 기업 개요 들어가야 함`
            ) : (
              <S.BlankBanner theme={theme}>
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
