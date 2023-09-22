import styled from '@emotion/styled';

export const Container = styled.div`
  flex: 1;
`;

export const LoginContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -25px 0 0 -25px;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 36px;
  text-align: center;
`;

export const LogoContainer = styled.div`
  width: 300px;
  overflow: hidden;
  margin: 0 auto;
  padding-bottom: 10px;

  & img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const signupText = styled.p`
  font-size: 24px;
  font-weight: 700;
  color: #444b59;

  & .link {
    color: #8699da;
    text-decoration: underline;
    text-underline-position: under;
    margin-left: 16px;
    margin-right: 12px;
  }
`;
