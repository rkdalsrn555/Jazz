import * as S from './Home.styled';
import { themeProps } from '@emotion/react';
import { useTheme } from '@mui/material';
import { IsDark, UserInfo } from 'atoms/atoms';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import Inner from 'components/features/Main/InnerContainer';
import { btnProps, innerContainerProps } from 'types/types';
import Button from 'components/features/Main/Button';
import Heart from 'assets/img/icons8-heart-100.png';
import Eye from 'assets/img/icons8-eye-100.png';
import DotMessage from 'assets/img/icons8-chat-bubble-100.png';
import Message from 'assets/img/icons8-topic-100.png';
import Envelop from 'assets/img/icons8-open-envelope-100.png';
import Bot from 'assets/img/icons8-message-bot-100.png';
import Note from 'assets/img/icons8-note-100.png';
import Battle from 'assets/img/icons8-battle-96.png';
import Shop from 'assets/img/icons8-shop-64.png';
import ProfileInfo from 'components/features/Main/ProfileInfo/ProfileInfo';
import GameMatchingModal from 'components/features/Game/GameMatchingModal/GameMatchingModal';
import { userApis } from 'hooks/api/userApis';
import { Border, VictoryPie } from 'victory';
import { forceReRender } from '@storybook/react';

const Home = () => {
  const theme: themeProps = useTheme();
  const isDark = useRecoilValue(IsDark);
  const [isToggled, setIsToggled] = useState<boolean>(false);
  const userToken = localStorage.getItem('userAccessToken');

  ///////////////////////게임 매칭시 나타나는 모달//////////////////////////
  const gameMatchingModalFeature = {
    me: {
      level: 15,
      nickname: '재린이',
      charactor: 'triangle.png',
      bgColor: '#FFC702',
    },
    other: null,
    isMatching: false,
    isToggled: isToggled,
    closeModal: () => setIsToggled(false),
  };
  ///////////////////////////////////////////////////////////////
  const marathonFeature: btnProps = {
    title: '마라톤',
    content: '안틀리고 몇개까지 맞출 수 있나요?',
    color: '#D9FFCB',
    img: <S.ButtonImg src={Heart} />,
    width: '48%',
    destination: '/marathon',
  };
  const basicFeature: btnProps = {
    title: '경제 기초 개념',
    content: '경제 지식 기초를 다져봐요',
    color: '#CBF9FF',
    img: <S.ButtonImg src={Eye} />,
    width: '48%',
    destination: '',
  };
  const shortAnswerQuestionFeature: btnProps = {
    title: '단답형 주관식',
    content: '일반 게임',
    color: '#FFCBCB',
    img: <S.ButtonImg src={DotMessage} />,
    width: '31.6%',
    destination: '/short-answer-question',
  };
  const shortAnswerChoiceFeature: btnProps = {
    title: '단답형 객관식',
    content: '일반 게임',
    color: '#FFDECB',
    img: <S.ButtonImg src={Message} />,
    width: '31.6%',
    destination: '/short-answer-multiple-question',
  };
  const essayChoiceFeature: btnProps = {
    title: '서술형 객관식',
    content: '일반 게임',
    color: '#FFF7CB',
    img: <S.ButtonImg src={Envelop} />,
    width: '31.6%',
    destination: '/description-mutiple-question',
  };
  const financialDictFeature: btnProps = {
    title: '금융 사전',
    content: '모르는 금융 단어들을 물어보세요!',
    color: '#EBCBFF',
    img: <S.ButtonImg src={Bot} />,
    width: '48%',
    destination: '/dictionary',
  };
  const companySearchFeature: btnProps = {
    title: '기업 정보 검색',
    content: '복잡한 정보를 쉽게 정리해줄게요!',
    color: '#CBD7FF',
    img: <S.ButtonImg src={Note} />,
    width: '48%',
    destination: '/companySearch',
  };
  const battleFeature: btnProps = {
    title: '금융 배틀',
    content: '',
    color: 'black',
    img: <S.BattleImg src={Battle} />,
    width: '68%',
    destination: '',
    onClickEvent: () => setIsToggled(true),
  };
  const shopFeature: btnProps = {
    title: '상점',
    content: '',
    color: 'pink',
    img: <S.ShopImg src={Shop} />,
    width: '30%',
    destination: '',
  };

  ///////////////////////////////////////////////////////////////
  const quizContainerFeature: innerContainerProps = {
    title: '퀴즈를 풀어봐요!',
    width: '95%',
    height: '45%',
    minHeight: '14rem',
    minWidth: '42rem',
    backgroundColor: theme.bg.light,
    content: (
      <S.ButtonGroup>
        <Button {...marathonFeature} />
        <Button {...basicFeature} />
        <Button {...shortAnswerQuestionFeature} />
        <Button {...shortAnswerChoiceFeature} />
        <Button {...essayChoiceFeature} />
      </S.ButtonGroup>
    ),
  };

  const studyContainerFeature: innerContainerProps = {
    title: '정보가 필요해요?',
    width: '95%',
    height: '26%',
    minHeight: '9rem',
    minWidth: '42rem',
    backgroundColor: theme.bg.light,
    content: (
      <S.ButtonGroup>
        <Button {...financialDictFeature} />
        <Button {...companySearchFeature} />
      </S.ButtonGroup>
    ),
  };

  // 사용자 정보 api로 받아와야 함
  const [userInfo, setUserInfo] = useRecoilState(UserInfo);
  useEffect(() => {
    setGraphicData(wantedGraphicData);
    userApis
      .get('/user/profile')
      .then((res) => {
        console.log(res.data);
        setUserInfo(res.data);
      })
      .catch((err) => console.log(err));
  }, [userToken]);

  const calcPercent = () => {
    const result = (360 * userInfo.winningPercentage) / 100;
    return result;
  };

  const wantedGraphicData = [
    { x: ' ', y: calcPercent() },
    { x: ' ', y: 360 - calcPercent() },
  ];
  const defaultGraphicData = [
    { x: ' ', y: 0 },
    { x: ' ', y: 100 },
  ];
  // const defaultGraphicData = [{ x: ' ', y: 0 }, { x: ' ',  y: 0 }, { y: 100 }];
  const [graphicData, setGraphicData] = useState(defaultGraphicData);

  const profileContainerFeature: innerContainerProps = {
    title: '프로필',
    width: '95%',
    height: '38%',
    minHeight: '15rem',
    minWidth: '',
    backgroundColor: theme.bg.light,
    content: (
      <S.ProfileContainer>
        <S.ProfileContent>
          <S.ProfileLeft>
            <S.ProfileLeftPrefix theme={theme}>금융 초보자</S.ProfileLeftPrefix>
            <S.ProfileLeftTitle theme={theme}>
              {userInfo?.nickname}
            </S.ProfileLeftTitle>
            <S.Box>
              <S.ProfileLeftImg />
            </S.Box>
          </S.ProfileLeft>
          <S.PieConatiner>
            <S.PieTitle theme={theme}>
              정답률
              <S.PieNumber>{userInfo.winningPercentage} %</S.PieNumber>
            </S.PieTitle>
            <S.Pie>
              <VictoryPie
                standalone={false}
                animate={{ easing: 'bounce' }}
                // colorScale={['orange', 'gold', 'cyan', 'navy']}
                // colorScale={['purple', 'lightpurple']}
                colorScale={['tomato', 'orange']}
                // colorScale={['orange', 'gold']}
                origin={{ x: 150, y: 90 }}
                width={180}
                innerRadius={60}
                data={graphicData}
              />
            </S.Pie>
          </S.PieConatiner>
          <S.ProfileRight>
            {userInfo ? <ProfileInfo user={userInfo} /> : null}
          </S.ProfileRight>
        </S.ProfileContent>
      </S.ProfileContainer>
    ),
  };

  const [rankRender, setRankRender] = useState(true);
  useEffect(() => {
    console.log('isDark', isDark);
    setRankRender(!rankRender);
  }, [isDark]);
  
  const rankContainerFeature: innerContainerProps = {
    title: '랭크',
    width: '95%',
    height: '55%',
    minHeight: '15rem',
    minWidth: '',
    backgroundColor: theme.bg.light,
    content: { rankRender },
  };

  return (
    <S.Container initial={{ scale: 0.9 }} animate={{ scale: 1 }}>
      <GameMatchingModal {...gameMatchingModalFeature} />
      <S.LeftContainer>
        <Inner {...quizContainerFeature} />
        <Inner {...studyContainerFeature} />
        <S.EtcContainer>
          <Button {...battleFeature} />
          <Button {...shopFeature} />
        </S.EtcContainer>
      </S.LeftContainer>
      <S.RightContainer>
        <Inner {...profileContainerFeature} />
        <Inner {...rankContainerFeature} />
      </S.RightContainer>
    </S.Container>
  );
};

export default Home;
