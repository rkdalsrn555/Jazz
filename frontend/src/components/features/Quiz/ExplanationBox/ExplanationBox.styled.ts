import styled from '@emotion/styled';

export const ExplanationContainer = styled.div`
  width: 564px;
  min-height: 313px;
  background: #fff;
  box-shadow: 2px 3px 6px rgba(0, 0, 0, 0.15);
  border-radius: 16px;
  padding-bottom: 20px;

  & p {
    width: 90%;
    margin: 0 auto;
    color: #646464;
    font-size: 24px;
    font-weight: 400;
    line-height: 34px;
  }
`;

export const ExplanationTitle = styled.div<{ result: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  height: 43px;
  margin: 20px auto;
  padding-top: 20px;
  padding-bottom: 0;

  & h1 {
    color: #212121;
    font-size: 30px;
    font-weight: 700;
    line-height: 20px;
  }

  & .label {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 104px;
    height: 43px;
    text-align: center;
    color: #fff;
    font-size: 20px;
    font-weight: 700;
    $background: ${(props) => (props.result ? '#54B03C' : '#D93D3D')};
    border-radius: 20px;
  }
`;