import styled from '@emotion/styled';

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 14px;
  align-items: flex-start;

  & label {
    font-size: 20px;
    font-weight: 800;
    color: #444b59;
  }
`;

export const LoginInput = styled.input`
  width: 400px;
  height: 60px;
  border: none;
  border-radius: 80px;
  border: 2px solid #789ade;
  padding: 20px 28px;
  font-size: 20px;

  :focus,
  :active {
    outline: none;
    outline: 4px solid #5184ea;
  }
`;

export const LoginInputContainer = styled.div`
  position: relative;
`;

export const showPwdIcon = styled.div`
  position: absolute;
  top: 25%;
  right: 6%;
  cursor: pointer;
`;

export const ErrorMessage = styled.div<{ isError?: boolean }>`
  position: absolute;
  left: 0;
  right: 0;
  bottom: -25px;
  color: #ff0f0f;
  font-size: 14px;
  visibility: ${(props) => (props.isError ? 'visible' : 'hidden')};
`;

export const SuccessMessage = styled.div<{ isSuccess?: boolean }>`
  position: absolute;
  left: 0;
  right: 0;
  bottom: -25px;
  color: #54b03c;
  font-size: 14px;
  visibility: ${(props) => (props.isSuccess ? 'visible' : 'hidden')};
`;
