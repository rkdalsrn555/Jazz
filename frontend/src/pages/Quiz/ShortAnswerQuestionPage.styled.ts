import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 80vh;
  gap: 2rem;
`;

export const ButtonContainer = styled.div<{ isJudge: boolean }>`
  display: flex;
  gap: ${(props) => (props.isJudge ? '24px' : '110px')};
`;
