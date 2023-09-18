import styled from '@emotion/styled';

export const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: black;
`;

export const MarathonResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 1156px;
  height: 654px;
  border-radius: 16px 24px 24px 24px;
  background: #638ef3;
  text-align: center;
  padding-top: 20px;
  padding-bottom: 20px;
`;

export const MarathonResultTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 550px;
  height: 458px;
  margin: 0 auto;
  & p {
    text-align: center;
    color: #ffbd3c;
    font-size: 300px;
    font-weight: 700;
    line-height: 20px;
  }
  & img {
    position: absolute;
    top: 0;
  }
`;

export const MarathonResultContent = styled.p`
  color: #fff;
  font-size: 40px;
  font-weight: 400;
  line-height: 20px;
`;
