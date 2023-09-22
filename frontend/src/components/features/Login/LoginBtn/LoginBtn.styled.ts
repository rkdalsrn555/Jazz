import styled from '@emotion/styled';

export const LoginButtonContainer = styled.button<{ isDisabled: boolean }>`
  width: 534px;
  height: 80px;
  border-radius: 80px;
  background: ${(props) => (props.isDisabled ? '#8b94b3' : '#8699da')};
  box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.56);
  color: #fff;
  font-size: 28px;
  font-weight: 800;
  text-align: center;
  line-height: 80px;
`;
