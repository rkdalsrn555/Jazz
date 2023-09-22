import React from 'react';
import * as S from './LoginBtn.styled';
import Enlarge from 'components/Effect/Enlarge/Enlarge';

type OwnProps = {
  content: string;
  isDisabled: boolean;
  handleClick?: () => void;
};

const LoginBtn = (props: OwnProps) => {
  const { content, isDisabled, handleClick } = props;

  return (
    <>
      {isDisabled ? (
        <S.LoginButtonContainer disabled={isDisabled} isDisabled={isDisabled}>
          {content}
        </S.LoginButtonContainer>
      ) : (
        <Enlarge>
          <S.LoginButtonContainer
            disabled={isDisabled}
            isDisabled={isDisabled}
            onClick={handleClick}
          >
            {content}
          </S.LoginButtonContainer>
        </Enlarge>
      )}
    </>
  );
};

export default LoginBtn;
