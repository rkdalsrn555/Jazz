import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useDebounce from 'hooks/useDebounce';
import axios from 'axios';
import * as S from './Signup.styled';
import jazzlogo from '../../assets/JazzLogo.png';
import LoginInput from 'components/features/Login/LoginInput/LoginInput';
import LoginBtn from 'components/features/Login/LoginBtn/LoginBtn';
import Modal from 'components/utils/Modal/Modal';

const Signup = () => {
  const navigate = useNavigate();

  const [userId, setUserId] = useState<string>('');
  const [successUserId, setSuccessUserId] = useState<boolean>(false);
  const [errorUserId, setErrorUserId] = useState<boolean>(false);
  const debounceCheckUserId = useDebounce<string>(userId, 200);

  const [pw, setPw] = useState<string>('');
  const [successPw, setSuccessPw] = useState<boolean>(false);
  const [errorPw, setErrorPw] = useState<boolean>(false);
  const debouncePw = useDebounce<string>(pw, 200);

  const [nickname, setNickname] = useState<string>('');
  const [successNickname, setSuccessNickname] = useState<boolean>(false);
  const [errorNickname, setErrorNickname] = useState<boolean>(false);
  const debounceCheckNickname = useDebounce<string>(nickname, 200);

  const [isDisabled, setIsDisabled] = useState<boolean>(true); // 회원가입 버튼 disabled
  const [isToggled, setIsToggled] = useState<boolean>(false); // 모달 창 toggle
  const [modalData, setModalData] = useState<{
    data: {
      title: string;
      message: string;
    };
    noBtnClick?: () => void | null;
    yesBtnClick?: () => void | null;
  }>({ data: { title: '', message: '' } });

  useEffect(() => {
    if (successUserId && successPw && successNickname) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [successUserId, successPw, successNickname]);

  // debounce를 이용한 유저아이디 중복검사, 0.2초마다 서버에 요청보내서 중복검사 실시간으로 시행
  useEffect(() => {
    if (debounceCheckUserId === '') {
      setErrorUserId(false);
      setSuccessUserId(false);
      return;
    }
    // 영문자로 시작하는 6~20자 영문자(소문자만 가능)
    let reg = /^[a-z]{5,19}$/g;
    if (reg.test(debounceCheckUserId)) {
      axios
        .get(
          `${process.env.REACT_APP_BASE_URL}/user/duplicate/${debounceCheckUserId}`
        )
        .then((res) => {
          // 유저아이디가 중복이면
          if (res.data.duplicated) {
            setErrorUserId(true);
            setSuccessUserId(false);
          } else {
            // 유저아이디가 중복이 아니면
            setErrorUserId(false);
            setSuccessUserId(true);
          }
        })
        .catch((err) => {
          setErrorUserId(true);
          setSuccessUserId(false);
        });
    } else {
      setErrorUserId(true);
      setSuccessUserId(false);
    }
  }, [debounceCheckUserId]);

  // debounce를 이용한 유저닉네임 중복검사, 0.2초마다 서버에 요청보내서 중복검사 실시간으로 시행
  useEffect(() => {
    if (debounceCheckNickname === '') {
      setErrorNickname(false);
      setSuccessNickname(false);
      return;
    }
    if (debounceCheckNickname) {
      axios
        .get(
          `${process.env.REACT_APP_BASE_URL}/user/nickname/${debounceCheckNickname}`
        )
        .then((res) => {
          if (res.data.duplicated) {
            setErrorNickname(true);
            setSuccessNickname(false);
          } else {
            setErrorNickname(false);
            setSuccessNickname(true);
          }
        })
        .catch((err) => {
          setErrorNickname(true);
          setSuccessNickname(false);
        });
    }
  }, [debounceCheckNickname]);

  // debounce를 이용한 비밀번호 검사, 영문 숫자 조합 8자리 이상
  useEffect(() => {
    if (debouncePw === '') {
      setErrorPw(false);
      setSuccessPw(false);
      return;
    }
    // 영문 숫자 조합 4자리 이상
    let reg = /^[0-9a-z]+$/;
    if (reg.test(debouncePw)) {
      setErrorPw(false);
      setSuccessPw(true);
    } else {
      setErrorPw(true);
      setSuccessPw(false);
    }
  }, [debouncePw]);

  // 회원가입 요청
  const postSignup = () => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/user`, {
        userId: debounceCheckUserId,
        nickname: debounceCheckNickname,
        pw: debouncePw,
      })
      .then((res) => {
        // 회원가입 성공 시 로그인 페이지로 라우팅, 로그인 페이지에서 다시 로그인 할 수 있게 하기!
        setIsToggled(true);
        setModalData({
          data: {
            title: '😆',
            message: `환영합니다! ${nickname}님, 다시 한번 로그인 해주세요`,
          },
          yesBtnClick: () => {
            navigate('/login');
          },
        });
      })
      .catch((err) => {
        // 회원가입 실패 시 모달 띄우고, 다시 입력할 수 있도록 아이디,비밀번호,닉네임 빈칸으로 초기화
        setIsToggled(true);
        setModalData({
          data: { title: '😥', message: '회원가입에 실패하였습니다' },
          yesBtnClick: () => {
            setIsToggled(false);
          },
        });
        setUserId('');
        setNickname('');
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
          isSuccess={successUserId}
          successMessage="올바른 아이디입니다"
          isError={errorUserId}
          errorMessage="6~20자 영문자만 가능합니다"
          inputValue={userId}
          setInputValue={setUserId}
        />
        <LoginInput
          labelId="userPwd"
          labelContent="비밀번호"
          isSuccess={successPw}
          successMessage="올바른 비밀번호입니다"
          isError={errorPw}
          errorMessage="비밀번호는 영문, 숫자포함 네자리 이상이어야 합니다"
          inputValue={pw}
          setInputValue={setPw}
        />
        <LoginInput
          labelId="nickname"
          labelContent="닉네임"
          isSuccess={successNickname}
          successMessage="올바른 닉네임입니다"
          isError={errorNickname}
          errorMessage="닉네임이 중복입니다"
          inputValue={nickname}
          setInputValue={setNickname}
        />
        <LoginBtn
          content="회원가입"
          isDisabled={isDisabled}
          handleClick={postSignup}
        />
        <S.signupText>
          이미 계정이 있다면,
          <Link to={'/login'} className="link">
            로그인
          </Link>
          하러가기
        </S.signupText>
      </S.LoginContainer>
    </S.Container>
  );
};

export default Signup;
