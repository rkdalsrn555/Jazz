import { themeProps } from '@emotion/react';
import * as S from '../InnerContainer/Inner.styled';
import { innerContainerProps, userType } from 'types/types';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import Modify from 'assets/img/writing.png';
import Bell from 'assets/img/bell.png';
import Diamond from 'assets/img/diamond.png';
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { IsDark } from 'atoms/atoms';
import { VictoryPie } from 'victory';
import { forceReRender } from '@storybook/react';
import RankChart from '../RankChart/RankChart';
import { userApis } from 'hooks/api/userApis';

const Inner = ({
  feature,
  children,
  theme,
}: {
  feature: innerContainerProps;
  children: JSX.Element | ReactNode | null;
  theme: themeProps;
}) => {
  const userToken = localStorage.getItem('userAccessToken');
  // 사용자 정보 api로 받아와야 함
  const [userInfo, setUserInfo] = useState<userType>({
    ableCharacterList: 0,
    ablePrefixTitleList: '',
    ableSuffixTitleList: '',
    bookmarkCnt: 0,
    collectQuizRecord: 0,
    diamond: 0,
    expPoint: 0,
    level: 0,
    mailCnt: 0,
    marathonOneDay: 0,
    nickname: '',
    rank: '',
    rankPoint: 0,
    takeCharacterId: 0,
    takePrefixContent: '',
    takePrefixTitleId: 0,
    takeSuffixContent: '',
    takeSuffixTitleId: 0,
    userUUID: '',
    winningPercentage: 0,
  });

  useEffect(() => {
    userApis
      .get('/user/profile')
      .then((res) => {
        console.log(res.data);
        setUserInfo(res.data);
      })
      .catch((err) => console.log(err));
  }, [userToken]);

  return (
    <S.Container feature={feature} theme={theme}>
      {feature.title === '프로필' ? (
        <S.ProfileHeaderContainer>
          <S.ProfileHeader>
            <S.Title theme={theme}>
              {feature.title}
              <Link to={'/home'}>
                <S.EditBtn theme={theme} />
              </Link>
              <button
                onClick={() => {
                  window.localStorage.clear();
                }}
              >
                로그아웃
              </button>
            </S.Title>
            <S.ProfileHeaderRight>
              <S.Bell theme={theme} />
              <S.DiamondContainer theme={theme}>
                {/* 다이아개수 받아와서 넣어야 될 자리 */}
                {userInfo.diamond}
                <S.Img
                  src={Diamond}
                  style={{ width: '1.4rem', height: '1.4rem' }}
                />
              </S.DiamondContainer>
            </S.ProfileHeaderRight>
          </S.ProfileHeader>
          <S.Line />
        </S.ProfileHeaderContainer>
      ) : feature.title === '랭크' ? null : (
        <S.Title theme={theme}>{feature.title}</S.Title>
      )}
      {feature.title === '랭크' ? null : (
        <S.ContentContainer>{feature.content}</S.ContentContainer>
      )}
      {feature.title === '랭크' ? children : null}
      <S.Blank />
    </S.Container>
  );
};

export default Inner;
