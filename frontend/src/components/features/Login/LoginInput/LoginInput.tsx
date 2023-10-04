import React, { useState } from 'react';
import * as S from './LoginInput.styled';
import closeEye from '../../../../assets/img/Login/closeEye.png';
import openEye from '../../../../assets/img/Login/openEye.png';

type OwnProps = {
  labelContent: string;
  labelId: string;
  placeholder?: string;
  isSuccess?: boolean;
  successMessage?: string;
  isError?: boolean;
  errorMessage?: string;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
};

const LoginInput = (props: OwnProps) => {
  const {
    labelContent,
    labelId,
    placeholder,
    isError,
    errorMessage,
    isSuccess,
    successMessage,
    inputValue,
    setInputValue,
  } = props;
  const [showPwd, setShowPwd] = useState<boolean>(true);

  return (
    <S.Container>
      <label id={labelId}>{labelContent}</label>
      <S.LoginInputContainer>
        <S.LoginInput
          type={labelId === 'userPwd' && showPwd ? 'password' : 'text'}
          placeholder={placeholder}
          name={labelId}
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
        <>
          {labelId === 'userPwd' ? (
            <>
              {showPwd ? (
                <S.showPwdIcon
                  onClick={() => {
                    setShowPwd(!showPwd);
                  }}
                >
                  <img src={closeEye} width={30} alt="가림" />
                </S.showPwdIcon>
              ) : (
                <S.showPwdIcon
                  onClick={() => {
                    setShowPwd(!showPwd);
                  }}
                >
                  <img src={openEye} width={30} alt="보임" />
                </S.showPwdIcon>
              )}
            </>
          ) : (
            <div></div>
          )}
        </>
      </S.LoginInputContainer>
      <S.ErrorMessage isError={isError}>{errorMessage}</S.ErrorMessage>
      <S.SuccessMessage isSuccess={isSuccess}>
        {successMessage}
      </S.SuccessMessage>
    </S.Container>
  );
};

export default LoginInput;
