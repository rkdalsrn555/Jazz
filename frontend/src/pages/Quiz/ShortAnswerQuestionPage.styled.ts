import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  min-height: 400px;
  /* height: 78vh; */
  height: 78%;
  gap: 2rem;
`;

export const ButtonContainer = styled.div<{ isJudge: boolean }>`
  display: flex;
  gap: ${(props) => (props.isJudge ? '24px' : '24px')};
`;
