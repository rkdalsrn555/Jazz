import styled from '@emotion/styled';

export const Container = styled.div`
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 60px;
`;

export const ButtonContainer = styled.div<{ isJudge: boolean }>`
  display: flex;
  gap: ${(props) => (props.isJudge ? '24px' : '110px')};
`;
