import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as S from './Login.styled';
import jazzlogo from '../../assets/JazzLogo.png';
import LoginBtn from 'components/features/Login/LoginBtn/LoginBtn';
import LoginInput from 'components/features/Login/LoginInput/LoginInput';
import Modal from 'components/utils/Modal/Modal';

const Login = () => {
  const navigate = useNavigate();

  const [userId, setUserId] = useState<string>('');
  const [pw, setPw] = useState<string>('');

  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [isToggled, setIsToggled] = useState<boolean>(false); // 모달 창 toggle
  const [modalData, setModalData] = useState<{
    data: {
      title: string;
      message: string;
    };
    noBtnClick?: () => void | null;
    yesBtnClick?: () => void | null;
  }>({ data: { title: '', message: '' } });

  const getLogin = () => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/user/login`, {
        userId: userId,
        pw: pw,
      })
      .then((res) => {
        console.log(res);
        window.localStorage.setItem('userAccessToken', res.data.accessToken);
        window.localStorage.setItem('userRefreshToken', res.data.refreshToken);
        navigate('/');
      })
      .catch((err) => {
        setIsToggled(true);
        setModalData({
          data: {
            title: '😥',
            message: '아이디나 비밀번호가 일치하지 않습니다',
          },
          yesBtnClick: () => {
            setIsToggled(false);
          },
        });
        setUserId('');
        setPw('');
      });
  };

  return (
    <S.Container>
      <Modal {...modalData} isToggled={isToggled} setIsToggled={setIsToggled} />
      <S.LoginContainer>
        <S.LogoContainer>
          <img src={jazzlogo} alt="로고" />
        </S.LogoContainer>
        <LoginInput
          labelId="userId"
          labelContent="아이디"
          placeholder=""
          inputValue={userId}
          setInputValue={setUserId}
        />
        <LoginInput
          labelId="userPwd"
          labelContent="비밀번호"
          inputValue={pw}
          setInputValue={setPw}
        />
        <LoginBtn
          content="로그인"
          isDisabled={isDisabled}
          handleClick={getLogin}
        />

        <S.signupText>
          계정이 없으시다면,
          <Link to={'/sign-up'} className="link">
            회원가입
          </Link>
        </S.signupText>
      </S.LoginContainer>
    </S.Container>
  );
};

export default Login;
