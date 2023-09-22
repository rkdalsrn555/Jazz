import React from 'react';
import * as S from './LoginInput.styled';

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

  return (
    <S.Container>
      <label id={labelId}>{labelContent}</label>
      <S.LoginInput
        placeholder={placeholder}
        name={labelId}
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
      />
      <S.ErrorMessage isError={isError}>{errorMessage}</S.ErrorMessage>
      <S.SuccessMessage isSuccess={isSuccess}>
        {successMessage}
      </S.SuccessMessage>
    </S.Container>
  );
};

export default LoginInput;
